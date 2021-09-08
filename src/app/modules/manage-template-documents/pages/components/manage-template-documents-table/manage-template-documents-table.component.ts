import { Component, OnInit } from "@angular/core";
import { MANAGE_TEMPLATE_DOCUMENTS_DATA } from "@app/modules/manage-template-documents/data/manage-template-documents-table";

@Component({
  selector: "app-manage-template-documents-table",
  templateUrl: "./manage-template-documents-table.component.html",
  styleUrls: ["./manage-template-documents-table.component.less"],
})
export class ManageTemplateDocumentsTableComponent implements OnInit {
  datas = MANAGE_TEMPLATE_DOCUMENTS_DATA;
  currentPage = 1;
  ngOnInit() {}
}
