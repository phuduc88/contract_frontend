import { Component, OnInit, OnChanges, Input } from "@angular/core";
import {  SIGN_TYPE_VIEW, ROLE_ACTION } from "@app/shared/constant";

@Component({
  selector: "app-document-detail-sign-documents",
  templateUrl: "./sign-documents.component.html",
  styleUrls: ["./sign-documents.component.less"],
})
export class DocumentDetailSignDocumentsComponent implements OnInit, OnChanges {
  @Input() filesSign: any;
  @Input() documentSign: any;
  numberDocument: any;
  signTypeView = SIGN_TYPE_VIEW;
  roleAction = ROLE_ACTION;
  processStatus: any;
  persionActionEmail: any;

  ngOnInit() {}

  ngOnChanges(changes) {
    if (changes && changes.filesSign.currentValue && changes.filesSign.currentValue.length) { 
        this.numberDocument = changes.filesSign.currentValue.length;
    }

    if (changes.documentSign && changes.documentSign.currentValue) {
      this.processStatus  = changes.documentSign.currentValue.processStatus;
      this.persionActionEmail  = changes.documentSign.currentValue.persionActionEmail;
      // this.reason = changes.documentSign.currentValue.reason;
      // this.isCancel = changes.documentSign.currentValue.isCancel;
      // this.userCreate = changes.documentSign.currentValue.userCreate;
    }
  }
}
