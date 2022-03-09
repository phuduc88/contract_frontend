import { AfterViewInit, Component, Input, Output, EventEmitter, OnDestroy, OnInit, ViewContainerRef, OnChanges } from "@angular/core";
import * as $ from 'jquery';
import { NzModalRef } from "ng-zorro-antd/modal";
import 'jqueryui';
import { eventEmitter } from '@app/shared/utils/event-emitter';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DATE_FORMAT, REGEX } from '@app/shared/constant';
import { AuthenticationService } from '@app/core/services';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dialog-change-file-name',
  templateUrl: './dialog-change-file-name.component.html',
  styleUrls: ['dialog-change-file-name.component.less']
})
export class DialogChangeFileNameComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() fileInfo: any = {};
  formChangeFileName: FormGroup;
  constructor(
    private modal: NzModalRef,
    private router: Router,
    private modalService: NzModalService,
    private formBuilder: FormBuilder, 
    private authService: AuthenticationService
  ) 
  {}

  ngOnInit() {
    this.formChangeFileName = this.formBuilder.group({      
      fileName: [this.fileInfo.fileName, Validators.required],
    });
  }

  dismiss() {
    this.modal.destroy();
  }

  save() {
    for (const i in this.formChangeFileName.controls) {
      this.formChangeFileName.controls[i].markAsDirty();
      this.formChangeFileName.controls[i].updateValueAndValidity();
    }

    if (this.formChangeFileName.invalid) {
      return;
    }
    const data = this.getData();
    this.modal.destroy(data);
  }

  ngAfterViewInit() {}

  ngOnDestroy() { }

  getData() {
    const formValue = {
        ...this.fileInfo,
        ...this.formChangeFileName.getRawValue(),  
    };
    return formValue;
  }
}
