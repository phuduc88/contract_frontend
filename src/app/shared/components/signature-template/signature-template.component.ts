import { Component, OnDestroy, OnInit, Input } from "@angular/core";
import { AuthenticationService, DocumentTemplateService, DocumentTypeService } from "@app/core/services";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { Credential } from "@app/core/models";
import { eventEmitter } from "@app/shared/utils/event-emitter";
import signUtils from "@app/shared/utils/sign";
import orderBy from 'lodash/orderBy';
import { Router } from '@angular/router';
import { SignatureFlowSaveComponent } from "../signature/signature-save/signature-flow-save.component";
@Component({
  selector: "app-signature-template",
  templateUrl: "./signature-template.component.html",
  styleUrls: ["signature-template.component.less"],
})
export class SignatureTemplateComponent implements OnInit, OnDestroy {
  @Input() documentSign: any;
  currentUser: Credential;
  documentsType: any;
  currentStep = 1;
  constructor(
    private modal: NzModalRef,
    private modalService: NzModalService,
    private authService: AuthenticationService,
    private documentTemplateService: DocumentTemplateService,
    private documentTypeService: DocumentTypeService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadDocumentType();
    this.currentUser = this.authService.currentCredentials;
    this.currentStep = this.documentSign.currentStep;
    if (this.documentSign && this.documentSign.id) {
      this.loadDocumentFromHistory();
    }
  }

  ngOnDestroy() {}

  nextStep() {
    if (!this.documentSign.documentType) {
      this.modalService.warning({
        nzTitle: "Vui lòng chọn loại tài liệu!",
      });
      return;
    }
    
    this.getDocumentName();
    this.validFormEmployeeSign('valid');    
  }

  addEmployeeSing(formVale) {
    const employeesSign = formVale.employeesSign;
    this.documentSign.employeesSign = employeesSign;
  }

  private validFormEmployeeSign(action) {
    eventEmitter.emit("employeeTemplalte:validFrom", {
      action,
    });
  }

  private handleFormValid(formValue) {
    this.documentSign.employeesSign = formValue.employeesSign;
    if(!this.documentSign.employeesSign || this.documentSign.employeesSign.length < 1) {
      this.modalService.warning({
        nzTitle: "Vui lòng thêm thông tin người nhận!",
      });
      return;
    }
    this.documentSign.listSign = [];
    this.documentSign.emailAssignment = null;
    this.documentSign.currentStep = 2;
  }

  private loadDocumentType() {
    this.documentTypeService.filter().subscribe((item) => {
      this.documentsType = item.data;
      if (!this.documentSign.documentType) { 
        this.getSelectedDocumentType(this.documentsType);
      }
    });
  }

  private getSelectedDocumentType(documentsType) {
    const documentDefault = documentsType.find(r => r.isDefault);
    if (!documentDefault) return;
    this.documentSign.documentType = documentDefault.id;
    this.documentSign.documentTypeName = documentDefault.documentName;
  }

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
            // this.isSaveFile = true;
            this.serviceSignPosition();
            modalConfirm.destroy();
            this.modal.destroy();
          },
        },
        {
          label: "Không cần lưu",
          type: "primary",
          shape: "round",
          onClick: () => {
            this.deleteDocumentTem()
            modalConfirm.destroy();
            this.modal.destroy();
            this.router.navigate(['/manage-documents']);
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

  prevStep(step) {
    this.documentSign.currentStep = step;
    this.currentStep = step;
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
      const eSign = this.documentSign.employeesSign.find(e => e.email === item.emailAssignment);
      if (eSign) {
        item.methodSign = eSign.singType;
      }
      item.signIndex = (index + 1);
      listSignCopy.push(item);
    });

    this.documentSign.listSign = listSignCopy;
  }

  private showDialogRequestSign() {
    const modal = this.modalService.create({
      nzClosable: true,
      nzMaskClosable: false,
      nzTitle: "Xem lại và lưu",
      nzStyle: { top: 0 },
      nzClassName: "signature-flow-save",
      nzKeyboard: false,
      nzContent: SignatureFlowSaveComponent,
      nzOnOk: () => new Promise((resolve) => setTimeout(resolve, 1000)),
      nzFooter: [],
      nzComponentParams: {
        documentSign: this.documentSign,
        isTemplate: true,
      },
    });

    modal.afterClose.subscribe(result => {
      if (result) {
        this.documentSign.documentEmail = result;
        this.documentSign.employeesSign = result.employeeSignOrder;
        this.serviceSignPosition();   
      }
    });
  }

  getSignByEmailAssignment(emailAssignment) { 
    return this.documentSign.listSign.filter(
      (sign) => sign.emailAssignment == emailAssignment
    );
  }

  private deleteDocumentTem() {
    if (this.documentSign.isCreateNew) {
      this.documentTemplateService.delete(this.documentSign.id).subscribe(res => {
        console.log(res);
      });
    }
  }

  private serviceSignPosition() {
    this.documentTemplateService
      .updateDocumentTemplate(this.documentSign.id ,this.documentSign)
      .subscribe((res) => {
        if (res) {
          this.modalService.success({ nzTitle: "Lưu thành công!" });
          this.modal.destroy(res);
        }
      });
  }

  loadDocumentFromHistory() {
    const listEmployeeSign = this.documentSign.employeesSign;
    this.documentSign.listSign = [];
    if (listEmployeeSign.length === 0) {
      return;
    }

    const filesSign = this.documentSign.filesSign;
    if (filesSign.length === 0) {
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
          listSignCopy.push(sign);
        });
      }
    });
    
    this.documentSign.listSign = orderBy(listSignCopy, 'signIndex', 'asc');
  }

  private getImage(sign) {
    const img = document.createElement("img");
    img.src =  "/assets/img/pdfjs/sign-icon.svg"
    return img;
  }

  private getFileName(files, fileSignId) {
    let fileTemp = files.find((file) => file.id == fileSignId);
    return fileTemp;
  }

  changeDocumentType(documentsType) {
    this.getDocumentName();
  }

  private getDocumentName() {
    if(!this.documentSign.documentType) {
      this.documentSign.documentTypeName = null;
      return;
    }

    const documentSelected = this.documentsType.find(r => r.id === this.documentSign.documentType);
    if (documentSelected) {
      this.documentSign.documentTypeName = documentSelected.documentName;
    }
  }
}
