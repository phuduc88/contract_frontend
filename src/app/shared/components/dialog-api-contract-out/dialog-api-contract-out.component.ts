import { AfterViewInit, Component, Input, Output, EventEmitter, OnDestroy, OnInit, ViewContainerRef, OnChanges } from "@angular/core";
import * as $ from 'jquery';
import { NzModalRef } from "ng-zorro-antd/modal";
import 'jqueryui';
import { eventEmitter } from '@app/shared/utils/event-emitter';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DATE_FORMAT, REGEX } from '@app/shared/constant';
@Component({
  selector: 'app-api-contract-out',
  templateUrl: './dialog-api-contract-out.component.html',
  styleUrls: ['dialog-api-contract-out.component.less']
})
export class DialogApiContractOutComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() apiContractOutInfo: any;
  customerType: any;
  formApiContractConfig: FormGroup;
  constructor(
    private modal: NzModalRef,
    private formBuilder: FormBuilder, 
  ) 
  {}

  ngOnInit() {
    this.formApiContractConfig = this.formBuilder.group({
      configName: [this.apiContractOutInfo.configName, Validators.required],
      token: [this.apiContractOutInfo.token, Validators.required],
      active: [this.apiContractOutInfo.active],
    });
  }

  dismiss() {
    this.modal.destroy();
  }

  save() {
    for (const i in this.formApiContractConfig.controls) {
      this.formApiContractConfig.controls[i].markAsDirty();
      this.formApiContractConfig.controls[i].updateValueAndValidity();
    }

    if (this.formApiContractConfig.invalid) {
      return;
    }

    this.modal.destroy(this.getData());
  }

  ngAfterViewInit() {}

  ngOnDestroy() { }

  getData() {
    const formValue = {
        ...this.formApiContractConfig.getRawValue(),         
    };
    
    return formValue;
  }
}
