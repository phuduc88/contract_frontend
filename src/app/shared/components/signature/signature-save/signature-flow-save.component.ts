import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  AuthenticationService,
} from "@app/core/services";
import { Credential } from "@app/core/models";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

@Component({
  selector: "signature-flow-save",
  templateUrl: "./signature-flow-save.component.html",
  styleUrls: ["./signature-flow-save.component.less"],
})
export class SignatureFlowSaveComponent implements OnInit {
  @Input() documentSign: any;
  formDocument: FormGroup;
  employeeSignIndex: any;
  employeeApproveIndex: any;
  tabSelected: number = 1;
  currentUser: Credential;
  constructor(
    private modal: NzModalRef,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private modalService: NzModalService,
  ) 
  {}

  ngOnInit() {
    this.getEmployeeWillBeSort();
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
    this.employeeSignIndex = this.documentSign.employeesSign.filter(emp => emp.isEmployeeSign);
    this.employeeApproveIndex = this.documentSign.employeesSign.filter(emp => emp.isEmployeeSign);
  }

  save() : void {
    for (const i in this.formDocument.controls) {
      this.formDocument.controls[i].markAsDirty();
      this.formDocument.controls[i].updateValueAndValidity();
    }

    if (this.formDocument.invalid) {
      this.tabSelected = 1;
      this.modalService.warning({
        nzTitle: 'Vui lòng nhập thông tin Tab nhắn gửi đi'
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
      this.employeeSignIndex,
      event.previousIndex,
      event.currentIndex
    );
  }

  dropEmployeeApprove(event: CdkDragDrop<string[]>) {    
    moveItemInArray(
      this.employeeApproveIndex,
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
      title: "Danh sách người duyệt",
    },
    {
      id: 3,
      title: "Danh sách người ký",
    },
    {
      id: 4,
      title: "Thứ tự ký",
    },
  ];

  private setOrderSignAndApprove() {
    let employeeSignOrder = [...this.employeeSignIndex];
    const employeeApproveIndexCopy = [];
    let index = 1;
    this.employeeApproveIndex.forEach(item => {
      item.approveIndex = index;
      employeeApproveIndexCopy.push(item);
      index++;
    });

    index = 1;
    employeeSignOrder.forEach(item => {
      item.signIndex = index;
      const employee = employeeApproveIndexCopy.find(c => c.id === item.id);
      if (employee) {
        item.approveIndex = employee.approveIndex;
      }
      index++;
    });

    console.log(employeeSignOrder, 'employeeSignOrder');
    return employeeSignOrder;
  }
}
