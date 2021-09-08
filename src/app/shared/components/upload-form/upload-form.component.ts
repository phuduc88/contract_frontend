import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Subject } from 'rxjs';
import { NzModalRef } from 'ng-zorro-antd/modal';
import * as moment from 'moment';
import * as _ from 'lodash';
import { DropdownItem } from '@app/core/interfaces'; 
import { PAGE_SIZE, STATUS, ACTION, ROLE } from '@app/shared/constant';

import { download } from '@app/shared/utils/download-file';
import { DATE_FORMAT, MIME_TYPE } from '@app/shared/constant';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class UploadFormComponent implements OnInit {
  @Input() uploadData: any;
  accountForm: FormGroup;
  content: string = '';
  isDownloading : boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private modal: NzModalRef,
  ) {}

  ngOnInit() {
    this.accountForm = this.formBuilder.group({
      fileName: [''],
      file: [''],
      templateType: [''],
    });
  }

  save(): void {
    for (const i in this.accountForm.controls) {
      this.accountForm.controls[i].markAsDirty();
      this.accountForm.controls[i].updateValueAndValidity();
    }

    if (this.accountForm.invalid) {
      return;
    }

  }

  handleFileSelected(data) {
    this.accountForm.patchValue({
      fileName: data.metadata.name,
      file: data.file
    });
  }

  dismiss(): void {
    this.modal.destroy();
  }

  uploadFile() {
    this.isDownloading = true;
    const fileUpload = this.getData();
  }

  downloadFileTemplate() {
    
  }

  getData() {
    
    const formData = {
      ...this.accountForm.value,
      declarationCode: this.uploadData.declarationCode
    };

    return formData;
  }

  getMimeType(subfixFile: string) {
    const mimeType = _.find(MIME_TYPE, {
        key: subfixFile,
    });
    if (mimeType) {
      return mimeType.value;
    }
    return MIME_TYPE[0].value
  }
}
