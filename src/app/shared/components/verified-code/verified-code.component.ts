import { AfterViewInit, Component, Input, Output, EventEmitter, OnDestroy, OnInit, ViewContainerRef, OnChanges } from "@angular/core";
import * as $ from 'jquery';
import { NzModalRef } from "ng-zorro-antd/modal";
import 'jqueryui';
import { eventEmitter } from '@app/shared/utils/event-emitter';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DATE_FORMAT, REGEX } from '@app/shared/constant';
import { SignFlowService } from "@app/core/services";
import * as moment from 'moment';
@Component({
  selector: 'app-dialog-verified-code',
  templateUrl: './verified-code.component.html',
  styleUrls: ['verified-code.component.less']
})
export class VerifiedCodeComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() verified: any;
  formVerifiedCode: FormGroup;
  constructor(
    private modal: NzModalRef,
    private formBuilder: FormBuilder, 
    private signFlowService: SignFlowService,
  ) 
  {}

  ngOnInit() {
    this.formVerifiedCode = this.formBuilder.group({
      code: ['', Validators.required],
    });
  }

  dismiss() {
    this.modal.destroy();
  }

  save() {
    this.sendVerifiedCode();
  }

  sendVerifiedCode() {
    const data = this.getData();
    this.signFlowService.signDocumentVerifiedCode(data.code).subscribe((result) => {
      const data = {status: true};
      this.modal.destroy(data);
    });
  }

  ngAfterViewInit() {}

  ngOnDestroy() { }

  getData() {
    const formValue = {
        ...this.formVerifiedCode.getRawValue(),         
    };
    return formValue;
  }
}
