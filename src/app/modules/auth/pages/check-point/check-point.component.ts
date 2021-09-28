import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-check-point",
  templateUrl: "./check-point.component.html",
  styleUrls: ["./check-point.component.less"],
})
export class CheckPointComponent implements OnInit, OnDestroy {
  checkPointForm: FormGroup;
  errors: any[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.checkPointForm = this.formBuilder.group({
      opt: ["", [Validators.required]],
    });
  }

  handleSubmit() {}

  ngOnDestroy() {}
}
