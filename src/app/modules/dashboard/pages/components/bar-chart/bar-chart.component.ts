import { Component, OnInit, OnDestroy } from "@angular/core";
@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.less"],
})
export class BarChartComponent implements OnInit, OnDestroy {
  single: any[];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = "Country";
  showYAxisLabel = true;
  yAxisLabel = "Population";

  colorScheme = {
    domain: ["#5858FA"],
  };

  constructor() {
    Object.assign(this, { single: this.single });
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
