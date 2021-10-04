import { Component, OnInit, OnDestroy, Input } from "@angular/core";
@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.less"],
})
export class BarChartComponent implements OnInit, OnDestroy {
  @Input() options: any;

  config = {
    view: [500, 180],
    scheme: {
      domain: ["#5858FA"],
    },
    results: [],
    gradient: false,
    xAxis: true,
    yAxis: true,
    legend: false,
    showXAxisLabel: false,
    showYAxisLabel: false,
    xAxisLabel: "",
    yAxisLabel: "",
    legendPosition: "right",
    barPadding: 60,
    noBarWhenZero: true,
    showDataLabel: true,
    rotateXAxisTicks: true,
    legendTitle: "Tổng hợp",
  };

  constructor() {}

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
    Object.assign(this.config, { ...this.options });
  }

  ngOnDestroy() {}
}
