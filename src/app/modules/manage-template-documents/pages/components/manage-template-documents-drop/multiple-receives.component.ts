import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-multiple-receives",
  templateUrl: "./multiple-receives.component.html",
  styleUrls: ["./multiple-receives.component.less"],
})
export class MultipleReceivesComponent implements OnInit {
  @Output() onGoBack: EventEmitter<any> = new EventEmitter();
  @Output() onDownloadFileTemplateReceiver: EventEmitter<any> = new EventEmitter();
  @Output() resizechangeFileReceiver : EventEmitter<any> = new EventEmitter();
  
  ngOnInit() {}

  goBack() {
    this.onGoBack.emit({ goStep: 2 });
  }

  changeFileReceiverSuccess() {
   this.resizechangeFileReceiver.emit({file: event, goStep: 3,});
  }

  downloadFileTemplateReceiver() {
    this.onDownloadFileTemplateReceiver.emit();
  }
}
