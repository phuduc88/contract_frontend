import { Component, OnInit, OnDestroy, ViewContainerRef } from "@angular/core";
import {
  AuthenticationService,
  SignFlowService,
  DocumentTypeService,
  CancelDocumentService,
  DocumentEmailService,
} from "@app/core/services";
import { Router } from "@angular/router";
import { Credential } from "@app/core/models";
import { NzModalService } from "ng-zorro-antd/modal";
import { SignatureFlowComponent, 
  IframeViewerComponent, 
  CancelContractComponent,
  DialogExtendContractComponent,
 } from "@app/shared/components";
import { PAGE_SIZE, MIME_TYPE, DOC_TAB_INDEX } from "@app/shared/constant";
import { download } from "@app/shared/utils/download-file";
import { eventEmitter } from "@app/shared/utils/event-emitter";
import { ContractAuthenticationProcessS2Component } from '@app/modules/contract-search';
import signUtils from "@app/shared/utils/sign";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-documents",
  templateUrl: "./documents.component.html",
  styleUrls: ["./documents.component.less"],
})
export class DocumentsComponent implements OnInit, OnDestroy {
  currentUser: Credential;
  documents: any;
  skip: number;
  selectedPage: number = 1;
  isSpinning: boolean = false;
  tabSeleted: number = 0;
  emailOfUser: string = '';
  filter: any = {};
  private handlers;
  constructor(
    private authService: AuthenticationService,
    private modalService: NzModalService,
    private signFlowService: SignFlowService,
    private viewContainerRef: ViewContainerRef,
    private documentTypeService: DocumentTypeService,
    private cancelDocumentService: CancelDocumentService,
    private documentEmailService: DocumentEmailService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentCredentials;
    this.emailOfUser = this.currentUser.email;
    this.filterDocuments();
    this.handlers = [
      eventEmitter.on("loadDocument:sign", () => {
        this.filterDocuments();
      })
    ];
  }

  filterDocuments(skip = 0, take = PAGE_SIZE) {
    this.isSpinning = true;
    const filterByTab = this.getDataByTab();
    const paramSearch = {
      ...this.filter,
      ...filterByTab,
      skip,
      take,
    };
    this.signFlowService.filter(paramSearch).subscribe((items) => {
      this.documents = items.data;
      this.skip = skip;
      this.documents.total = items.total;
      this.documents.take = take;
      this.isSpinning = false;
      if (items.data.length === 0 && this.selectedPage > 1) {
        this.skip -= PAGE_SIZE;
        this.selectedPage -= 1;
        this.filterDocuments(this.skip);
      }
    });
  }

  handleSelectTab({ index }) {
    this.tabSeleted = index;
    this.filterDocuments();
  }

  singDocument(data) {
    this.signFlowService.getDetail(data.id).subscribe((data) => {
      this.privewDocument(data, "Ký hợp đồng", false);
    });
  }

  approveDocument(data) {
    this.signFlowService.getDetail(data.id).subscribe((data) => {
      this.privewDocument(data, "Duyệt hợp đồng", true);
    });
  }

  privewDocument(documentSign, titleDialog, isApprove) {
    this.fomatDocumentSign(documentSign, isApprove);
    const modal = this.modalService.create({
      nzClosable: true,
      nzTitle: titleDialog,
      nzStyle: { top: 0 },
      nzClassName: "invite-employee signature-flow",
      nzKeyboard: false,
      nzContent: ContractAuthenticationProcessS2Component,
      nzOnOk: (data) => console.log("Click ok", data),
      nzFooter: [],
      nzComponentParams: {
        documentSign,
        isApprove
      },
    });

    modal.afterClose.subscribe(result => {
      if (!result) return; 

      this.documentAction(documentSign.id, result);
    })

  }

  cancelContractDialog(documentSign) {
    const modal = this.modalService.create({
      nzClosable: true,
      nzTitle: 'Hủy bỏ luồng ký hợp đồng',
      nzWrapClassName: "cancel-contract",
      nzContent: CancelContractComponent,
      nzOnOk: (data) => console.log("Click ok", data),
      nzFooter: [],
      nzComponentParams: {
      },
    });

    modal.afterClose.subscribe(result => {
      if (!result) return; 
      this.cancelDocumentService.create(documentSign.id, result).subscribe((data) =>{
        this.modalService.success({
          nzTitle: 'Hủy hợp đồng thành công'
        });
        this.filterDocuments();
      });
    })
  }

  private documentAction(documentId, documentAction) {
    this.signFlowService.documentAction(documentId, documentAction).subscribe((data) => {
      this.filterDocuments();
    });
  }
  private handlePageChange({ skip, page }) {
    this.skip = skip;
    this.selectedPage = page;
    this.filterDocuments(skip);
  }

  cancelDocument(item) {
    this.cancelContractDialog(item);
  }

  editDocument(itemEdit) {

  }

  quickView(item) {
    this.signFlowService
      .quickViewDocument(item.id)
      .subscribe((res) => {       
        this.ViewPdfTemplate(res.source);
      });
  }

  private ViewPdfTemplate(source) {
    let srcUrl: any = this.sanitizer.bypassSecurityTrustResourceUrl(
      "data:application/pdf;base64," + source
    );

    const modal = this.modalService.create({
      nzClosable: true,
      nzTitle: "Xem nhanh",
      nzStyle: { top: "20px" },
      nzClassName: "iframe-viewer",
      nzKeyboard: false,
      nzContent: IframeViewerComponent,
      nzOnOk: (data) => console.log("Click ok", data),
      nzComponentParams: {
        srcUrl,
      },
      nzFooter: [],
    });
  }

  hendlFormSearch(data) {
    this.filter = data;
    this.filterDocuments();
  }

  continueSignDocument(documentId) {
    this.signFlowService.getDetail(documentId).subscribe((data) => {
      this.showDocumentSign(data);
    });
  }

  showDocumentSign(documentSign) {
    const modal = this.modalService.create({
      nzClosable: false,
      nzTitle: "Ký tài liệu",
      nzStyle: { top: 0 },
      nzClassName: "signature-flow",
      nzKeyboard: false,
      nzContent: SignatureFlowComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzOnOk: () => new Promise((resolve) => setTimeout(resolve, 1000)),
      nzFooter: [],
      nzComponentParams: {
        documentSign,
      },
    });

    modal.afterClose.subscribe((result) => {
      if (result) {
        this.filterDocuments();
      }
    });
  }

  checkChange({ isSelectAll, id, checked }) {
    let documentsCopy = [...this.documents];
    let { total, take } = this.documents;

    documentsCopy.map((item) => {
      isSelectAll
        ? (item.isSelected = checked)
        : item.id == id
        ? { ...item, isSelected: checked }
        : item;
    });

    this.documents = documentsCopy;
    this.documents.total = total;
    this.documents.take = take;
  }

  viewDocument(documentView) {
    this.router.navigate(["/manage-documents/" + documentView.id]);
  }

  getMimeType(subfixFile: string) {
    const mimeType = MIME_TYPE.find((c) => c.key === subfixFile);
    if (mimeType) {
      return mimeType.value;
    }
    return MIME_TYPE[0].value;
  }

  private getDataByTab() {
    let filterByTab = {};
    switch (this.tabSeleted) {
      case 0:
        filterByTab = {
          status: DOC_TAB_INDEX.PROCESS,
          isExpiry: false,
        };
        break;
      case 1:
        filterByTab = {
          status: DOC_TAB_INDEX.DRAFT,
          isExpiry: false,
        };
        break;
      case 2:
        filterByTab = {
          status: DOC_TAB_INDEX.FINISH,
          isExpiry: false,
        };
        break;
      case 3:
        filterByTab = {
          status: DOC_TAB_INDEX.REFUSE,
          isExpiry: false,
        };
        break;
      case 4:
        filterByTab = {
          status: DOC_TAB_INDEX.OUTOFDATE,
          isExpiry: true,
        };
        break;
        case 5:
        filterByTab = {
          status: DOC_TAB_INDEX.CANCEL,
          isExpiry: false,
        };
        break;
      default:
        filterByTab = { status: DOC_TAB_INDEX.REFUSE, isExpiry: false, };
        break;
    }
    return filterByTab;
  }

  fomatDocumentSign(documentSign, isApprove) {
    const listEmployeeSign = documentSign.employeesSign.filter(item => item.email === this.emailOfUser);
    documentSign.listSign = [];
    if (listEmployeeSign.length === 0 || isApprove) {
      return;
    }

    const filesSign = documentSign.filesSign;
    const currentFileId = filesSign.length > 0 ? filesSign[0].id : 0;
    if (currentFileId < 1) {
      return;
    }
    const listSignCopy = [];
    listEmployeeSign.forEach((employee) => {
      if (
        employee.employeesSignDetail &&
        employee.employeesSignDetail.length > 0
      ) 
      {
        employee.employeesSignDetail.forEach((sign) => {
          const file = this.getFileName(filesSign, sign.fileSignId);
          sign.name = file.fileName;
          sign.img = this.getImage(documentSign.myselfSign, sign);
          sign.emailAssignment = employee.email;
          sign.privateId = signUtils.createGuid(),
          listSignCopy.push(sign);
        });
      }
    });
    documentSign.listSign = listSignCopy;
  }

  private getImage(myselfSign, sign) {
    const currentSign = this.currentUser.signatureImage;
    const img = document.createElement("img");
    if (!this.currentUser.signatureImage) {
      img.src =  "/assets/img/pdfjs/sign-icon.svg";
      return img;
    } 

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

  private getFileName(documents, fileSignId) {
    let fileTemp = documents.find((file) => file.id == fileSignId);
    return fileTemp;
  }

  sendEamilNotification(item) {
    this.documentEmailService.sendEmail(item).subscribe((res) => {
      this.modalService.success({
        nzTitle: 'Gửi email thành công'
      });
    });
  }

  downloadDocument(document) {
    this.isSpinning = true;
    this.signFlowService.downloadDocumentSign(document.id).then((response) => {
      const subfixFile = '.zip';
      const fileName =  `${document.documentName}${ subfixFile }`;
      const mimeType = this.getMimeType(subfixFile);
      download(fileName, response, mimeType);
      this.isSpinning = false;
    });
  }

  restoreDocument(document) {
    this.modalService.confirm({
      nzTitle: "Bạn có chắc chắn muốn khôi phục hợp đồng này?",
      nzOkText: "Có",
      nzCancelText: "Không",
      nzClosable: false,
      nzOnOk: () => {
         this.restore(document.id);
      },
    });    
  }

  private restore(documentId) {
    this.cancelDocumentService.restore(documentId).subscribe((res) => {
      this.filterDocuments();
    });
  }

  downloadCancelDocument(document) {
    this.isSpinning = true;
    this.cancelDocumentService
    .quickViewDocument(document.id)
    .subscribe((res) => {       
      this.ViewPdfTemplate(res.source);
      this.isSpinning = false;
    });
  }

  deleteDocument(document) {
    this.signFlowService.delete(document.id).subscribe((res) => {
      this.filterDocuments();
    });
  }

  ngOnDestroy() {
    eventEmitter.destroy(this.handlers);
  }

  extendDocument(documentSing) {
    const modal = this.modalService.create({
      nzClosable: true,
      nzTitle: 'Gia hạn thời gian hết hạn quy trình ký kết',
      nzWrapClassName: "cancel-contract",
      nzContent: DialogExtendContractComponent,
      nzOnOk: (data) => console.log("Click ok", data),
      nzFooter: [],
      nzComponentParams: {
        documentSing
      },
    });

    modal.afterClose.subscribe(result => {
      if (!result) return; 
      this.signFlowService.extendDocument(documentSing.id, result).subscribe((data) =>{
        this.modalService.success({
          nzTitle: 'Gia hạn thời gian hết hạn quy trình ký kết thành công'
        });
        this.filterDocuments();
      });
    })
  }
}
