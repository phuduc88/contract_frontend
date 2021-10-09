import { AfterViewInit, Component, Input, Output, EventEmitter, OnDestroy, OnInit, ViewContainerRef, OnChanges } from "@angular/core";
import * as $ from 'jquery';
import { NzModalRef } from "ng-zorro-antd/modal";
import 'jqueryui';
import { eventEmitter } from '@app/shared/utils/event-emitter';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DATE_FORMAT, REGEX } from '@app/shared/constant';
@Component({
  selector: 'app-dialog-hsm-config',
  templateUrl: './dialog-hsm-config.component.html',
  styleUrls: ['dialog-hsm-config.component.less']
})
export class DialogHSMConfigComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() hsmConfig: any;
  customerType: any;
  formHsmSetting: FormGroup;
  constructor(
    private modal: NzModalRef,
    private formBuilder: FormBuilder, 
  ) 
  {}

  ngOnInit() {
    this.formHsmSetting = this.formBuilder.group({
      provider: [this.hsmConfig.provider, Validators.required],
      serviceName: [this.hsmConfig.serviceName, Validators.required],
      parameterConnect: [this.hsmConfig.parameterConnect],
      active: [this.hsmConfig.active],
    });
  }

  dismiss() {
    this.modal.destroy();
  }

  save() {
    for (const i in this.formHsmSetting.controls) {
      this.formHsmSetting.controls[i].markAsDirty();
      this.formHsmSetting.controls[i].updateValueAndValidity();
    }

    if (this.formHsmSetting.invalid) {
      return;
    }

    this.modal.destroy(this.getData());
  }

  ngAfterViewInit() {}

  ngOnDestroy() { }

   

  getData() {
    const formValue = {
        ...this.formHsmSetting.getRawValue(),         
    };
    formValue.id = this.hsmConfig.id;
    return formValue;
  }
}
