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
  hasFileCancel: boolean = false;
  userCreate: any;
  reason: string = '';
  emailCreate: any;
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
      this.hasFileCancel = changes.documentSign.currentValue.hasFileCancel;
      this.userCreate = changes.documentSign.currentValue.userCreate;
      this.emailCreate = changes.documentSign.currentValue.email;
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
      nzOkText: 'G???i',
      nzCancelText: '????ng',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.onSendEamilNotification.emit(modalData);
      }
    });
  }

  private buildConfirm() {
    let  titleDialog = 'G???i email nh???c duy???t';
    let contents = `B???n c?? ch???c ch???n mu???n g???i email nh???c l???i vi???c duy???t t??i li???u ?????n ?????a ch??? email ${this.documentSign.persionActionEmail} ?`
    if (this.documentSign.processStatus == 2) {
      titleDialog = 'G???i email nh???c k??';
      contents = `B???n c?? ch???c ch???n mu???n g???i email nh???c l???i vi???c k?? t??i li???u ?????n ?????a ch??? email ${this.documentSign.persionActionEmail} ?`
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
