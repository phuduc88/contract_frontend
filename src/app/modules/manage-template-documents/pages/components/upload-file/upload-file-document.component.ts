import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-upload-file-document",
  templateUrl: "./upload-file-document.component.html",
  styleUrls: ["./upload-file-document.component.less"],
})
export class UploadFileDocumentComponent implements OnInit {
  @Input() accept;
  @Output() onChangeFileSuccess: EventEmitter<any> = new EventEmitter();

  ngOnInit() {}

  handleChange(event) {
    this.onChangeFileSuccess.emit(event);
  }
}
