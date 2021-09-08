import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzModalRef } from "ng-zorro-antd/modal";

@Component({
  selector: 'invite-employee',
  templateUrl: './invite-employee.component.html'
})
export class InviteEmployeeComponent implements OnInit {
  @Input() employeeInfo: any;
  inviteForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modal: NzModalRef
  ) { }

  ngOnInit() {
    this.inviteForm = this.formBuilder.group({
      email: [this.employeeInfo.email, [Validators.email, Validators.required]],
      fullName: [this.employeeInfo.fullName, [Validators.required]],
      active: [this.employeeInfo.active],
      usingHSM: [this.employeeInfo.usingHSM]
    });
  }

  closeModal() {
    this.modal.destroy();
  }

  inviteEmployee() {
     
    for (const i in this.inviteForm.controls) {
      this.inviteForm.controls[i].markAsDirty();
      this.inviteForm.controls[i].updateValueAndValidity();
    }

    if (this.inviteForm.invalid) {
      return;
    }

    this.modal.destroy({
      id: this.employeeInfo.id,
      ...this.inviteForm.value
    });

  }
}
