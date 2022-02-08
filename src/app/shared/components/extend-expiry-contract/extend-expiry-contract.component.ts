import { AfterViewInit, Component, Input, Output, EventEmitter, OnDestroy, OnInit, ViewContainerRef, OnChanges } from "@angular/core";
import * as $ from 'jquery';
import { NzModalRef } from "ng-zorro-antd/modal";
import 'jqueryui';
import { eventEmitter } from '@app/shared/utils/event-emitter';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DATE_FORMAT, REGEX } from '@app/shared/constant';
import * as moment from 'moment';
@Component({
  selector: 'app-dialog-extend-expiry-contract',
  templateUrl: './extend-expiry-contract.component.html',
  styleUrls: ['extend-expiry-contract.component.less']
})
export class DialogExtendContractComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() documentSing: any;
  formExtenContract: FormGroup;
  constructor(
    private modal: NzModalRef,
    private formBuilder: FormBuilder, 
  ) 
  {}

  ngOnInit() {
    this.formExtenContract = this.formBuilder.group({
      timeDocumentExpire: [{ value: this.documentSing.timeDocumentExpire, disabled: true} ,[Validators.required]],
      expiryDate: [{ value: this.documentSing.expiryDate, disabled: true} ,[Validators.required]],
      numberDayExtents: ['', Validators.required],
      expiryDateBeforeExtents: [{ value: null, disabled: true} ,[Validators.required]],
    });
  }

  dismiss() {
    this.modal.destroy();
  }

  changeNumberDayExtents(numberDayExtents) {
    if(!numberDayExtents) {
      return;
    }

    const expiryDateBeforeExtents = moment(moment (this.expiryDate). format ("DD/MM/YYYY HH:mm:ss")).add((numberDayExtents), 'd')
    this.formExtenContract.patchValue({
      expiryDateBeforeExtents: expiryDateBeforeExtents.format('DD/MM/YYYY HH:mm:ss'),
    });
  }

  save() {
    this.modal.destroy(this.getData());
  }

  get expiryDate() {
    return this.formExtenContract.get('expiryDate').value;
  }

  ngAfterViewInit() {}

  ngOnDestroy() { }

  getData() {
    const formValue = {
        ...this.formExtenContract.getRawValue(),         
    };
    return formValue;
  }
}
