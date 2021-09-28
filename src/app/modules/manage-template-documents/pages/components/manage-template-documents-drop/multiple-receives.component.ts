import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-multiple-receives",
  templateUrl: "./multiple-receives.component.html",
  styleUrls: ["./multiple-receives.component.less"],
})
export class MultipleReceivesComponent implements OnInit {
  @Output() onGoBack: EventEmitter<any> = new EventEmitter();
  ngOnInit() {}

  goBack() {
    this.onGoBack.emit({ goStep: 2 });
  }
}
