import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import {
  AuthenticationService,
} from "@app/core/services";
import { Credential } from "@app/core/models";

@Component({
  selector: "signature-flow-save",
  templateUrl: "./signature-flow-save.component.html",
  styleUrls: ["./signature-flow-save.component.less"],
})
export class SignatureFlowSaveComponent implements OnInit {
  @Input() documentSign?: any;
  formDocument: FormGroup;
  currentUser: Credential;
  constructor(
    private modal: NzModalRef,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
  ) 
  {}

  ngOnInit() {
    this.currentUser = this.authService.currentCredentials;
    this.formDocument = this.formBuilder.group({
      title: ['',[Validators.required] ],
      message: [''],
      enableSendEmailConfrim: [(this.currentUser.systemConfig.timeAutoSendEmail)],
      timeAutoSendEmail: [this.currentUser.systemConfig.timeAutoSendEmail],
      enableTimeDocumentExpire: [(this.currentUser.systemConfig.timeDocumentExpire)],
      timeDocumentExpire: [this.currentUser.systemConfig.timeDocumentExpire],
    });
  }

  dismiss(): void {
    this.modal.destroy();
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
