import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthenticationService, SignFlowService, DocumentTypeService } from '@app/core/services';
import orderBy from 'lodash/orderBy';
import { PAGE_SIZE, MIME_TYPE } from '@app/shared/constant';
import { download } from '@app/shared/utils/download-file';
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
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private documentTypeService: DocumentTypeService,
    private signFlowService: SignFlowService,
  ) { }
  ngOnInit() {
    this.documentId = this.route.snapshot.params.id;
    this.loadDocumentDetail(this.documentId);
  }

  back() {
    this.router.navigate(['/manage-documents/']);
  }

  private loadDocumentDetail(documentId) {
    this.signFlowService.getDetail(documentId).subscribe((data) => {
      this.document = data;
      this.documentName = this.document.documentName;
      this.verifyCode = this.document.id;
      this.privateKey = this.document.privateKey;
      this.dateCreate = this.document.dateCreate;
      this.employeesSign = data.employeesSign;
      this.documentTypeId = data.documentType;
      this.documentStatus = data.status;
      this.documentTypeName = data.documentTypeName;
      this.filesSign = this.mergeFileSign(data.filesSign);
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
   
}
