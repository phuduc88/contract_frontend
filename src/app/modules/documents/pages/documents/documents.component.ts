import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthenticationService, SignFlowService, DocumentTypeService } from '@app/core/services';
import { Router } from '@angular/router';
import { Credential } from '@app/core/models';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SignatureFlowComponent } from '@app/shared/components';
import { PAGE_SIZE, MIME_TYPE } from '@app/shared/constant';
import { download } from '@app/shared/utils/download-file';
import { forkJoin, Subject } from 'rxjs';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.less']
})
export class DocumentsComponent implements OnInit {
  currentUser: Credential;
  documents: any;
  skip: number;
  selectedPage: number = 1;
  isSpinning: boolean = false;
  filter: any = {};
  constructor(private authService: AuthenticationService,
    private modalService: NzModalService,
    private signFlowService: SignFlowService,
    private viewContainerRef: ViewContainerRef,
    private documentTypeService: DocumentTypeService,
    private router:Router,
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.currentCredentials;
    this.filterDocuments();
  }

  filterDocuments(skip = 0, take = PAGE_SIZE) {
    this.isSpinning = true;
    const paramSearch = {
      ...this.filter,
      skip,
      take
    }
    this.signFlowService.filter(paramSearch)
    .subscribe((items) => {
      this.documents = items.data;
      this.skip = skip;
      this.documents.total = items.total
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
    this.filterDocuments();
  }

  singDocument(documentId) {
    this.signFlowService.downloadFileSign(documentId).then((response) => {
      const subfixFile = '.pdf';
      const fileName =  `sign_templ${ subfixFile }`;
      const mimeType = this.getMimeType(subfixFile);
      download(fileName, response, mimeType);
    });
  }

  private handlePageChange({ skip, page }) {
    this.skip = skip;
    this.selectedPage = page;
    this.filterDocuments(skip);
  }

  editDocument(itemEdit) {
    
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
