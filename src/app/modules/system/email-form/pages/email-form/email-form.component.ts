import { Input, Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-email-form-system-settings",
  templateUrl: "./email-form.component.html",
  styleUrls: ["./email-form.component.less"],
})
export class EmailFormComponent implements OnInit, OnDestroy {
  @Input() hsmSettingId: string;
  formEmailSetting: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loadForm();
  }

  ngOnDestroy() {}

  private loadForm() {
    this.formEmailSetting = this.formBuilder.group({
      name: ["", Validators.required],
      value: ["", Validators.required],
      active: [""],
    });
  }

  private save() {
    for (const i in this.formEmailSetting.controls) {
      this.formEmailSetting.controls[i].markAsDirty();
      this.formEmailSetting.controls[i].updateValueAndValidity();
    }

    if (this.formEmailSetting.invalid) {
      return;
    }
  }
}
