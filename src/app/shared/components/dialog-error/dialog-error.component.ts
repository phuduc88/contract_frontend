import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, Input, AfterViewChecked } from "@angular/core";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import 'jqueryui';
import { SignOfUserService, AuthenticationService } from "@app/core/services";
import { Credential } from '@app/core/models';
import { SignaturePad } from "angular2-signaturepad";
import { EXTENSIONFILEPAD, GetExtensionImageBase64 } from '@app/shared/constant';

@Component({
  selector: 'app-dialog-error',
  templateUrl: './dialog-error.component.html',
  styleUrls: ['dialog-error.component.less']
})
export class DialogErrorComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() errorsData: any;
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
