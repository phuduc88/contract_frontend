import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ContractService } from "@app/core/services";
import {
  PAGE_SIZE,
  STATUS,
  ACTION,
  ROLE,
  DOCUMENTSTATUS,
} from "@app/shared/constant";
import { getBirthDay } from "@app/shared/utils/custom-validation";
import { NzModalService } from "ng-zorro-antd/modal";
import { eventEmitter } from "@app/shared/utils/event-emitter";

@Component({
  selector: "app-contract-search",
  templateUrl: "./contract-search.component.html",
  styleUrls: ["./contract-search.component.less"],
})
export class ContractSearchComponent implements OnInit, OnDestroy {
  curentStep = 1;
  private handlers;

  constructor() {}

  ngOnInit() {
    this.handlers = [
      eventEmitter.on("contract:nextStep", ({ step }) => {
        this.curentStep = step;
      }),
    ];
  }

  ngOnDestroy() {
    eventEmitter.destroy(this.handlers);
  }
}
