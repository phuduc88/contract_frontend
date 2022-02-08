import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { eventEmitter } from '@app/shared/utils/event-emitter';
@Component({
  selector: "app-upload-file-document",
  templateUrl: "./upload-file-document.component.html",
  styleUrls: ["./upload-file-document.component.less"],
})
export class UploadFileDocumentComponent implements OnInit {
  @Input() accept;
  @Output() onChangeFileSuccess: EventEmitter<any> = new EventEmitter();
  
  private handlers: any = [];

  ngOnInit() {
    this.handlers = [
      eventEmitter.on('clear:fileUpload', (fileUpload) => {
        fileUpload.target.value = '';
      })
    ]
  }

  handleChange(event) {
    this.onChangeFileSuccess.emit(event);
  }
}
