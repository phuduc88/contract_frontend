import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewContainerRef, OnChanges } from "@angular/core";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { SIGNATURE, GROUP_TYPE, STEP } from '@app/shared/constant';
import * as $ from 'jquery';
import 'jqueryui';
import {
  AuthenticationService,
  SignFlowService, DocumentTypeService,
} from "@app/core/services";
import { Credential } from '@app/core/models';
import { DialogErrorComponent } from "../dialog-error/dialog-error.component";
import { eventEmitter } from "@app/shared/utils/event-emitter";
import signUtils from '@app/shared/utils/sign';

@Component({
  selector: 'signature-flow',
  templateUrl: './signature-flow.component.html',
  styleUrls: ['signature-flow.component.less']
})
export class SignatureFlowComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() documentSign?: any;
  isSpinning: boolean;
  isSaveFile: boolean;
  currentUser: Credential;
  formEmployeesSignError: any = [];
  RequestSend: any;
  ListMailRoot: any = [];
  documentsType: any = [];

  constructor(
    private modal: NzModalRef,
    private modalService: NzModalService,
    private signatureFlowService: SignFlowService,
    private authService: AuthenticationService,
    private documentTypeService: DocumentTypeService) {
  }

  ngOnInit() {
    this.currentUser = this.authService.currentCredentials;
    if (this.documentSign && this.documentSign.id) {
      // load sign from document history
      this.loadDocumentFromHistory();
      this.loadSelectedEmail();
    }
    this.loadDocumentType();
  }
  ngAfterViewInit() {
    if (!this.documentSign.myselfSign && this.documentSign.emailAssignment) {
      eventEmitter.emit("sign:changeEmailAssignment", this.documentSign.emailAssignment);
    }
  }

  private loadSelectedEmail() {
 // load email assign
    if (this.documentSign.myselfSign) {
      this.documentSign.emailAssignment = this.currentUser.email;
      return;
    }

    if (this.documentSign.employeesSign.length > 0) {
      this.documentSign.emailAssignment = this.documentSign.employeesSign[0].email;
    }
  }

  loadDocumentFromHistory() {
    const listEmployeeSign = this.documentSign.employeesSign;
    this.documentSign.listSign = [];
    // load sign
    if (listEmployeeSign.length > 0) {
      const filesSign = this.documentSign.filesSign;
      const currentFileId = filesSign.length > 0 ? filesSign[0].id : 0;
      if (currentFileId > 0) {
        // add sign to doc
        listEmployeeSign.forEach(employee => {
          if (employee.employeesSignDetail && employee.employeesSignDetail.length > 0) {
            employee.employeesSignDetail.forEach(sign => {
              const file = this.getFileName(filesSign, sign.fileSignId);
              const image = this.generateImageByType(sign.signType);
              sign.name = file.fileName;
              sign.img = image;
              sign.emailAssignment = employee.email;
              sign.privateId = signUtils.createGuid(),
              this.documentSign.listSign.push(sign);
            });
          }
        });
      }
    } 
  }

  private generateImageByType(type) {
    var img = document.createElement('img');
    img.src = type == 1 ? "/assets/img/pdfjs/sign-icon.svg" : "/assets/img/pdfjs/signimage.svg";
    return img;
  }

  private getFileName(documents, fileSignId) {
    let fileTemp = documents.find(file => file.id == fileSignId);
    return fileTemp;
  }

  ngOnChanges(changes) {
    if (changes.documentSign && changes.documentSign.currentValue && changes.documentSign.currentValue.length) {
      this.documentSign = changes.documentSign.currentValue;
    }
  }

  changeFilesUpload({ filesSign, documentId }) {
    this.documentSign.id = documentId;
    this.documentSign.filesSign = filesSign;
  }

  addEmployeeSing(formVale) {
    if (formVale.validForm.length > 0) {
      this.showDialogError(formVale.validForm);
      return;
    }
    const employeesSign = formVale.employeeSign;
    employeesSign.push(this.addEmployeeSignBlank());
    this.documentSign.employeesSign = employeesSign;
  }

  showDialogError(errorsData: any) {
    this.modalService.create({
      nzClosable: true,
      nzTitle: 'Lỗi thông tin người ký',
      nzClassName: "signature-pad-custom",
      nzContent: DialogErrorComponent,
      nzOnOk: (data) => console.log('Click ok', data),
      nzComponentParams: {
        errorsData
      }
    });
  }

  private addEmployeeSignBlank() {
    return {
      name: null,
      groupName: null,
      groupType: GROUP_TYPE.HSMUSB,
      receptionEmail: true,
      receptionFileCopy: true,
      address: null,
      idNumer: null,
      phoneNumber: null,
      email: null,
      taxCode: null,
      orders: 1,
      orderSign: 1
    }
  }

  ngOnDestroy() { }

  closeModal() {
    if (this.documentSign.filesSign.length < 1) {
      this.modal.destroy();
      return;
    }
    const modalConfirm = this.modalService.create({
      nzTitle: '<i class="fa fa-question-circle" aria-hidden="true"></i></i>Bạn có muốn lưu bản nháp không?',
      nzContent: 'Những thay đổi của bạn sẽ bị mất nếu bạn không lưu lại',
      nzIconType: 'anticon-question-circle',
      nzFooter: [
        {
          label: 'Lưu và đóng',
          type: 'primary',
          shape: 'round',
          onClick: () => {
            this.isSaveFile = true;
            this.showPreviewRequestSign();
            modalConfirm.destroy();
            this.modal.destroy();
          }
        },
        {
          label: 'Không cần lưu',
          type: 'primary',
          shape: 'round',
          onClick: () => {
            modalConfirm.destroy();
            this.modal.destroy();
          }
        },
        {
          label: 'Bỏ qua',
          shape: 'round',
          onClick: () => modalConfirm.destroy()
        }
      ]
    });

  }

  prevStep() {
    this.documentSign.currentStep = (this.documentSign.currentStep == STEP.THREE && this.documentSign.myselfSign)
      ? STEP.ONE : (this.documentSign.currentStep || STEP.ONE) - 1;

    this.documentSign.CurrentDoc = {};
    this.documentSign.CurrentDoc.SIGN = [];
    this.documentSign.listSign = [];
    $(SIGNATURE.SELECTOR.ContentViewer).html('');
  }

  nextStep() {

    if (this.documentSign.filesSign.length == 0) {
      this.modalService.warning({ nzTitle: 'Vui lòng tải file lên trước khi ký!' });
      return;
    }

    if ((this.documentSign.currentStep || STEP.ONE) === STEP.ONE && this.documentSign.myselfSign) {
      this.addCurrenUseToEmployeesSign();
      this.documentSign.currentStep = STEP.THREE;
      this.documentSign.emailAssignment = this.currentUser.email;
      this.saveStep2();
      return;
    }

    if ((this.documentSign.currentStep || STEP.ONE) === STEP.ONE && !this.documentSign.myselfSign) {
      if (!this.documentSign.employeesSign || this.documentSign.employeesSign.length === 0) {
        this.documentSign.employeesSign.push(this.addEmployeeSignBlank());
      }
    }

    if ((this.documentSign.currentStep || STEP.ONE) === STEP.TWO && !this.documentSign.myselfSign) {
      // Emit event valid employeeSing
      this.validFormEmployeeSign();
    }

    if (this.formEmployeesSignError.length > 0) {
      this.showDialogError(this.formEmployeesSignError);
      return;
    }

    this.documentSign.currentStep = this.documentSign.currentStep + 1;

  }

  private saveStep2() {
    this.signatureFlowService.employeeSign(this.documentSign).subscribe((res) => {
      this.documentSign = res;
      // this.filesSign = res.filesSign;
      // init list sign if undefined
      if (!this.documentSign.listSign) {
        this.documentSign.listSign = [];
      }
    });
  }

  private addCurrenUseToEmployeesSign() {
    this.documentSign.employeesSign = [
      {
        name: this.currentUser.username,
        groupName: this.currentUser.username,
        groupType: GROUP_TYPE.HSMUSB,
        receptionEmail: true,
        receptionFileCopy: true,
        address: '',
        idNumer: '',
        phoneNumber: '',
        email: this.currentUser.email,
        taxCode: '',
        orders: 1,
        orderSign: 1
      }
    ];
  }

  showPreviewRequestSign() {
    let that = this;
    if (this.documentSign.employeesSign) {
      this.documentSign.employeesSign.forEach(employee => {
        employee.employeesSignDetail = that.getSignByEmailAssignment(employee.email);;
      });
      this.serviceSignPosition();
    }
  }

  getSignByEmailAssignment(emailAssignment) {
    return this.documentSign.listSign.filter(sign => sign.emailAssignment == emailAssignment);
  }

  // complete
  requestSign() {
    let that = this;
    if (this.documentSign.employeesSign) {
      let employee = this.documentSign.employeesSign[0];
      employee.employeesSignDetail = this.getSignByEmailAssignment(employee.email);
      this.serviceSignPosition();
    }
  }

  private serviceSignPosition() {
    let that = this;
    this.signatureFlowService.signaturePosition(this.documentSign).subscribe((res) => {
      if (res) {
        if (!that.isSaveFile) {
          that.modalService.success({ nzTitle: 'Ký file thành công!' });
        } else {
          that.modalService.success({ nzTitle: 'Lưu file thành công!' });
        }
        that.modal.destroy();
      }
    });
  }

  private loadDocumentType() {
    this.documentTypeService.filter().subscribe((item) => {
      this.documentsType = item.data;
    });
  }

  //handlers event valid on the form employee sign;
  formEmployeeSingValid(formValue) {
    if (formValue.validForm.length > 0) {
      this.formEmployeesSignError = formValue.validForm;
      return;
    }

    this.formEmployeesSignError = [];
    this.documentSign.employeeSign = formValue.employeeSign;
    this.saveStep2();
  }

  //Emit event valid employeeSing
  private validFormEmployeeSign() {
    eventEmitter.emit('employeeSing:validFrom', {
      action: 'set_2'
    });
  }
}
