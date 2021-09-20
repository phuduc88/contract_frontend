import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-manage-template-documents-table",
  templateUrl: "./manage-template-documents-table.component.html",
  styleUrls: ["./manage-template-documents-table.component.less"],
})
export class ManageTemplateDocumentsTableComponent implements OnInit {
  @Input() datas;
  ngOnInit() {}
}
