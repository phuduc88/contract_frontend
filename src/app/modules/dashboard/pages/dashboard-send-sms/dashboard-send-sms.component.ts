import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
@Component({
  selector: "app-dashboard-send-sms",
  templateUrl: "./dashboard-send-sms.component.html",
  styleUrls: ["./dashboard-send-sms.component.less"],
})
export class DashboardSendSmsComponent implements OnInit, OnDestroy {
  options = {
    results: [
      {
        name: "Hợp đồng",
        series: [
          {
            name: new Date("2018-01-01T00:00:00"),
            value: "100",
          },
          {
            name: new Date("2018-02-01T00:00:00"),
            value: "200",
          },
          {
            name: new Date("2018-03-01T00:00:00"),
            value: "150",
          },
          {
            name: new Date("2018-04-01T00:00:00"),
            value: "50",
          },
          {
            name: new Date("2018-05-01T00:00:00"),
            value: "100",
          },
        ],
      },
      {
        name: "Tin nhắn",
        secondAxis: true,
        series: [
          {
            name: new Date("2018-01-01T00:00:00"),
            value: "5",
          },
          {
            name: new Date("2018-02-01T00:00:00"),
            value: "4",
          },
          {
            name: new Date("2018-03-01T00:00:00"),
            value: "1",
          },
          {
            name: new Date("2018-04-01T00:00:00"),
            value: "3",
          },
          {
            name: new Date("2018-05-01T00:00:00"),
            value: "2",
          },
        ],
      },
    ],
  };

  formSearch: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formSearch = this.formBuilder.group({
      dateFrom: [""],
      dateTo: [""],
    });
  }

  ngOnDestroy() {}
}
