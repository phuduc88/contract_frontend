import { Component, OnInit } from "@angular/core";
import { IMPORT_DATA } from "@app/modules/manage-template-documents/data/manage-template-documents-table";
import { eventEmitter } from "@app/shared/utils/event-emitter";

@Component({
  selector: "app-manage-template-documents-drop-s4",
  templateUrl: "./manage-template-documents-drop-s4.component.html",
  styleUrls: ["./manage-template-documents-drop-s4.component.less"],
})
export class ManageTemplateDocumentsDropS4Component implements OnInit {
  datas = IMPORT_DATA;
  currentPage = 1;
  ngOnInit() {}


  goBack(){
    eventEmitter.emit("template-document:prevStep", {
      file: null,
      goStep: 2,
    });
  }
}
