import { Component, OnInit } from "@angular/core";
import { FormGroup } from '@angular/forms';

@Component({
  selector: "app-general-settings-signing-stream-form",
  templateUrl: "./signing-stream-form.component.html",
  styleUrls: ["./signing-stream-form.component.less"],
})
export class SigningStreamFormComponent implements OnInit {
  form: FormGroup;
  ngOnInit() {}
}
