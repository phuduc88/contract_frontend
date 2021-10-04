import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
  OnChanges,
} from "@angular/core";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { SIGNATURE, GROUP_TYPE, STEP } from "@app/shared/constant";
import * as $ from "jquery";
import "jqueryui";
import {
  AuthenticationService,
  SignFlowService,
  DocumentTypeService,
  ThreadGroupService,
  ThreadedSignTemplateService,
} from "@app/core/services";
import { Credential } from "@app/core/models";
import { DialogErrorComponent } from "../dialog-error/dialog-error.component";
import { DialogThreadSingTemplateComponent } from "../dialog-thread-sign-template/dialog-thread-sign-template.component";
import { eventEmitter } from "@app/shared/utils/event-emitter";
import signUtils from "@app/shared/utils/sign";
import { SignatureFlowSaveComponent } from "./signature-save/signature-flow-save.component";
import { FormDocumentComponent } from "../form-document/form-document.component";
import orderBy from 'lodash/orderBy';
@Component({
  selector: "signature-flow",
  templateUrl: "./signature-flow.component.html",
  styleUrls: ["signature-flow.component.less"],
})
export class SignatureFlowComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @Input() documentSign?: any;
  isSpinning: boolean;
  isSaveFile: boolean;
  currentUser: Credential;
  employeeSign: any;
  threadGroups: any;
  formEmployeesSignError: any = [];
  RequestSend: any;
  ListMailRoot: any = [];
  documentsType: any = [];

  constructor(
    private modal: NzModalRef,
    private modalService: NzModalService,
    private signatureFlowService: SignFlowService,
    private authService: AuthenticationService,
    private threadGroupService: ThreadGroupService,
    private threadedSignTemplateService: ThreadedSignTemplateService,
    private documentTypeService: DocumentTypeService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentCredentials;    
    this.loadDocumentType();
    this.loadThreadGroup();
    if (this.documentSign && this.documentSign.id) {
      // load sign from document history
      this.loadDocumentFromHistory();
      this.loadSelectedEmail();
    }
  }

  ngAfterViewInit() {
    if (!this.documentSign.myselfSign && this.documentSign.emailAssignment) {
      eventEmitter.emit(
        "sign:changeEmailAssignment",
        this.employeeSign
      );
    }
  }

  private getSelectedDocumentType(documentsType) {
    const documentDefault = documentsType.find(r => r.isDefault);
    if (!documentDefault) return;
    this.documentSign.documentType = documentDefault.id;
  }

  private loadSelectedEmail() {
    // load email assign
    if (this.documentSign.myselfSign) {
      this.documentSign.emailAssignment = this.currentUser.email;
      return;
    }

    if (this.documentSign.employeesSign.length > 0) {
      this.employeeSign = this.documentSign.employeesSign[0];
      this.documentSign.emailAssignment = this.employeeSign.email;
    }
  }

  loadDocumentFromHistory() {
    const listEmployeeSign = this.documentSign.employeesSign;
    this.documentSign.listSign = [];
    if (listEmployeeSign.length === 0) {
      return;
    }

    const filesSign = this.documentSign.filesSign;
    const currentFileId = filesSign.length > 0 ? filesSign[0].id : 0;
    if (currentFileId < 1) {
      return;
    }
    const listSignCopy = [];
    listEmployeeSign.forEach((employee) => {
      if (
        employee.employeesSignDetail &&
        employee.employeesSignDetail.length > 0
      ) {
        employee.employeesSignDetail.forEach((sign) => {
          const file = this.getFileName(filesSign, sign.fileSignId);
          sign.name = file.fileName;
          sign.img = this.getImage(sign);
          sign.emailAssignment = employee.email;
          sign.privateId = signUtils.createGuid(),
          sign.isEmployeeSign  = employee.isEmployeeSign,
          listSignCopy.push(sign);
        });
      }
    });
    this.documentSign.listSign = orderBy(listSignCopy, 'signIndex', 'asc');
  }

  private getImage(sign) {
    if (!this.documentSign.myselfSign) {
      return this.generateImageByType(sign.signType);
    }

    const currentSign = this.currentUser.signatureImage;
    const img = document.createElement("img");
    img.src = signUtils.convertBase64ToImage(this.currentUser.signatureImage);
    const option = {
      width: sign.width,
      height: sign.height,
    };

    signUtils.resize2img(img, option, "png", (result) => {
      img.src = result;
    });

    return img;
  }

  private generateImageByType(type) {
    const img = document.createElement("img");
    img.src =
      type == 1
        ? "/assets/img/pdfjs/sign-icon.svg"
        : "/assets/img/pdfjs/signimage.svg";
    return img;
  }

  private getFileName(documents, fileSignId) {
    let fileTemp = documents.find((file) => file.id == fileSignId);
    return fileTemp;
  }

  ngOnChanges(changes) {
    if (
      changes.documentSign &&
      changes.documentSign.currentValue &&
      changes.documentSign.currentValue.length
    ) {
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
    const employeesSign = formVale.employeesSign;
    employeesSign.push(this.addEmployeeSignBlank());
    this.documentSign.employeesSign = employeesSign;
  }

  onChangeThreadGroup(threadGroupId) {
    this.documentSign.threadGroupId = threadGroupId;
    if (!threadGroupId) {
      this.documentSign.employeesSign = [this.addEmployeeSignBlank()];
      return;
    }

    this.threadedSignTemplateService
      .filter({
        threadGroupId: threadGroupId,
      })
      .subscribe((result) => {
        this.documentSign.employeesSign = [];
        result.data.forEach((item) => {
          item.id = null;
          this.documentSign.employeesSign.push(item);
        });
      });
  }

  showDialogError(errorsData: any) {
    this.modalService.create({
      nzClosable: true,
      nzTitle: "Lỗi thông tin người ký",
      nzClassName: "signature-pad-custom",
      nzContent: DialogErrorComponent,
      nzOnOk: (data) => console.log("Click ok", data),
      nzComponentParams: {
        errorsData,
      },
    });
  }

  addDocumentType() {
    const modal = this.modalService.create({
      nzWidth: 450,
      nzWrapClassName: 'account-modal',
      nzClosable: true,
      nzTitle: "Thông tin loại tài liệu",
      nzContent: FormDocumentComponent,
      nzOnOk: (data) => console.log("Click ok", data),
      nzComponentParams: {},
    });

    modal.afterClose.subscribe(result => {
      if(!result) {
        return;
      }

      this.documentsType.push(result);
      this.documentSign.documentType = result.id;
    });
  }


  private addEmployeeSignBlank() {
    return {
      name: null,
      groupName: null, 
      groupType: GROUP_TYPE.HSMUSB,
      isEmployeeSign: false,
      isEmployeeApprove: false,
      address: null,
      idNumer: null,
      phoneNumber: null,
      email: null,
      taxCode: null,
      orders: 1,
      orderSign: 1,
    };
  }

  ngOnDestroy() {}

  closeModal() {
    if (this.documentSign.filesSign.length < 1) {
      this.modal.destroy();
      return;
    }
    const modalConfirm = this.modalService.create({
      nzTitle:
        '<i class="fa fa-question-circle" aria-hidden="true"></i></i>Bạn có muốn lưu bản nháp không?',
      nzContent: "Những thay đổi của bạn sẽ bị mất nếu bạn không lưu lại",
      nzIconType: "anticon-question-circle",
      nzFooter: [
        {
          label: "Lưu và đóng",
          type: "primary",
          shape: "round",
          onClick: () => {
            this.isSaveFile = true;
            // this.serviceSignPosition();
            modalConfirm.destroy();
            this.modal.destroy();
          },
        },
        {
          label: "Không cần lưu",
          type: "primary",
          shape: "round",
          onClick: () => {
            modalConfirm.destroy();
            this.modal.destroy();
          },
        },
        {
          label: "Bỏ qua",
          shape: "round",
          onClick: () => modalConfirm.destroy(),
        },
      ],
    });
  }

  prevStep() {
    this.documentSign.currentStep =
      this.documentSign.currentStep == STEP.THREE &&
      this.documentSign.myselfSign
        ? STEP.ONE
        : (this.documentSign.currentStep || STEP.ONE) - 1;

    this.documentSign.CurrentDoc = {};
    this.documentSign.CurrentDoc.SIGN = [];
    this.documentSign.listSign = [];
    $(SIGNATURE.SELECTOR.ContentViewer).html("");
  }

  nextStep() {
    if (this.documentSign.filesSign.length == 0) {
      this.modalService.warning({
        nzTitle: "Vui lòng tải file lên trước khi ký!",
      });
      return;
    }

    if (!this.documentSign.documentType) {
      this.modalService.warning({
        nzTitle: "Vui lòng chọn loại tài liệu!",
      });
      return;
    }

    if (
      (this.documentSign.currentStep || STEP.ONE) === STEP.ONE &&
      this.documentSign.myselfSign
    ) {
      this.addCurrenUseToEmployeesSign();
      this.documentSign.currentStep = STEP.THREE;
      this.documentSign.emailAssignment = this.currentUser.email;
      this.saveStep2();
      return;
    }

    if (
      (this.documentSign.currentStep || STEP.ONE) === STEP.ONE &&
      !this.documentSign.myselfSign
    ) {
      if (
        !this.documentSign.employeesSign ||
        this.documentSign.employeesSign.length === 0
      ) {
        this.documentSign.employeesSign.push(this.addEmployeeSignBlank());
      }
    }

    if (
      (this.documentSign.currentStep || STEP.ONE) === STEP.TWO &&
      !this.documentSign.myselfSign
    ) {
      // Emit event valid employeeSing
      this.validFormEmployeeSign('set_2');
    }

    if (this.formEmployeesSignError.length > 0) {
      this.showDialogError(this.formEmployeesSignError);
      return;
    }

    this.documentSign.currentStep = this.documentSign.currentStep + 1;
  }

  private saveStep2() {
    this.signatureFlowService
      .employeeSign(this.documentSign)
      .subscribe((res) => {
        this.documentSign = res;
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
        isEmployeeSign: false,
        isEmployeeApprove: false,
        address: "",
        idNumer: "",
        phoneNumber: "",
        email: this.currentUser.email,
        taxCode: "",
        orders: 1,
        orderSign: 1,
      },
    ];
  }
   
  saveAndSendEmail() {
  
    if (this.documentSign.listSign === null || this.documentSign.listSign.length === 0) {
      this.modalService.warning({
        nzTitle: "Bạn buộc phải chỉ định người ký vào ít nhất một tệp tài liệu!",
      });
      return;
    }
    this.setIndexOfListSign();
    if (this.documentSign.employeesSign) {
      this.documentSign.employeesSign.forEach((employee) => {
        employee.employeesSignDetail = this.getSignByEmailAssignment(
          employee.email
        );
      });
    }

    this.showDialogRequestSign();
  }

  private setIndexOfListSign() {
    const currrentListSign = [...this.documentSign.listSign];
    const listSignCopy = [];
    currrentListSign.forEach((item, index) => {
      item.signIndex = (index + 1);
      listSignCopy.push(item);
    });
    this.documentSign.listSign = listSignCopy;
  }

  private showDialogRequestSign() {
    const modal = this.modalService.create({
      nzClosable: true,
      nzMaskClosable: false,
      nzTitle: "Xem lại và gửi",
      nzStyle: { top: 0 },
      nzClassName: "signature-flow-save",
      nzKeyboard: false,
      nzContent: SignatureFlowSaveComponent,
      nzOnOk: () => new Promise((resolve) => setTimeout(resolve, 1000)),
      nzFooter: [],
      nzComponentParams: {
        documentSign: this.documentSign,
      },
    });

    modal.afterClose.subscribe(result => {
      if (result) {
        this.documentSign.documentEmail = result;
        this.serviceSignPosition();   
      }
    });
  }

  getSignByEmailAssignment(emailAssignment) { 
    return this.documentSign.listSign.filter(
      (sign) => sign.emailAssignment == emailAssignment
    );
  }

  // complete
  requestSign() {
    if (this.documentSign.employeesSign) {
      const employee = this.documentSign.employeesSign[0];
      employee.employeesSignDetail = this.getSignByEmailAssignment(
        employee.email
      );
      this.serviceSignPosition();
    }
  }

  private serviceSignPosition() {
    this.signatureFlowService
      .signaturePosition(this.documentSign)
      .subscribe((res) => {
        if (res) {
          if (!this.isSaveFile) {
            this.modalService.success({ nzTitle: "Ký file thành công!" });
          } else {
            this.modalService.success({ nzTitle: "Lưu file thành công!" });
          }
          this.modal.destroy();
        }
      });
  }

  private loadDocumentType() {
    this.documentTypeService.filter().subscribe((item) => {
      this.documentsType = item.data;
      if (!this.documentSign.documentType) { 
        this.getSelectedDocumentType(this.documentsType);
      }
    });
  }

  private loadThreadGroup() {
    this.threadGroupService.filter().subscribe((item) => {
      this.threadGroups = item.data;
    });
  }

  //handlers event valid on the form employee sign;
  formEmployeeSingValid(formValue) {
    if (formValue.validForm.length > 0) {
      this.formEmployeesSignError = formValue.validForm;
      return;
    }

    this.formEmployeesSignError = [];
    this.documentSign.employeesSign = formValue.employeesSign;
    this.saveStep2();
  }

  //Emit event valid employeeSing
  private validFormEmployeeSign(action) {
    eventEmitter.emit("employeeSing:validFrom", {
      action,
    });
  }

  //notifice event valid employeeSing
  hendlSaveTheardTemplateSign() {    
     this.validFormEmployeeSign(null);
  }

  //get event valid from form employeer sign
  formEmployeeSingValidOnly(formValue) {
    if (formValue.validForm.length > 0) {
      this.showDialogError(formValue.validForm);
      return;
    }
    
    this.showDialogCreateGroupThreadSignTemplate();
  }

  private showDialogCreateGroupThreadSignTemplate() {
    const modal = this.modalService.create({
      nzClosable: true,
      nzWidth: 580,
      nzTitle: 'Tạo nhóm luồng ký',
      nzClassName: "signature-pad-custom",
      nzContent: DialogThreadSingTemplateComponent,
      nzOnOk: (data) => console.log('Click ok', data),
      nzComponentParams: {
      }
    });

    modal.afterClose.subscribe(result => {
      if(!result) {
        return;
      }

      this.createThreadTemplate(result.name);
    });
  }

  createThreadTemplate(groupName) {
    const threadGroup = {
      name: groupName,
      threadedSignTemplate:this.documentSign.employeesSign
    }

    this.threadGroupService.create(threadGroup).subscribe(req => {
      this.loadThreadGroup();
      this.documentSign.threadGroupId = req.id;
    });

  }

}
