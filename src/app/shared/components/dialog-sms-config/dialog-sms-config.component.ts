import { AfterViewInit, Component, Input, Output, EventEmitter, OnDestroy, OnInit, ViewContainerRef, OnChanges } from "@angular/core";
import * as $ from 'jquery';
import { NzModalRef } from "ng-zorro-antd/modal";
import 'jqueryui';
import { eventEmitter } from '@app/shared/utils/event-emitter';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DATE_FORMAT, REGEX } from '@app/shared/constant';
@Component({
  selector: 'app-dialog-sms-config',
  templateUrl: './dialog-sms-config.component.html',
  styleUrls: ['dialog-sms-config.component.less']
})
export class DialogSMSConfigComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() smsConfigInfo: any;
  formSMSConfig: FormGroup;
  constructor(
    private modal: NzModalRef,
    private formBuilder: FormBuilder, 
  ) 
  {}

  ngOnInit() {
     
    this.formSMSConfig = this.formBuilder.group({
      provider: [this.smsConfigInfo.provider, Validators.required],
      serviceName: [this.smsConfigInfo.serviceName, Validators.required],
      brandName: [this.smsConfigInfo.brandName, Validators.required],
      account: [this.smsConfigInfo.account, Validators.required],
      password: [this.smsConfigInfo.password, Validators.required],
      active: [this.smsConfigInfo.active],
    });
  }

  dismiss() {
    this.modal.destroy();
  }

  save() {
    this.modal.destroy(this.getData());
  }

  ngAfterViewInit() {}

  ngOnDestroy() { }

   


  getData() {
    const formValue = {
        ...this.formSMSConfig.getRawValue(),         
    };
    formValue.id = this.smsConfigInfo.id;
    return formValue;
  }
}
