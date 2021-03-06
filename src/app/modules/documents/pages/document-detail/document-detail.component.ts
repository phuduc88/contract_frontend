import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthenticationService, 
  SignFlowService, 
  DocumentTypeService,
  CancelDocumentService,
  DocumentEmailService,
} from '@app/core/services';
import orderBy from 'lodash/orderBy';
import { PAGE_SIZE, MIME_TYPE } from '@app/shared/constant';
import { IframeViewerComponent, CertificateDetailComponent } from "@app/shared/components";
import { download } from '@app/shared/utils/download-file';
import { NzModalService } from "ng-zorro-antd/modal";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: "app-document-detail",
  templateUrl: "./document-detail.component.html",
  styleUrls: ["./document-detail.component.less"],
})
export class DocumentDetailComponent implements OnInit {
  documentId: any;
  document: any;
  verifyCode: any;
  privateKey: any;
  dateCreate: any;
  filesSign: any;
  documentName: any;
  documentType: any;
  documentStatus: any;
  employeesSign: any;
  documentTypeId: any;
  documentTypeName: any;
  documentStatusBefore: string = '';
  documentStatusView: string = '';
  reason: string = '';
  constructor(
    private route: ActivatedRoute,
    private modalService: NzModalService,
    private router:Router,
    private documentTypeService: DocumentTypeService,
    private signFlowService: SignFlowService,
    private cancelDocumentService: CancelDocumentService,
    private documentEmailService: DocumentEmailService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.documentId = this.route.snapshot.params.id;
    this.loadDocumentDetail(this.documentId);
  }

  back() {
    this.router.navigate(['/manage-documents/']);
  }

  private loadDocumentDetail(documentId) {
    this.signFlowService.getViewDetail(documentId).subscribe((data) => {
      this.document = data;
      this.documentName = this.document.documentName;
      this.verifyCode = this.document.id;
      this.privateKey = this.document.privateKey;
      this.dateCreate = this.document.dateCreate;
      this.employeesSign = data.employeesSign;
      this.documentTypeId = data.documentType;
      this.documentStatus = data.status;
      this.reason = data.reason;
      this.documentTypeName = data.documentTypeName;
      this.documentStatusBefore = this.getDocumentStatusBefore(data);
      this.filesSign = this.mergeFileSign(data.filesSign);
      this.documentStatusView = this.getDocumentStatusName(data)
    });
  }

  private mergeFileSign(filesSign) {
    const filesSignCopy = [...filesSign];
    filesSignCopy.forEach(item => {
        item.employeesSignDetail = [];
        this.employeesSign.forEach(empSign => {
          const employeeSignFile = empSign.employeesSignDetail.filter(p => p.fileSignId === item.id);
          if (!employeeSignFile || employeeSignFile.length === 0) {
            return;
          }
          const empSignCopy = {...empSign};
          empSignCopy.employeesSignDetail = orderBy(employeeSignFile, 'page', 'asc');
          item.employeesSignDetail.push(empSignCopy);
        });
    });

    return filesSignCopy;
  }

  handlerDownloadDocumentFile() {
    this.downloadDocument(this.documentId);
  }

  downloadDocument(documentId) {
    this.signFlowService.downloadDocumentSign(documentId).then((response) => {
      const subfixFile = '.zip';
      const fileName =  `${this.documentName}${ subfixFile }`;
      const mimeType = this.getMimeType(subfixFile);
      download(fileName, response, mimeType);
    });
  }

  getMimeType(subfixFile: string) {
    const mimeType = MIME_TYPE.find(c => c.key === subfixFile);
    if (mimeType) {
      return mimeType.value;
    }
    return MIME_TYPE[0].value
  } 

  rollbackDocument() {
    this.modalService.confirm({
      nzTitle: "B???n c?? ch???c ch???n mu???n kh??i ph???c h???p ?????ng n??y?",
      nzOkText: "C??",
      nzCancelText: "Kh??ng",
      nzClosable: false,
      nzOnOk: () => {
         this.restore(this.documentId);
      },
    });    
  }

  private restore(documentId) {
    this.cancelDocumentService.restore(documentId).subscribe((res) => {
      this.modalService.success({
        nzTitle: 'Kh??i ph???c h???p ?????ng th??nh c??ng'
      });
    });
  }

  sendEamilNotification(item) {
    this.documentEmailService.sendEmail(item).subscribe((res) => {
      this.modalService.success({
        nzTitle: 'G???i email th??nh c??ng'
      });
    });
  }

  viewCertificate(employeeSignDetail) {
    const modal = this.modalService.create({
      nzClosable: true,
      nzWidth: 650,
      nzTitle: 'Th??ng tin ch???ng ch???',
      nzClassName: "signature-pad-custom",
      nzContent: CertificateDetailComponent,
      nzOnOk: () => { },
      nzComponentParams: {
        employeeSignDetail
      },
      nzFooter: []
    });
  }

  downloadDocumentCancel() {
    this.cancelDocumentService
    .quickViewDocument(this.documentId)
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

 private getDocumentStatusBefore(document: any) {
    if(!document.oldStatus) {
      return '';
    }

    if ((document.status || 0) === 0) {
      return 'Nh??p';
    }

    if ((document.status || 0) === 2) {
      return '???? ho??n th??nh';
    }

    if ((document.status || 0) === 4) {
      return 'Qu?? h???n';
    }

    if ((document.status || 0) === 5) {
      return 'T??? ch???i';
    }

    if (!document.processStatus) {
      return '???? g???i';
    }

    if (document.processStatus == 1) {
      return 'Ch??? ph?? duy???t';
    }

    if (document.processStatus === 2 && document.oldStatus === 1 ) {
      return 'Ch??? k??';
    }

    if (document.processStatus === 2 && document.oldStatus === 2 ) {
      return 'Ho??n th??nh';
    }

    return '';
  }

  private getDocumentStatusName(document: any) {
    if(document.oldStatus) {
      return '???? h???y';
    }

    if ((document.status || 0) === 0) {
      return 'Nh??p';
    }

    if ((document.status || 0) === 2) {
      return '???? ho??n th??nh';
    }

    if ((document.status || 0) === 4) {
      return 'Qu?? h???n';
    }

    if ((document.status || 0) === 5) {
      return 'T??? ch???i';
    }

    if (!document.processStatus) {
      return '???? g???i';
    }

    if (document.processStatus == 1) {
      return 'Ch??? ph?? duy???t';
    }

    if (document.processStatus === 2 && document.status === 1 ) {
      return 'Ch??? k??';
    }

    if (document.processStatus === 2 && document.status === 2 ) {
      return 'Ho??n th??nh';
    }

    return '';
  }
   
}
