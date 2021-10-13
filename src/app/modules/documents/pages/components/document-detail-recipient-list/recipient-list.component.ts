import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-document-detail-recipient-list",
  templateUrl: "./recipient-list.component.html",
  styleUrls: ["./recipient-list.component.less"],
})
export class DocumentDetailRecipientListComponent implements OnInit {
  @Input() employeesSign: any;
  @Output() onDownloadDocumentFile: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
     
  }

  downloadDocument() {
    this.onDownloadDocumentFile.emit();
  }
}
