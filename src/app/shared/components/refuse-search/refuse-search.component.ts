import { Input, Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzModalRef } from 'ng-zorro-antd/modal';
import { REGEX } from "@app/shared/constant";

@Component({
  selector: "app-refuse-search",
  templateUrl: "./refuse-search.component.html",
  styleUrls: ["./refuse-search.component.less"],
})
export class RefuseSearchComponent implements OnInit, OnDestroy {
  formRefuse: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private modal: NzModalRef,) {}

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

    this.modal.destroy(this.formRefuse.getRawValue());
  }

  dismiss(): void {
    this.modal.destroy();
  }
}
