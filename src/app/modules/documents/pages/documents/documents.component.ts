import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthenticationService, SignFlowService } from '@app/core/services';
import { Router } from '@angular/router';
import { Credential } from '@app/core/models';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SignatureFlowComponent } from '@app/shared/components';
import { PAGE_SIZE, MIME_TYPE } from '@app/shared/constant';
import { download } from '@app/shared/utils/download-file';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.less']
})
export class DocumentsComponent implements OnInit {
  currentUser: Credential;
  documents: any = {};
  constructor(private authService: AuthenticationService,
    private modalService: NzModalService,
    private signFlowService: SignFlowService,
    private viewContainerRef: ViewContainerRef,
    private router:Router,
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.currentCredentials;
    this.filterDocuments();
  }

  filterDocuments(skip = 0, take = PAGE_SIZE) {
    this.signFlowService.filter({
      skip,
      take,
    }).subscribe((items) => {
      this.documents = items;
    });
  }

  changeTab({ index }) {
  }

  singDocument(documentId) {
    this.signFlowService.downloadFileSign(documentId).then((response) => {
      const subfixFile = '.pdf';
      const fileName =  `sign_templ${ subfixFile }`;
      const mimeType = this.getMimeType(subfixFile);
      download(fileName, response, mimeType);
    });
  }

  editDocument(itemEdit) {
    
  }

  continueSignDocument(documentId) {
    this.signFlowService.getDetail(documentId).subscribe((data) => {
      this.showDocumentSign(data);
    });
  }

  showDocumentSign(documentSign) {

    this.modalService.create({
      nzClosable: false,
      nzTitle: 'Ký tài liệu',
      nzStyle: { top: 0 },
      nzClassName: "signature-flow",
      nzKeyboard: false,
      nzContent: SignatureFlowComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: [],
      nzComponentParams: {
        documentSign,
      },
    });
  }

  viewDocument(documentView) {
    this.router.navigate(['/manage-documents/'+ documentView.id]);
  }

  getMimeType(subfixFile: string) {
    const mimeType = MIME_TYPE.find(c => c.key === subfixFile);
    if (mimeType) {
      return mimeType.value;
    }
    return MIME_TYPE[0].value
  }
}
