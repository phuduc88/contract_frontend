import { Component, OnInit, OnDestroy, Input } from "@angular/core";
@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.less"],
})
export class PieChartComponent implements OnInit, OnDestroy {
  @Input() options: any;

  config = {
    view: [500, 220],
    scheme: {
      domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"],
    },
    results: [],
    gradient: false,
    xAxis: true,
    yAxis: true,
    legend: true,
    legendPosition: "below",
    labels: true,
    doughnut: true,
    arcWidth: 0.6,
    legendTitle: "",
  };

  constructor() {}

  onSelect(data): void {
    console.log("Item clicked", JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log("Activate", JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log("Deactivate", JSON.parse(JSON.stringify(data)));
  }

  ngOnInit() {
    Object.assign(this.config, { ...this.options });
  }

  labelFormatting(name) {
    let self: any = this;
    console.log(self);

    let item = self.series.filter((x) => x.name == name);
    let total = self.series.reduce((sum, item) => sum + item.value, 0);
 
    if (item && item.length > 0) {
      let percentage = (item[0].value / total) * 100;
      return (Math.round(percentage * 100) / 100).toFixed(1) + " %";
    }
    return name;
  }

  ngOnDestroy() {}
}
