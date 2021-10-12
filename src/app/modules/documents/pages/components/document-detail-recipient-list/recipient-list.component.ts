import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-document-detail-recipient-list",
  templateUrl: "./recipient-list.component.html",
  styleUrls: ["./recipient-list.component.less"],
})
export class DocumentDetailRecipientListComponent implements OnInit {
  @Input() employeesSign: any;
  ngOnInit() {
     
  }
}
