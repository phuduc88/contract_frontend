import { Component, OnInit } from "@angular/core";
import { NzModalService } from "ng-zorro-antd/modal";
import { SIGNING_STREAM_DATA } from "../../../data/signing-stream-table";
import { SigningStreamFormComponent } from "../signing-stream-form/signing-stream-form.component";

@Component({
  selector: "app-general-settings-signing-stream",
  templateUrl: "./signing-stream.component.html",
  styleUrls: ["./signing-stream.component.less"],
})
export class SigningStreamComponent implements OnInit {
  datas: any = SIGNING_STREAM_DATA;
  constructor(private modalService: NzModalService) {}
  ngOnInit() {}

  add() {
    const modal = this.modalService.create({
      nzWidth: 980,
      nzWrapClassName: "signing-stream-modal",
      nzTitle: "Thiết lập thông tin người nhận theo luồng ký",
      nzContent: SigningStreamFormComponent,
      nzOnOk: (data) => console.log("Click ok", data),
      nzComponentParams: {},
      nzMaskClosable: false,
    });

    modal.afterClose.subscribe((result) => {});
  }
}
