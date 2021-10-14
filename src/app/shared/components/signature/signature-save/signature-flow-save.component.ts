import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  AuthenticationService,
} from "@app/core/services";
import { Credential } from "@app/core/models";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import {  SIGN_TYPE_VIEW } from "@app/shared/constant";
@Component({
  selector: "signature-flow-save",
  templateUrl: "./signature-flow-save.component.html",
  styleUrls: ["./signature-flow-save.component.less"],
})
export class SignatureFlowSaveComponent implements OnInit {
  @Input() documentSign: any;
  formDocument: FormGroup;
  employeesSign: any;
  currentUser: Credential;
  signTypeView = SIGN_TYPE_VIEW;
  constructor(
    private modal: NzModalRef,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private modalService: NzModalService,
  ) 
  {}

  ngOnInit() {
    this.employeesSign = this.documentSign.employeesSign;
    this.currentUser = this.authService.currentCredentials;
    this.formDocument = this.formBuilder.group({
      title: ['',[Validators.required] ],
      contents: ['', [Validators.required]],
      enableSendEmailConfrim: [(this.currentUser.systemConfig.timeAutoSendEmail)],
      timeAutoSendEmail: [this.currentUser.systemConfig.timeAutoSendEmail],
      enableTimeDocumentExpire: [(this.currentUser.systemConfig.timeDocumentExpire)],
      timeDocumentExpire: [this.currentUser.systemConfig.timeDocumentExpire],
    });
  }

  dismiss(): void {
    this.modal.destroy();
  }

  getEmployeeWillBeSort() {
    
  }

  save() : void {
    for (const i in this.formDocument.controls) {
      this.formDocument.controls[i].markAsDirty();
      this.formDocument.controls[i].updateValueAndValidity();
    }

    if (this.formDocument.invalid) {      
      this.modalService.warning({
        nzTitle: 'Vui lòng nhập thông tin Tab Tin nhắn gửi đi'
      });
      return;
    }

    this.sendEmail();
  }

  sendEmail() {
    const data = this.formDocument.getRawValue();
    data.employeeSignOrder = this.setOrderSignAndApprove();
    this.modal.destroy(data);
  }

  drop(event: CdkDragDrop<string[]>) {    
    moveItemInArray(
      this.employeesSign,
      event.previousIndex,
      event.currentIndex
    );
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

  private setOrderSignAndApprove() {
    let employeeSignOrder = [...this.employeesSign];
    let index = 1;
    employeeSignOrder.forEach(item => {
      item.signIndex = index;
      index++;
    });

    return employeeSignOrder;
  }
}
