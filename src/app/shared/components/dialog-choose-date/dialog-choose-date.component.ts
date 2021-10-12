import { AfterViewInit, Component, Input, Output, EventEmitter, OnDestroy, OnInit, ViewContainerRef, OnChanges } from "@angular/core";
import * as $ from 'jquery';
import { NzModalRef } from "ng-zorro-antd/modal";
import 'jqueryui';
import { eventEmitter } from '@app/shared/utils/event-emitter';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DATE_FORMAT, REGEX } from '@app/shared/constant';
import * as moment from 'moment';
@Component({
  selector: 'app-dialog-choose-date',
  templateUrl: './dialog-choose-date.component.html',
  styleUrls: ['dialog-choose-date.component.less']
})
export class DialogChooseDateComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() smsConfigInfo: any;
  formSMSConfig: FormGroup;
  constructor(
    private modal: NzModalRef,
    private formBuilder: FormBuilder, 
  ) 
  {}

  ngOnInit() {
     
    this.formSMSConfig = this.formBuilder.group({
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required],
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
    const dateFrom = moment(formValue.dateFrom).format("DD/MM/YYYY");
    const dateTo = moment(formValue.dateTo).format("DD/MM/YYYY");
    return {
      dateFrom,
      dateTo
    };
  }
}
