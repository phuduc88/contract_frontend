import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MANAGE_TEMPLATE_DOCUMENTS_DATA } from "@app/modules/manage-template-documents/data/manage-template-documents-table";
import { eventEmitter } from "@app/shared/utils/event-emitter";

@Component({
  selector: "app-manage-template-documents-drop",
  templateUrl: "./manage-template-documents-drop.component.html",
  styleUrls: ["./manage-template-documents-drop.component.less"],
})
export class ManageTemplateDocumentsDropComponent implements OnInit {
  datas = MANAGE_TEMPLATE_DOCUMENTS_DATA;
  ngOnInit() {}

  changeFileSuccess(event) {
    eventEmitter.emit("template-document:nextStep", {
      file: event,
      goStep: 2,
    });
  }
}
