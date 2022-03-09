import { Component, OnInit, OnChanges, Input, Output,EventEmitter } from "@angular/core";
import {  SIGN_TYPE_VIEW, ROLE_ACTION } from "@app/shared/constant";

@Component({
  selector: "app-document-detail-sign-documents",
  templateUrl: "./sign-documents.component.html",
  styleUrls: ["./sign-documents.component.less"],
})
export class DocumentDetailSignDocumentsComponent implements OnInit, OnChanges {
  @Input() filesSign: any;
  @Input() documentSign: any;
  @Output() onViewCertificate: EventEmitter<any> = new EventEmitter();
  numberDocument: any;
  signTypeView = SIGN_TYPE_VIEW;
  roleAction = ROLE_ACTION;
  processStatus: any;
  documentStatus: any;
  persionActionEmail: any;

  ngOnInit() {}

  ngOnChanges(changes) {
    if (changes && changes.filesSign.currentValue && changes.filesSign.currentValue.length) { 
        this.numberDocument = changes.filesSign.currentValue.length;
    }

    if (changes.documentSign && changes.documentSign.currentValue) {
      this.processStatus  = changes.documentSign.currentValue.processStatus;
      this.documentStatus = changes.documentSign.currentValue.status;
      this.persionActionEmail  = changes.documentSign.currentValue.persionActionEmail;
    }
  }

  viewCertificate(signData) {
    this.onViewCertificate.emit(signData);
  }
}
