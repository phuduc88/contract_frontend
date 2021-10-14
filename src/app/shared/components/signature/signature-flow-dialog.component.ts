import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthenticationService, SignFlowService } from "@app/core/services";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { Credential } from "@app/core/models";

@Component({
  selector: "signature-flow-dialog",
  templateUrl: "./signature-flow-dialog.component.html",
  styleUrls: ["signature-flow-dialog.component.less"],
})
export class SignatureFlowDialogComponent implements OnInit, OnDestroy {
  currentUser: Credential;
  currentStep = 1;
  documentSign: any;

  constructor(
    private modal: NzModalRef,
    private modalService: NzModalService,
    private authService: AuthenticationService,
    private signFlowService: SignFlowService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentCredentials;
  }

  ngOnDestroy() {}

  nextStep() {
    this.signFlowService.getDetail("1096").subscribe((data) => {
      this.documentSign = data;
      this.documentSign.listSign = [];
      this.currentStep = 2;
    });
  }

  prevStep() {
    this.currentStep = 1;
  }
}
