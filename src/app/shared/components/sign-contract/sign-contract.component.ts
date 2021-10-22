import { Input, Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { REGEX } from "@app/shared/constant";

@Component({
  selector: "app-sign-contract",
  templateUrl: "./sign-contract.component.html",
  styleUrls: ["./sign-contract.component.less"],
})
export class SignContractComponent implements OnInit, OnDestroy {
  typeValue: any = "A";

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {}

  private save() {}
}
