import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { eventEmitter } from "@app/shared/utils/event-emitter";

@Component({
  selector: "app-manage-template-documents-drop-s2",
  templateUrl: "./manage-template-documents-drop-s2.component.html",
  styleUrls: ["./manage-template-documents-drop-s2.component.less"],
})
export class ManageTemplateDocumentsDropS2Component implements OnInit {
  datas: any;
  @Input() documentTemplate: any;
  @Output() onDowloadFileBookmark: EventEmitter<any> = new EventEmitter();
  @Output() onUploadFileBookmark: EventEmitter<any> = new EventEmitter();
  @Output() resizeDeleteBookmark: EventEmitter<any> = new EventEmitter();
  @Output() resizeDownloadTemplateBookmark: EventEmitter<any> = new EventEmitter();
  @Output() resizeQuickView: EventEmitter<any> = new EventEmitter();
  @Output() onGoBack: EventEmitter<any> = new EventEmitter();
  ngOnInit() {}

  changeFileSuccess(event) {
    this.onUploadFileBookmark.emit({file: event, goStep: 3,});
  }

  goBack() {
    this.onGoBack.emit({goStep: 1});
  }

  
  downloadFileTemplateBookmark(documentTemplate) {
    this.onDowloadFileBookmark.emit(documentTemplate);
  }

  handleDeleteBookmark(data) {
    this.resizeDeleteBookmark.emit(data)
  }

  handleDownloadTemplateBookmark(data) {
    this.resizeDownloadTemplateBookmark.emit(data)
  }

  handleQuickView(data) {
    this.resizeQuickView.emit(data)
  }
 }
