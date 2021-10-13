import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { RECONCILIATION_LIST_DATA } from "../../data/reconciliation-list-table";

@Component({
  selector: "app-reconciliation",
  templateUrl: "./reconciliation.component.html",
  styleUrls: ["./reconciliation.component.less"],
})
export class ReconciliationComponent implements OnInit {
  reports = RECONCILIATION_LIST_DATA;
  formSearch: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formSearch = this.formBuilder.group({
      dateFrom: [""],
      dateTo: [""],
      transactionType:[""]
    });
  }
}
