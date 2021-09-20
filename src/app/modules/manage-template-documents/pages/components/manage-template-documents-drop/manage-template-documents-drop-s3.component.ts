import { Component, OnInit } from "@angular/core";
import { IMPORT_DATA } from "@app/modules/manage-template-documents/data/manage-template-documents-table";
import { eventEmitter } from "@app/shared/utils/event-emitter";

@Component({
  selector: "app-manage-template-documents-drop-s3",
  templateUrl: "./manage-template-documents-drop-s3.component.html",
  styleUrls: ["./manage-template-documents-drop-s3.component.less"],
})
export class ManageTemplateDocumentsDropS3Component implements OnInit {
  datas = IMPORT_DATA;
  currentPage = 1;
  ngOnInit() {}

  nextStep() {
    eventEmitter.emit("template-document:nextStep", {
      file: null,
      goStep: 4,
    });
  }

  goBack() {
    eventEmitter.emit("template-document:prevStep", {
      file: null,
      goStep: 2,
    });
  }
}
