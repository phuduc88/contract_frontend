import { Component, OnInit, OnDestroy, Input } from "@angular/core";
@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.less"],
})
export class LineChartComponent implements OnInit, OnDestroy {
  @Input() options: any;

  config = {
    view: [1200, 250],
    scheme:{
      name: 'coolthree',
      selectable: true,
      group: 'Ordinal',
      domain: [
        '#01579b', '#7aa3e5', '#a8385d', '#00bfa5'
      ]
    },
    results: [],
    gradient: false,
    xAxis: true,
    yAxis: true,
    legend: true,
    showXAxisLabel: true,
    yMainAxisShowLabel: true,
    ySecondaryAxisShowLabel: true,
    xAxisLabel: "",
    yMainAxisLabel: "",
    ySecondaryAxisLabel: "",
    autoScale: true,
    timeline: false,
    tooltipDisabled: false,
    animations: false,
    legendTitle: "",
    showGridLines: true

  }

  constructor() { }

  ngOnInit() {
    Object.assign(this.config, { ...this.options });
  }

  onSelect(e) {
    console.log('Select point:', e);
  }

  ngOnDestroy(){

  }
}
