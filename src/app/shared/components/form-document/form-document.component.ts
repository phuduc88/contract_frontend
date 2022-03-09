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
  @Input() documentTypeInfo: any;
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
      documentName: [this.documentTypeInfo.documentName,[Validators.required] ],
      description: [this.documentTypeInfo.description],
      isDefault: [this.documentTypeInfo.isDefault],
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
    if(!this.documentTypeInfo.id) {
      this.createDocumentType(data);
    } else {
      this.updateDocumentType(this.documentTypeInfo.id, data);
    }
  }

  delete()
  {
    this.modalService.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa?',
      nzOkText: 'Xóa',
      nzCancelText: 'Không',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.documentTypeService.delete(this.documentTypeInfo.id).subscribe((res) => {
          this.documentTypeInfo.action = 3;
          this.modal.destroy(this.documentTypeInfo);
        });
      }
    });
  }

  private createDocumentType(data) {
    this.documentTypeService.create(data).subscribe((res) => {
      res.action = 1;
      this.modal.destroy(res);
    });
  }

  private updateDocumentType(id, data) {
    this.documentTypeService.update(id, data).subscribe((res) => {
      res.action = 2;
      this.modal.destroy(res);
    });
  }


  ngAfterViewInit() {
  }

  ngOnDestroy() { }
}
