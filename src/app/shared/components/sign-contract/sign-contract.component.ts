import { Input, Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HubService } from '@app/core/services';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { REGEX, SIGN_TYPE } from "@app/shared/constant";
import { NzModalService } from 'ng-zorro-antd/modal';
import { schemaSign, HumCommand } from '@app/shared/constant';
import { eventEmitter } from '@app/shared/utils/event-emitter';
@Component({
  selector: "app-sign-contract",
  templateUrl: "./sign-contract.component.html",
  styleUrls: ["./sign-contract.component.less"],
})
export class SignContractComponent implements OnInit, OnDestroy {
  @Input() employeesSign: any;
  @Input() currentUser: any;
  typeSign: any = 1;
  signTypeForm: FormGroup;
  private hubProxy: any;
  showError: boolean = false;
  isSpinning: boolean = false;
  showCerfitication: boolean = false;
  cerficationInfo: any;
  sinTypes = SIGN_TYPE;
  private handlers;
  constructor(
    private modal: NzModalRef,
    private formBuilder: FormBuilder,
    private hubService: HubService,
    private modalService: NzModalService,
  ) {}

  ngOnInit() {
    this.hubService.connectHub(this.showCerfication.bind(this));
    this.typeSign = this.employeesSign.singType;
    this.signTypeForm = this.formBuilder.group({
      email: [this.employeesSign.email],
      uploadType: [{ value: 'usbToken', disabled: true}],
      mobile: [this.employeesSign.phoneNumber],
      typeSign: [{ value: this.employeesSign.singType, disabled: (this.employeesSign.singType)} ,[Validators.required]],
      // typeSign: [this.employeesSign.singType],
    });
    this.handlers = [
      eventEmitter.on("saveData:error", () => {
         this.isSpinning = false;
      })
    ];
    this.setValidControl(this.employeesSign.singType);
  }

  ngOnDestroy() {}

  changeTypeSign(type) {
    this.typeSign = type;
    this.setValidControl(this.typeSign);
  }

  dismiss() {
    this.modal.destroy();
  }

  viewCerfication() {
    this.isSpinning = true;
    this.hubProxy = this.hubService.getHubProxy();
    if (this.hubProxy == null || this.hubProxy.connection.state !== 1) {
      this.showError = true;
      this.startAppSign();
    } else {
      this.getCerfiticationHub();
    }
  }

  showCerfication(data) {
    if(!data) {
      return;
    }
    switch(data.command) {
      case HumCommand.toekInfo: //Get cerfication
         this.detailCerInfo(data);       
        break;
      case HumCommand.signDocument: //Sign document
        this.resultSign(data);
        break;
      default:
    }
  }

 private detailCerInfo(data) {
    this.showCerfitication = true;
    this.cerficationInfo = data.subject;
    this.isSpinning = false;
  }

  private resultSign(data) {
    this.isSpinning = false;
    if(!data.status) {
      return;
    }

    this.modalService.success({
      nzTitle: 'Ký số hợp đồng thành công'
    });
    eventEmitter.emit("loadDocument:sign");
    this.modal.destroy();
  }

  private save() {
    for (const i in this.signTypeForm.controls) {
      this.signTypeForm.controls[i].markAsDirty();
      this.signTypeForm.controls[i].updateValueAndValidity();
    }
    if (this.signTypeForm.invalid) {
      return;
    }
    switch(this.typeSign) {
      case 1: //Ký SIM
        this.signSIM();
        break;
      case 2: // Ký bằng token
        this.signDocumentWithUsbToken();
        break;
      case 3: // HSM
        this.signHSM();
        break;
      case 4: // Remote signing
        this.signOtpSMS();
        break;
      case 5: // OTP SMS
        this.signOtpSMS();
        break;
      case 6: // OTP Email
        this.signEmail();
        break;
      default:
        this.signDocumentWithUsbToken();
    }
  }

  private signDocumentWithUsbToken() {
    this.hubProxy = this.hubService.getHubProxy();
    if(this.hubProxy == null || this.hubProxy.connection.state !== 1) {
      this.showError = true;
      this.signDocumentShemaUrl();
    } else {
      this.singDocumentHub();
    }
  }

  private signDocumentShemaUrl() {
    let shemaSign = window['schemaSign'] || schemaSign;
    shemaSign = shemaSign.replace('token', this.currentUser.token);
    const link = document.createElement('a');
    link.href = shemaSign.replace('contractId', this.employeesSign.documentSignId);
    link.click();
  }

  private singDocumentHub() {
    this.isSpinning = true;
    const argum = `${ this.currentUser.token },${ this.employeesSign.documentSignId },${ HumCommand.signDocument },${ HumCommand.rootAPI }`;
    this.hubProxy.invoke("processMessage", argum).done(() => {
    }).fail((error) => {
      this.showError = true;
      this.isSpinning = false;
    });;
  }
  
  private startAppSign() {
    let shemaSign = window['schemaSign'] || schemaSign;
    shemaSign = shemaSign.replace('token', this.currentUser.token);
    const link = document.createElement('a');
    link.href = shemaSign.replace('contractId', '');
    link.click();
    this.isSpinning = false;
  }

  private getCerfiticationHub() {   
    const argum = `${ this.currentUser.token },0,${ HumCommand.toekInfo },${ HumCommand.rootAPI }`;
    this.hubProxy.invoke("processMessage", argum).done(() => {
    }).fail((error) => {
      this.showError = true;
      this.isSpinning = false;
    });
  }

  private signOtpSMS() {
    const data = this.buildObjectSign(this.getMobile)
    eventEmitter.emit("authentication:signSMS", data);
    this.modal.destroy();
  }

  private signSIM() {
    const data = this.buildObjectSign(this.getMobile)
    eventEmitter.emit("authentication:signSIM", data);
    this.modal.destroy();
  }

  private signHSM() {
    const data = this.buildObjectSign(this.getMobile)
    eventEmitter.emit("authentication:signHSM", data);
    this.modal.destroy();
  }

  private signEmail() {
    const data = this.buildObjectSign(this.getEmail);  
    eventEmitter.emit("authentication:signEmail", data);
    this.modal.destroy();
  }

  buildObjectSign(device) {
    return {
      device: device,
      persionActionEmail:this.employeesSign.email,
      signType: this.typeSign,
      employeeId: this.currentUser.id,
      employeeSignId: this.employeesSign.id,
      documentId: this.employeesSign.documentSignId,
      employeeName: this.employeesSign.groupName,
    }
  }

  get getMobile() {
    return this.signTypeForm.get('mobile').value;
  }

  get getEmail() {
    return this.signTypeForm.get('email').value;
  }


  private setValidControl(typeSign) 
  {

    switch(this.typeSign) {
      case 1: //Ký SIM
        this.signTypeForm.get('mobile').setValidators([Validators.required, Validators.pattern(REGEX.PHONE_NUMBER)]);
        this.signTypeForm.get('email').clearValidators();
        break;
      case 2: // Ký bằng token
        this.signTypeForm.get('email').clearValidators();
        this.signTypeForm.get('mobile').clearValidators();
        break;
      case 3: // HSM
        this.signTypeForm.get('email').clearValidators();
        this.signTypeForm.get('mobile').clearValidators();
        break;
      case 4: // HSM
        this.signTypeForm.get('email').clearValidators();
        this.signTypeForm.get('mobile').clearValidators();
        break;
      case 5: // OTP SMS
        this.signTypeForm.get('mobile').setValidators([Validators.required, Validators.pattern(REGEX.PHONE_NUMBER)]);
        this.signTypeForm.get('email').clearValidators();
        break;
      case 6: // OTP Email
        this.signTypeForm.get('email').setValidators([Validators.required, Validators.pattern(REGEX.EMAIL)]);
        this.signTypeForm.get('mobile').clearValidators();
        break;
      default:
        this.signTypeForm.get('mobile').setValidators([Validators.required, Validators.pattern(REGEX.PHONE_NUMBER)]);
        this.signTypeForm.get('email').clearValidators();
    }
  }

}
