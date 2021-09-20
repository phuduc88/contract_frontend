import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MANAGE_TEMPLATE_DOCUMENT_DATA } from "@app/modules/manage-template-documents/data/manage-template-documents-table";
import { eventEmitter } from "@app/shared/utils/event-emitter";

@Component({
  selector: "app-manage-template-documents-drop-s2",
  templateUrl: "./manage-template-documents-drop-s2.component.html",
  styleUrls: ["./manage-template-documents-drop-s2.component.less"],
})
export class ManageTemplateDocumentsDropS2Component implements OnInit {
  datas = MANAGE_TEMPLATE_DOCUMENT_DATA;
  ngOnInit() {}

  changeFileSuccess(event) {
    eventEmitter.emit("template-document:nextStep", {
      file: event,
      goStep: 3,
    });
  }

  goBack() {
    eventEmitter.emit("template-document:prevStep", {
      file: null,
      goStep: 1,
    });
  }
}
