import { Component, OnInit, OnDestroy } from "@angular/core";
import { CUSTOMER_LIST_DATA } from "@app/modules/customers/data/customer-table";

@Component({
  selector: "app-customers-list",
  templateUrl: "./customers-list.component.html",
  styleUrls: ["./customers-list.component.less"],
})
export class CustomersListS2Component implements OnInit, OnDestroy {
  selectedPage: any = 1;
  customers: any[] = CUSTOMER_LIST_DATA;
  constructor() {}
  ngOnInit() {}

  ngOnDestroy() {}
}
