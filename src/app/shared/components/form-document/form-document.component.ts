import { AfterViewInit, Component, Input, Output, EventEmitter, OnDestroy, OnInit, ViewContainerRef, OnChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { NzModalService } from "ng-zorro-antd/modal";
import 'jqueryui';
import { eventEmitter } from '@app/shared/utils/event-emitter';
import { DocumentTypeService } from '@app/core/services';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-form-document',
  templateUrl: './form-document.component.html',
  styleUrls: ['./form-document.component.less']
})
export class FormDocumentComponent implements OnInit, OnDestroy, AfterViewInit {
  documetForm: FormGroup;
  constructor(
    private modal: NzModalRef,
    private modalService: NzModalService,
    private documentTypeService: DocumentTypeService,
    private formBuilder: FormBuilder,
  ) 
  {}

  ngOnInit() {
    this.documetForm = this.formBuilder.group({
      documentName: ['',[Validators.required] ],
      description: [''],
      isDefault: [false],
    });
  }

  dismiss(): void {
    this.modal.destroy();
  }

  save(): void {
    for (const i in this.documetForm.controls) {
      this.documetForm.controls[i].markAsDirty();
      this.documetForm.controls[i].updateValueAndValidity();
    }

    if (this.documetForm.invalid) {
      return;
    }

    const data = this.documetForm.getRawValue();
    this.documentTypeService.create(data).subscribe((res) => {
      this.modal.destroy(res);
    });
  }



  ngAfterViewInit() {
  }

  ngOnDestroy() { }
}
