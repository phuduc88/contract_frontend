import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { NzModalService } from "ng-zorro-antd/modal";
import { ContractAuthenticationProcessS2Component } from "../components";
@Component({
  selector: "app-contract-search-authentication",
  templateUrl: "./contract-search-authentication.component.html",
  styleUrls: ["./contract-search-authentication.component.less"],
})
export class ContractSearchAuthenticationComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  constructor(private modalService: NzModalService) {}

  ngOnInit() {}

  changeFile(event) {
    const modal = this.modalService.create({
      nzClosable: true,
      nzTitle: "Xác thực hợp đồng",
      nzStyle: { top: 0 },
      nzClassName: "invite-employee signature-flow",
      nzKeyboard: false,
      nzContent: ContractAuthenticationProcessS2Component,
      nzOnOk: (data) => console.log("Click ok", data),
      nzFooter: [],
    });
  }

  ngAfterViewInit() {}

  ngOnDestroy() {}
}
