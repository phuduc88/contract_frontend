import { AfterViewInit, Component, Input, Output, EventEmitter, OnDestroy, OnInit, ViewContainerRef, OnChanges } from "@angular/core";
import * as $ from 'jquery';
import { NzModalRef } from "ng-zorro-antd/modal";
import 'jqueryui';
import { eventEmitter } from '@app/shared/utils/event-emitter';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DATE_FORMAT, REGEX } from '@app/shared/constant';
@Component({
  selector: 'app-email-config',
  templateUrl: './dialog-email-config.component.html',
  styleUrls: ['dialog-email-config.component.less']
})
export class DialogEmailConfigComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() emailConfig: any;
  customerType: any;
  passwordVisible = false;
  formEmailConfig: FormGroup;
  constructor(
    private modal: NzModalRef,
    private formBuilder: FormBuilder, 
  ) 
  {}

  ngOnInit() {
    this.formEmailConfig = this.formBuilder.group({
      serverName: [this.emailConfig.serverName, Validators.required],
      ipAddress: [this.emailConfig.ipAddress, Validators.required],
      port: [this.emailConfig.port, Validators.required],
      ssl: [this.emailConfig.ssl, Validators.required],
      account: [this.emailConfig.account, Validators.required],
      password: [this.emailConfig.password, Validators.required],
      emailSend: [this.emailConfig.emailSend, [Validators.required,Validators.pattern(REGEX.EMAIL)]],
      emailCC: [this.emailConfig.emailCC, [Validators.required, Validators.pattern(REGEX.EMAIL)]],
      active: [this.emailConfig.active],
    });
  }

  dismiss() {
    this.modal.destroy();
  }

  save() {
    for (const i in this.formEmailConfig.controls) {
      this.formEmailConfig.controls[i].markAsDirty();
      this.formEmailConfig.controls[i].updateValueAndValidity();
    }

    if (this.formEmailConfig.invalid) {
      return;
    }

    this.modal.destroy(this.getData());
  }

  ngAfterViewInit() {}

  ngOnDestroy() { }

  getData() {
    const formValue = {
        ...this.formEmailConfig.getRawValue(),         
    };
    if (this.customerType === 1) { 
      formValue.identityCard = null;
    }

    if (this.customerType !== 1) { 
      formValue.taxCode = null;
    }
    formValue.id = this.emailConfig.id;
    return formValue;
  }
}
