import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from "@angular/core";
import { eventEmitter } from "@app/shared/utils/event-emitter";

@Component({
  selector: "app-manage-template-documents-drop",
  templateUrl: "./manage-template-documents-drop.component.html",
  styleUrls: ["./manage-template-documents-drop.component.less"],
})
export class ManageTemplateDocumentsDropComponent implements OnInit, OnChanges {
  @Input() documents: any;
  @Output() onDowloadFileBookmark: EventEmitter<any> = new EventEmitter();
  @Output() resizeEventPageChange: EventEmitter<any> = new EventEmitter();
  @Output() resizeEventDelete: EventEmitter<any> = new EventEmitter();
  @Output() resizeEventDownloadTemplate: EventEmitter<any> = new EventEmitter();
  @Output() resizeEventDownloadBookmark: EventEmitter<any> = new EventEmitter();
  @Output() resizeViewDetail: EventEmitter<any> = new EventEmitter();
  @Output() resizeChangeFileTemplate: EventEmitter<any> = new EventEmitter();
  @Output() resizeEditDocumentTemplate: EventEmitter<any> = new EventEmitter();
  @Output() resizeFormSearch: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    
  }

  ngOnChanges(changes) { 
  }

  changeFileSuccess(event) {
    this.resizeChangeFileTemplate.emit( {
      file: event,
      goStep: 2,
    });
  }

  handlePageChange(event) {
    this.resizeEventPageChange.emit(event);
  }

  handleDelete(event) {
    this.resizeEventDelete.emit(event);
  }

  handleDownloadTemplate(event) {
    this.resizeEventDownloadTemplate.emit(event);
  }

  handleDownloadBookmark(event) {
    this.resizeEventDownloadBookmark.emit(event);
  }

  handleViewDetail(event) {
    this.resizeViewDetail.emit(event);
  }

  handleEditDocumentTemplate(event) {
    this.resizeEditDocumentTemplate.emit(event);
  }

  handleFormSearch(event) {
    this.resizeFormSearch.emit(event);
  }
}
