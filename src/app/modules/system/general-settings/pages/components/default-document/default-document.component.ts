import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  SystemConfigService,
  AuthenticationService,
} from '@app/core/services';

@Component({
  selector: "app-general-settings-default-document",
  templateUrl: "./default-document.component.html",
  styleUrls: ["./default-document.component.less"],
})
export class DefaultDocumentComponent implements OnInit {
  configSendEmailForm: FormGroup;
  systemConfig: any;
  constructor(
    private formBuilder: FormBuilder,
    private systemConfigService: SystemConfigService,
    private authenticationService: AuthenticationService,
    private modalService: NzModalService
  ) {
  }

  ngOnInit() {
    this.loadForm();
  }

  private loadForm() {
    this.systemConfig = this.authenticationService.currentCredentials.systemConfig;
    this.configSendEmailForm = this.formBuilder.group({
      enableSendEmailConfrim: [(this.systemConfig.timeAutoSendEmail)],
      timeAutoSendEmail: [this.systemConfig.timeAutoSendEmail],
      enableTimeDocumentExpire: [(this.systemConfig.timeDocumentExpire)],
      timeDocumentExpire: [this.systemConfig.timeDocumentExpire],
    });
  }

  save() {
    const data = this.getFormData();
    this.systemConfigService.ConfigSendEmail(data).subscribe((res) => {
      this.updateLocalStoraged(data);
      this.modalService.success({
        nzTitle: 'Lưu dữ liệu thành công'
      });
    }); 
  }

  private updateLocalStoraged(systemConfig) {
      this.systemConfig.timeAutoSendEmail = systemConfig.timeAutoSendEmail;
      this.systemConfig.timeDocumentExpire = systemConfig.timeDocumentExpire;
      this.authenticationService.updateSystemConfigInStorage(this.systemConfig);
  }

  private getFormData() {
     
    const formData = {
      ...this.configSendEmailForm.getRawValue(),
    }
    return formData;
  }
}
