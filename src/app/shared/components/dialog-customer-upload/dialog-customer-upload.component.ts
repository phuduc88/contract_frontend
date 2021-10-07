import { AfterViewInit, Component, Input, Output, EventEmitter, OnDestroy, OnInit, ViewContainerRef, OnChanges } from "@angular/core";
import * as $ from 'jquery';
import { NzModalRef } from "ng-zorro-antd/modal";
import { ClientService } from "@app/core/services";
import { download } from '@app/shared/utils/download-file';
import 'jqueryui';
import { eventEmitter } from '@app/shared/utils/event-emitter';
import { MIME_TYPE } from '@app/shared/constant';
@Component({
  selector: 'app-dialog-customer-upload',
  templateUrl: './dialog-customer-upload.component.html',
  styleUrls: ['dialog-customer-upload.component.less']
})
export class DialogClientUploadComponent implements OnInit, OnDestroy, AfterViewInit {
  files
  constructor(
    private modal: NzModalRef,
    private clientService: ClientService,
  ) 
  {}

  ngOnInit() {
     
  }

  downloadTemplate() {
    this.clientService.downloadExcelTemplate().then(response => {
      const subfixFile = '.xlsx'
      const fileName = `Mẫu file Import.xlsx`;
      const mimeType = this.getMimeType(subfixFile);
      download(fileName, response, mimeType);
    });
  }

  save() {
    this.modal.destroy(this.files);
  }

  handleChange(event) {
    this.files = event.target.files;
  }

  ngAfterViewInit() {}

  ngOnDestroy() { }

  getMimeType(subfixFile: string) {
    const mimeType = MIME_TYPE.find(d => d.key === subfixFile);
    if (mimeType) {
      return mimeType.value;
    }
    return MIME_TYPE[0].value
  }
}
