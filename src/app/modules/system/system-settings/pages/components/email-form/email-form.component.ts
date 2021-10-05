import { Input, Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-email-form-system-settings",
  templateUrl: "./email-form.component.html",
  styleUrls: ["./email-form.component.less"],
})
export class EmailFormComponent implements OnInit, OnDestroy {
  @Input() hsmSettingId: string;
  formHsmSetting: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loadForm();
  }

  ngOnDestroy() {}

  private loadForm() {
    this.formHsmSetting = this.formBuilder.group({
      name: ["", Validators.required],
      value: ["", Validators.required],
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
