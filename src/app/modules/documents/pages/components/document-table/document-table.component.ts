import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { DOCUMENTSTATUS } from "@app/shared/constant";
import { Credential } from '@app/core/models';
import { AuthenticationService } from "@app/core/services";
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: "app-document-table",
  templateUrl: "./document-table.component.html",
  styleUrls: ["./document-table.component.less"],
})
export class DocumentTableComponent implements OnInit {
  @Input() documents: any;
  @Input() tabSeleted: any;
  total = 0;
  selectedPage = 1;
  take = 1;
  numberPages = 1;
  skip = 1;
  currentUser: Credential;
  currentEmail: any;
  userCreate: any;
  isSelectAll: boolean;
  status: any = DOCUMENTSTATUS;
  @Output() editDocument: EventEmitter<any> = new EventEmitter();
  @Output() continueSignDocument: EventEmitter<any> = new EventEmitter();
  @Output() viewDocument: EventEmitter<any> = new EventEmitter();
  @Output() onPageChange: EventEmitter<any> = new EventEmitter();
  @Output() onCheckChange: EventEmitter<any> = new EventEmitter();
  @Output() onApproveDocument: EventEmitter<any> = new EventEmitter();
  @Output() onSingDocument: EventEmitter<any> = new EventEmitter();
  @Output() onQuickView: EventEmitter<any> = new EventEmitter();
  @Output() onCancelDocument: EventEmitter<any> = new EventEmitter();
  @Output() onSendEamilNotification: EventEmitter<any> = new EventEmitter();
  @Output() onDownloadDocument: EventEmitter<any> = new EventEmitter();
  @Output() onDownloadCancelDocument: EventEmitter<any> = new EventEmitter();
  @Output() onRestoreDocument: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteDocument: EventEmitter<any> = new EventEmitter();
  @Output() onExtendDocument: EventEmitter<any> = new EventEmitter();
  
  constructor(
    private authService: AuthenticationService,
    private modalService: NzModalService,
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentCredentials;
    this.currentEmail = this.currentUser.email;  
    this.userCreate = this.currentUser.id;  
  }

  ngOnChanges(changes) {
    if (
      changes.documents &&
      changes.documents.currentValue &&
      changes.documents.currentValue.length
    ) {
      let documents = changes.documents.currentValue;
      this.documents = documents;
      this.isSelectAll =
        documents.length > 0 && documents.filter((x) => !x.isSelected) == 0;
      this.caculatorPage();
    }
  }

  private caculatorPage() {
    if (!this.documents) {
      return 1;
    }
    this.total = (this.documents.total || 0) * 1;
    this.take = (this.documents.take || 0) * 1;
    let numberPaging = this.total / this.take;
    numberPaging = parseInt(numberPaging.toString());
    const surplus = this.total % this.take;
    if (surplus > 0) {
      numberPaging = numberPaging + 1;
    }

    this.numberPages = numberPaging;
  }

  pageChange(page) {
    this.skip = page === 1 ? 0 : (page - 1) * this.take;

    this.onPageChange.emit({
      skip: this.skip,
      page,
    });
  }

  firstPage() {
    this.selectedPage = 1;
    this.pageChange(1);
  }

  nextPage() {
    let nextPage = this.selectedPage + 1;
    if (nextPage <= this.numberPages) {
      this.selectedPage = nextPage;
      this.pageChange(nextPage);
    }
  }

  previousPage() {
    let previous = this.selectedPage - 1;
    if (previous > 0) {
      this.selectedPage = previous;
      this.pageChange(previous);
    }
  }

  lastPage() {
    this.selectedPage = this.numberPages;
    this.pageChange(this.selectedPage);
  }

  selectAllDocument() {
    this.onCheckChange.emit({
      isSelectAll: true,
      checked: this.isSelectAll,
    });
  }

  documentSelect(document: any) {
    this.onCheckChange.emit({
      isSelectAll: false,
      id: document.id,
      checked: document.isSelected,
    });
  }

  viewDetail(item) {
    this.viewDocument.emit(item);
  }

  continue(item) {
    this.continueSignDocument.emit(item);
  }

  singDocument(item) {
    this.onSingDocument.emit(item);
  }

  approveDocument(item) {
    this.onApproveDocument.emit(item);
  }
  
  quickView(item) {
    this.onQuickView.emit(item);
  }

  cancelDocument(item) {
    this.onCancelDocument.emit(item);
  }

  sendEamilNotification(item) {
    const modalData = this.buildConfirm(item);
    this.modalService.confirm({
      nzTitle: modalData.title,
      nzContent: modalData.content,
      nzOkText: 'G???i',
      nzCancelText: '????ng',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.onSendEamilNotification.emit(modalData);
      }
    });
  }

  deleteDocument(item) {
    this.modalService.confirm({
      nzTitle: 'X??c nh???n x??a h???p ?????ng',
      nzContent: 'B???n c?? ch???c ch???n mu???n x??a h???p ?????ng n??y ?',
      nzOkText: 'X??a',
      nzCancelText: 'B??? qua',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.onDeleteDocument.emit(item);
      }
    });
  }

  downloadDocument(item) {
    this.onDownloadDocument.emit(item);
  }

  downloadCancelDocument(item) {
    this.onDownloadCancelDocument.emit(item);
  }

  private buildConfirm(item) {
    let  titleDialog = 'G???i email nh???c duy???t';
    let contents = `B???n c?? ch???c ch???n mu???n g???i email nh???c l???i vi???c duy???t t??i li???u ?????n ?????a ch??? email ${item.persionActionEmail} ?`
    if (item.processStatus == 2) {
      titleDialog = 'G???i email nh???c k??';
      contents = `B???n c?? ch???c ch???n mu???n g???i email nh???c l???i vi???c k?? t??i li???u ?????n ?????a ch??? email ${item.persionActionEmail} ?`
    }
    return {
      documentId: item.id,
      title: titleDialog,
      content: contents,
      emailTo: item.persionActionEmail,
      currentEmail: item.persionActionEmail,
    } 
  }
  restoreDocument(item) {
    this.onRestoreDocument.emit(item);
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

  extendDocument(item) {
    this.onExtendDocument.emit(item);
  }
}
