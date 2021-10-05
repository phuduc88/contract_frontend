import { Input, Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-sms-form-system-settings",
  templateUrl: "./sms-form.component.html",
  styleUrls: ["./sms-form.component.less"],
})
export class SmsSettingFormComponent implements OnInit, OnDestroy {
  @Input() hsmSettingId: string;
  formSmsSetting: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loadForm();
  }

  ngOnDestroy() {}

  private loadForm() {
    this.formSmsSetting = this.formBuilder.group({
      name: ["", Validators.required],
      value: ["", Validators.required],
      active: [""],
    });
  }

  private save() {
    for (const i in this.formSmsSetting.controls) {
      this.formSmsSetting.controls[i].markAsDirty();
      this.formSmsSetting.controls[i].updateValueAndValidity();
    }

    if (this.formSmsSetting.invalid) {
      return;
    }
  }
}
