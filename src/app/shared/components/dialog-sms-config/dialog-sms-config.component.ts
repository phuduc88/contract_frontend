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
  @Input() customerInfo: any;
  customerType: any;
  formCustomer: FormGroup;
  constructor(
    private modal: NzModalRef,
    private formBuilder: FormBuilder, 
  ) 
  {}

  ngOnInit() {
    this.customerType = this.customerInfo.customerType;
    this.formCustomer = this.formBuilder.group({
      customerType: [this.customerInfo.customerType, Validators.required],
      identityCard: [this.customerInfo.identityCard, Validators.required],
      taxCode: [this.customerInfo.taxCode, Validators.required],
      customerName: [this.customerInfo.customerName, Validators.required],
      address: [this.customerInfo.address, Validators.required],
      email: [this.customerInfo.email, [Validators.required,Validators.pattern(REGEX.EMAIL)]],
      mobile: [this.customerInfo.mobile, [Validators.required, Validators.pattern(REGEX.PHONE_NUMBER)]],
      delegate: [this.customerInfo.delegate],
      position: [this.customerInfo.position],
      bankName: [this.customerInfo.bankName],
      bankAccount: [this.customerInfo.bankAccount],
    });
    this.setValidForm();
  }

  dismiss() {
    this.modal.destroy();
  }

  save() {
    for (const i in this.formCustomer.controls) {
      this.formCustomer.controls[i].markAsDirty();
      this.formCustomer.controls[i].updateValueAndValidity();
    }

    if (this.formCustomer.invalid) {
      return;
    }

    this.modal.destroy(this.getData());
  }

  ngAfterViewInit() {}

  ngOnDestroy() { }

  changeCustomerType(event) {
    this.customerType = event;
    this.setValidForm();
  }

  setValidForm() {
    if (this.customerType == 1) {
      this.formCustomer.get('identityCard').clearValidators();
      this.formCustomer.get('identityCard').markAsPristine();
      this.formCustomer.get('taxCode').setValidators(Validators.required);
     
    } else {
      this.formCustomer.get('identityCard').setValidators(Validators.required);
      this.formCustomer.get('taxCode').markAsPristine();
      this.formCustomer.get('taxCode').clearValidators();
    }  
  }

  getData() {
    const formValue = {
        ...this.formCustomer.getRawValue(),         
    };
    if (this.customerType === 1) { 
      formValue.identityCard = null;
    }

    if (this.customerType !== 1) { 
      formValue.taxCode = null;
    }
    formValue.id = this.customerInfo.id;
    return formValue;
  }
}
