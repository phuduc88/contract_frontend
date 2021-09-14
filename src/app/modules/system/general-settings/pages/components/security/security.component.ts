import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  SystemConfigService,
  AuthenticationService,
} from '@app/core/services';

@Component({
  selector: "app-general-settings-security",
  templateUrl: "./security.component.html",
  styleUrls: ["./security.component.less"],
})
export class SecurityComponent implements OnInit {
  configLoginForm: FormGroup;
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
    this.configLoginForm = this.formBuilder.group({
      isCheckPoint: [this.systemConfig.isCheckPoint],
    });
  }

  save() {
    const data = this.getFormData();
    this.systemConfigService.ConfigLogin(data).subscribe((res) => {
      this.updateLocalStoraged(data);
      this.modalService.success({
        nzTitle: 'Lưu dữ liệu thành công'
      });
    }); 
  }

  private updateLocalStoraged(systemConfig) {
      this.systemConfig.isCheckPoint = systemConfig.isCheckPoint;
      this.authenticationService.updateSystemConfigInStorage(this.systemConfig);
  }

  private getFormData() {
     
    const formData = {
      ...this.configLoginForm.getRawValue(),
    }
    return formData;
  }
}
