import { Input, Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { REGEX } from "@app/shared/constant";

@Component({
  selector: "app-refuse-search",
  templateUrl: "./refuse-search.component.html",
  styleUrls: ["./refuse-search.component.less"],
})
export class RefuseSearchComponent implements OnInit, OnDestroy {
  formRefuse: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loadForm();
  }

  ngOnDestroy() {}

  private loadForm() {
    this.formRefuse = this.formBuilder.group({
      reason: ["", Validators.required],
    });
  }

  save() {
    for (const i in this.formRefuse.controls) {
      this.formRefuse.controls[i].markAsDirty();
      this.formRefuse.controls[i].updateValueAndValidity();
    }

    if (this.formRefuse.invalid) {
      return;
    }
  }
}
