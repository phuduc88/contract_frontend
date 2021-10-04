import { AfterViewInit, Component, Input, Output, EventEmitter, OnDestroy, OnInit, ViewContainerRef, OnChanges } from "@angular/core";
import * as $ from 'jquery';
import { NzModalRef } from "ng-zorro-antd/modal";
import 'jqueryui';
import { eventEmitter } from '@app/shared/utils/event-emitter';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: 'app-dialog-thread-sign-template',
  templateUrl: './dialog-thread-sign-template.component.html',
  styleUrls: ['dialog-thread-sign-template.component.less']
})
export class DialogThreadSingTemplateComponent implements OnInit, OnDestroy, AfterViewInit {
  form: FormGroup;
  constructor(
    private modal: NzModalRef,
    private formBuilder: FormBuilder, 
  ) 
  {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['',[Validators.required]],
    });
  }

  dismiss() {
    this.modal.destroy();
  }

  save() {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }

    if (this.form.invalid) {
      return;
    }

    this.modal.destroy(this.form.getRawValue());
  }

  ngAfterViewInit() {}

  ngOnDestroy() { }
}
