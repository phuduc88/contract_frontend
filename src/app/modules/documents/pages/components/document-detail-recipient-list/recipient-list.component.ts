import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from "@angular/core";
import { AuthenticationService } from "@app/core/services";
import { NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: "app-document-detail-recipient-list",
  templateUrl: "./recipient-list.component.html",
  styleUrls: ["./recipient-list.component.less"],
})
export class DocumentDetailRecipientListComponent implements OnInit, OnChanges {
  @Input() employeesSign: any;
  @Input() documentSign: any;
  @Output() onDownloadDocumentFile: EventEmitter<any> = new EventEmitter();
  @Output() onRollbackDocument: EventEmitter<any> = new EventEmitter();
  @Output() onSendEamilNotification: EventEmitter<any> = new EventEmitter();
  @Output() onDownloadDocumentCancel: EventEmitter<any> = new EventEmitter();
  
  isCancel: boolean = false;
  userCreate: any;
  reason: string = '';
  userId: any;
  constructor(
    private authService: AuthenticationService,
    private modalService: NzModalService,
  ) {}
  ngOnInit() {
    this.userId = this.authService.currentCredentials.id;  
  }

  ngOnChanges(changes) {
    if (changes.documentSign && changes.documentSign.currentValue) {
      this.reason = changes.documentSign.currentValue.reason;
      this.isCancel = changes.documentSign.currentValue.isCancel;
      this.userCreate = changes.documentSign.currentValue.userCreate;
    }
  }

  downloadDocument() {
    this.onDownloadDocumentFile.emit();
  }

  downloadDocumentFile() {
    this.onDownloadDocumentFile.emit();
  }

  rollbackDocument() {
    this.onRollbackDocument.emit();
  }

  downloadDocumentCancel(){
    this.onDownloadDocumentCancel.emit();
  }

  sendEamilRemard() {
    const modalData = this.buildConfirm();
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

  private buildConfirm() {
    let  titleDialog = 'Gửi email nhắc duyệt';
    let contents = `Bạn có chắc chắn muốn gửi email nhắc lại việc duyệt tài liệu đến địa chỉ email ${this.documentSign.persionActionEmail} ?`
    if (this.documentSign.processStatus == 2) {
      titleDialog = 'Gửi email nhắc ký';
      contents = `Bạn có chắc chắn muốn gửi email nhắc lại việc ký tài liệu đến địa chỉ email ${this.documentSign.persionActionEmail} ?`
    }
    return {
      documentId: this.documentSign.id,
      title: titleDialog,
      content: contents,
      emailTo: this.documentSign.persionActionEmail,
      currentEmail: this.documentSign.persionActionEmail,
    } 
  }
}
