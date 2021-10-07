import { Component, OnInit } from '@angular/core';
import { AuthenticationService,  SignOfUserService } from '@app/core/services';
import { Credential } from '@app/core/models';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DialogEmailConfigComponent, DialogHSMConfigComponent, DialogSMSConfigComponent } from '@app/shared/components';

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.less']
})
export class AppSettingComponent implements OnInit {
   
  constructor(private authService: AuthenticationService,
    private modalService: NzModalService,
    private signOfUserService: SignOfUserService,
  ) {
  }

  ngOnInit() {
    
  }

  configAPIContract() {

  }
  configEmail() {
    this.dialogEmailConfig({});
  }

  configHSM() {
    this.dialogHSMConfig({});
  }

  configSMS() {

  }
  dialogEmailConfig(emailConfig) {
    
    const modal = this.modalService.create({
      nzClosable: true,
      nzWidth: 650,
      nzTitle: 'Cấu hình gửi email',
      nzClassName: "signature-pad-custom",
      nzContent: DialogEmailConfigComponent,
      nzOnOk: () => { },
      nzComponentParams: {
        emailConfig,
      },
      nzFooter: []
    });

    modal.afterClose.subscribe(() => {
       
    });
  }

  dialogHSMConfig(hsmConfig) {
    
    const modal = this.modalService.create({
      nzClosable: true,
      nzWidth: 650,
      nzTitle: 'Cấu hình kết nối HSM',
      nzClassName: "signature-pad-custom",
      nzContent: DialogHSMConfigComponent,
      nzOnOk: () => { },
      nzComponentParams: {
        hsmConfig,
      },
      nzFooter: []
    });

    modal.afterClose.subscribe(() => {
       
    });
  }
}
