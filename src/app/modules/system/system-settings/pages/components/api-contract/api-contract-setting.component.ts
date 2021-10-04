import { Input, Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-api-contract-setting-form',
  templateUrl: './api-contract-setting.component.html',
  styleUrls: ['./api-contract-setting.component.less']
})
export class ApiContractSettingFormComponent implements OnInit, OnDestroy {
  @Input() hsmSettingId: string;
  formApiContractSetting: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.loadForm();
  }

  ngOnDestroy() {

  }

  private loadForm() {
    this.formApiContractSetting = this.formBuilder.group({
      supplier: ["", Validators.required],
      service: ["", Validators.required],
      parameterConnect: [""],
      active: [""],
    });

  }

  private save() {
    for (const i in this.formApiContractSetting.controls) {
      this.formApiContractSetting.controls[i].markAsDirty();
      this.formApiContractSetting.controls[i].updateValueAndValidity();
    }

    if (this.formApiContractSetting.invalid) {
      return;
    }
  }


}

