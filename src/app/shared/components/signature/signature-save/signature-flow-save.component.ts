import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "signature-flow-save",
  templateUrl: "./signature-flow-save.component.html",
  styleUrls: ["./signature-flow-save.component.less"],
})
export class SignatureFlowSaveComponent implements OnInit {
  @Input() documentSign?: any;

  ngOnInit() {
 
  }
  tabs = [
    {
      id: 1,
      title: "Tin nhắn gửi đi",
    },
    {
      id: 2,
      title: "Danh sách người nhận",
    },
    {
      id: 3,
      title: "Thứ tự ký",
    },
  ];
}
