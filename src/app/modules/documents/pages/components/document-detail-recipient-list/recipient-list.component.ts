import { Component, OnInit } from "@angular/core";
import { RECIPIENT_LIST_DATA } from "@app/modules/documents/data/recipient-list-table";

@Component({
  selector: "app-document-detail-recipient-list",
  templateUrl: "./recipient-list.component.html",
  styleUrls: ["./recipient-list.component.less"],
})
export class DocumentDetailRecipientListComponent implements OnInit {
  datas = RECIPIENT_LIST_DATA;
  ngOnInit() {
    console.log(this.datas);
  }
}
