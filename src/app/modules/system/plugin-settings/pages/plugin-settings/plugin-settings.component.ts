import { Component, OnInit } from '@angular/core';
import { AuthenticationService,  PublishAPIService, PluginEmailService,
PluginHSMService, PluginSMSService } from '@app/core/services';
import { Credential, Plugin } from '@app/core/models';
import { NzModalService } from 'ng-zorro-antd/modal';

import { 
   DialogEmailConfigComponent, 
   DialogHSMConfigComponent,
   DialogSMSConfigComponent, 
   DialogApiContractOutComponent 
} from '@app/shared/components';

@Component({
  selector: 'app-plugin-settings',
  templateUrl: './plugin-settings.component.html',
  styleUrls: ['./plugin-settings.component.less']
})
export class PluginSettingComponent implements OnInit {
  currentUser: any;
  pluginSMS: Plugin;
  pluginHSM: Plugin;
  pluginEmail: Plugin;
  publishAPI: Plugin;
  emailServiceName: any;
  emailStatus: any;
  emailProvider: any;
  smsProvider: any;
  smsSeviceName: any;
  smsStatus: any;
  hsmProvider: any;
  hsmSeviceName: any;
  hsmStatus: any;
  apiConfigName: any;
  apiToken: any;
  apiStatus: any;


  constructor(private authService: AuthenticationService,
    private modalService: NzModalService,
    private publishAPIService: PublishAPIService,
    private pluginHSMService: PluginHSMService,
    private pluginEmailService: PluginEmailService,
    private pluginSMSService: PluginSMSService,
  ) {
  }

  ngOnInit() {
    this.loadPluginSMS();
    this.loadPluginEmail();
    this.loadPluginHSM();
    this.loadPublishAPI();
  }

  configAPIContract() {
    this.dialogAPIContractConfig(this.publishAPI);
  }
  configEmail() {
    this.dialogEmailConfig(this.pluginEmail);
  }

  configHSM() {
    this.dialogHSMConfig(this.pluginHSM);
  }

  configSMS() {
    this.dialogSMSConfig(this.pluginSMS);
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

    modal.afterClose.subscribe((result) => {
      if (result) { 
        this.savePluginEmail(result);
      }
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

    modal.afterClose.subscribe((result) => {
      if (result) { 
        this.savePluginHSM(result);
      }
    });
  }

  dialogAPIContractConfig(apiContractOutInfo) {
    
    const modal = this.modalService.create({
      nzClosable: true,
      nzWidth: 650,
      nzTitle: 'Cấu hình kết nối API Econtract',
      nzClassName: "signature-pad-custom",
      nzContent: DialogApiContractOutComponent,
      nzOnOk: () => { },
      nzComponentParams: {
        apiContractOutInfo,
      },
      nzFooter: []
    });

    modal.afterClose.subscribe((result) => {
      if (result) { 
        this.savePublishAPi(result);
      }
    });
  }

  dialogSMSConfig(smsConfigInfo) {
    
    const modal = this.modalService.create({
      nzClosable: true,
      nzWidth: 650,
      nzTitle: 'Cấu hình gửi tin nhắn SMS',
      nzClassName: "signature-pad-custom",
      nzContent: DialogSMSConfigComponent,
      nzOnOk: () => { },
      nzComponentParams: {
        smsConfigInfo,
      },
      nzFooter: []
    });

    modal.afterClose.subscribe((result) => {
      if (result) { 
        this.savePluginSMS(result);
      }
    });
  }

  private loadPluginSMS() {
    this.pluginSMSService.getPluginDefaul().subscribe(res => {
      this.setDataViewSMS(res);
    });
  }

  private loadPluginEmail() {
    this.pluginEmailService.getPluginDefaul().subscribe(res => {      
      this.setDataViewEmail(res);
    });
  }

  private loadPluginHSM() {
    this.pluginHSMService.getPluginDefaul().subscribe(res => {
     this.setDataViewHSM(res);
    });
  }

  private loadPublishAPI() {
    this.publishAPIService.getPluginDefaul().subscribe(res => {
      this.setDataViewAPI(res);
    });
  }

  private savePluginSMS(pluginSMS) {
    if (pluginSMS.id) {
      this.pluginSMSService.update(pluginSMS.id, pluginSMS).subscribe(res => {
        this.pluginSMS = res;
        this.setDataViewSMS(res);
      });
    } else {
      this.pluginSMSService.create(pluginSMS).subscribe(res => {
        this.pluginSMS = res;
        this.setDataViewSMS(res);
      });
    }
  }

  private savePluginHSM(pluginHSM) {
    if (pluginHSM.id) {
      this.pluginHSMService.update(pluginHSM.id, pluginHSM).subscribe(res => {
        this.setDataViewHSM(res);
      });
    } else {
      this.pluginHSMService.create(pluginHSM).subscribe(res => {
        this.setDataViewHSM(res);
      });
    }
  }

  private savePluginEmail(pluginEmail) {
    if (pluginEmail.id) {
      this.pluginEmailService.update(pluginEmail.id, pluginEmail).subscribe(res => {
        this.setDataViewEmail(res);
      });
    } else {
      this.pluginEmailService.create(pluginEmail).subscribe(res => {
        this.setDataViewEmail(res);
      });
    }
  }

  private savePublishAPi(publishAPI) {
    if (publishAPI.id) {
      this.publishAPIService.update(publishAPI.id, publishAPI).subscribe(res => {
        this.setDataViewAPI(res);
      });
    } else {
      this.publishAPIService.create(publishAPI).subscribe(res => {
        this.setDataViewAPI(res);
      });
    }
  }

  private setDataViewSMS(data) {
    this.pluginSMS = data;
    this.smsSeviceName = data.serviceName;
    this.smsProvider = data.provider
    this.smsStatus = data.active;
  }

  private setDataViewHSM(data) {
    this.pluginHSM = data;
    this.hsmProvider = data.provider;
    this.hsmSeviceName = data.serviceName;
    this.hsmStatus = data.active;
  }

  private setDataViewAPI(data) {
    this.publishAPI = data;
    this.apiConfigName = data.configName;
    this.apiToken = data.token;
    this.apiStatus = data.active;
  }

  private setDataViewEmail(data) {
    this.pluginEmail = data;
    this.emailServiceName = data.ipAddress;
    this.emailProvider = data.provider;
    this.emailStatus = data.active;
  }
}
