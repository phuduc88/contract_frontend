import { OnDestroy, OnInit, Component } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-transactions-list",
  templateUrl: "./transactions-list.component.html",
  styleUrls: ["./transactions-list.component.less"],
})
export class TransactionListComponent implements OnInit, OnDestroy {
  formSearch: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formSearch = this.formBuilder.group({
      cmnd: [""],
      dateFrom: [""],
      dateTo: [""],
      status: [""],
    });
  }

  ngOnDestroy() {}
}
