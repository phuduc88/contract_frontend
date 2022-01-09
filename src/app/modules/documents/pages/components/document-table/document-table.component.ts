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
      nzOkText: 'Gửi',
      nzCancelText: 'Đóng',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.onSendEamilNotification.emit(modalData);
      }
    });
  }

  deleteDocument(item) {
    this.modalService.confirm({
      nzTitle: 'Xác nhận xóa hợp đồng',
      nzContent: 'Bạn có chắc chắn muốn xóa hợp đồng này ?',
      nzOkText: 'Xóa',
      nzCancelText: 'Bỏ qua',
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
    let  titleDialog = 'Gửi email nhắc duyệt';
    let contents = `Bạn có chắc chắn muốn gửi email nhắc lại việc duyệt tài liệu đến địa chỉ email ${item.persionActionEmail} ?`
    if (item.processStatus == 2) {
      titleDialog = 'Gửi email nhắc ký';
      contents = `Bạn có chắc chắn muốn gửi email nhắc lại việc ký tài liệu đến địa chỉ email ${item.persionActionEmail} ?`
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
      return 'Nháp';
    }

    if ((document.status || 0) === 2) {
      return 'Đã hoàn thành';
    }

    if ((document.status || 0) === 4) {
      return 'Quá hạn';
    }

    if ((document.status || 0) === 5) {
      return 'Từ chối';
    }

    if (!document.processStatus) {
      return 'Đã gửi';
    }

    if (document.processStatus == 1) {
      return 'Chờ phê duyệt';
    }

    if (document.processStatus == 2) {
      return 'Chờ ký';
    }

    return '';
  }

  extendDocument(item) {
    this.onExtendDocument.emit(item);
  }
}
