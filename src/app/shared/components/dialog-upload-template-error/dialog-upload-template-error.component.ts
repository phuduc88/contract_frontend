import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, Input, AfterViewChecked } from "@angular/core";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import 'jqueryui';
import { Credential } from '@app/core/models';
import { SignaturePad } from "angular2-signaturepad";
import { EXTENSIONFILEPAD, GetExtensionImageBase64 } from '@app/shared/constant';

@Component({
  selector: 'dialog-upload-template-error',
  templateUrl: './dialog-upload-template-error.component.html',
  styleUrls: ['dialog-upload-template-error.component.less']
})
export class DialogUploadTemplateErrorComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() errors: any;
  constructor(
    private modal: NzModalRef,
  ) 
  { }

  ngOnInit() {
     
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() { }
   
}
