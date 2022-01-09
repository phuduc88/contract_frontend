import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { eventEmitter } from "@app/shared/utils/event-emitter";

@Component({
  selector: "app-manage-template-documents-drop-s4",
  templateUrl: "./manage-template-documents-drop-s4.component.html",
  styleUrls: ["./manage-template-documents-drop-s4.component.less"],
})
export class ManageTemplateDocumentsDropS4Component implements OnInit {
  @Input() documentTemplate: any;
  @Output() onGoBack: EventEmitter<any> = new EventEmitter();
  @Output() resizeQuickView: EventEmitter<any> = new EventEmitter();
  currentPage = 1;
  ngOnInit() {}

  goBack() {
    this.onGoBack.emit({
      goStep: 2,
    });
  }

  importMultipleReceives() {
    this.onGoBack.emit({
      goStep: 5,
    });
  }

  quickView(data) {
    this.resizeQuickView.emit({data});
  }
}
