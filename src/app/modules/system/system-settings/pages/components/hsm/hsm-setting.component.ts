import { Input, Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { REGEX } from "@app/shared/constant";

@Component({
  selector: "app-hsm-setting-form",
  templateUrl: "./hsm-setting.component.html",
  styleUrls: ["./hsm-setting.component.less"],
})
export class HsmSettingFormComponent implements OnInit, OnDestroy {
  formHsmSetting: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loadForm();
  }

  ngOnDestroy() {}

  private loadForm() {
    this.formHsmSetting = this.formBuilder.group({
      supplier: ["", Validators.required],
      service: ["", Validators.required],
      parameterConnect: [""],
      active: [""],
    });
  }

  private save() {
    for (const i in this.formHsmSetting.controls) {
      this.formHsmSetting.controls[i].markAsDirty();
      this.formHsmSetting.controls[i].updateValueAndValidity();
    }

    if (this.formHsmSetting.invalid) {
      return;
    }
  }
}
