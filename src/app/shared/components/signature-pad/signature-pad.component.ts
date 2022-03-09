import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, Input, AfterViewChecked } from "@angular/core";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import 'jqueryui';
import { SignOfUserService, AuthenticationService } from "@app/core/services";
import { Credential } from '@app/core/models';
import { SignaturePad } from "angular2-signaturepad";
import { EXTENSIONFILEPAD, GetExtensionImageBase64 } from '@app/shared/constant';

@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['signature-pad.component.less']
})
export class SignaturePadComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  @Input() signPadOfUse: any;
  isDraw: boolean = true;
  draw: number = 1;
  upload: number = 2;
  dataSign: any;
  isSign: boolean = false;
  imageUpload: any;
  private signaturePadOptions: any = {
    minWidth: 0.5,
    maxWidth: 2.5,
    canvasWidth: 700,
    canvasHeight: 300
  };
  currentUser: Credential;
  constructor(private modal: NzModalRef,
    private modalService: NzModalService,
    private signOfUserService: SignOfUserService,
    private authService: AuthenticationService,) { }

  ngOnInit() {
    this.currentUser = this.authService.currentCredentials;
    this.isDraw = this.signPadOfUse.isDraw;
    this.isSign = this.signPadOfUse.isSign;
     
    if (!this.isDraw) {
      this.imageUpload = this.getSourceForSign();
    }
  }

  ngAfterViewInit() {
     
    if (this.isDraw) {
      this.signaturePad.fromDataURL(this.getSourceForSign());
    }
  }

  getSourceForSign() {
    if (!this.signPadOfUse || !this.signPadOfUse.data) {
      this.signaturePadClear();
      return;
    }

    const extension = this.getExtension(this.signPadOfUse.data);
    const sourceImage = extension + this.signPadOfUse.data;
    return sourceImage;
  }

  ngOnDestroy() { }
  destroyModal(): void {
    this.modal.destroy({ data: 'this the result data' });
  }

  tabClick(val) {
    this.isDraw = val === this.draw;
  }

  signImageChange(e) {
    let that = this;
    let files = e.target["files"];
    if (files && files[0]) {
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      }).then(data => {
        that.imageUpload = data;
      });
    }
  }

  signatureSave() {
    if (!this.signaturePad && !this.imageUpload) {
      this.modalService.warning({
        nzTitle: 'Vui lòng tạo tạo chữ ký trước khi lưu',
      });
      return;
    }

    if (this.signPadOfUse.id) {
      this.updateSignPad();
    } else {
      this.createSignPad();
    }
  }

  private createSignPad() {
    const signPadOfUse = this.getData();
    this.signOfUserService.create(signPadOfUse).subscribe((result) => {
      this.saveSignPadToLocationStore(result.data);
      this.showDialogSuccess(this);
    });
  }
  private updateSignPad() {
    const signPadOfUse = this.getData();
    this.signOfUserService.update(this.signPadOfUse.id, signPadOfUse).subscribe((result) => {
      this.saveSignPadToLocationStore(result.data);
      this.showDialogSuccess(this);
    });
  }

  private getData() {
    let baseEnCode = "";
    if (!this.isDraw) {
      baseEnCode = this.encodeddBase64(this.imageUpload);
    } else {
      baseEnCode = this.encodeddBase64(this.signaturePad.toDataURL());
    }
    const signPadOfUse = {
      data: baseEnCode,
      extension: EXTENSIONFILEPAD.PNG,
      isDraw: this.isDraw,
      useDefault: this.signPadOfUse.useDefault,
    };
    
    if(this.signPadOfUse.isSign) {
      signPadOfUse.useDefault = this.signPadOfUse.isSign;
    }
    return signPadOfUse;
  }

  saveSignPadToLocationStore(base64) {
    const currentUser = this.currentUser;
    currentUser.signatureImage = base64;
    this.authService.storeCredentials(currentUser);
  }

  private encodeddBase64(base64) {
    let encoded = base64.toString().replace(/^data:(.*,)?/, '');
    if ((encoded.length % 4) > 0) {
      encoded += '='.repeat(4 - (encoded.length % 4));
    }
    return encoded;
  }

  signaturePadClear() {
    if(this.signaturePad) {
      this.signaturePad.clear();
    }
  }

  private showDialogSuccess(currentDialog) {
    let contenMessgae = 'Đã lưu chữ ký của bạn thành công';
    if (this.isSign) {
      contenMessgae = 'Áp dụng chứ ký thành công';
    }

    this.modalService.success({
      nzTitle: 'Chữ ký của bạn',
      nzContent: contenMessgae,
      nzOnOk: () => { currentDialog.modal.destroy({result: true}); }
    });
  }

  private getExtension(base64) {
    const chatFirst = base64.charAt(0);
    const extension = GetExtensionImageBase64(chatFirst);
    return extension;
  }

}
