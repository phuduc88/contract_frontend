"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PieChartComponent = void 0;
var core_1 = require("@angular/core");
var PieChartComponent = /** @class */ (function () {
    function PieChartComponent() {
        this.config = {
            view: [500, 220],
            scheme: {
                domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"]
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
            legendTitle: ""
        };
    }
    PieChartComponent.prototype.onSelect = function (data) {
        console.log("Item clicked", JSON.parse(JSON.stringify(data)));
    };
    PieChartComponent.prototype.onActivate = function (data) {
        console.log("Activate", JSON.parse(JSON.stringify(data)));
    };
    PieChartComponent.prototype.onDeactivate = function (data) {
        console.log("Deactivate", JSON.parse(JSON.stringify(data)));
    };
    PieChartComponent.prototype.ngOnInit = function () {
        Object.assign(this.config, __assign({}, this.options));
    };
    PieChartComponent.prototype.labelFormatting = function (name) {
        var self = this;
        console.log(self);
        var item = self.series.filter(function (x) { return x.name == name; });
        var total = self.series.reduce(function (sum, item) { return sum + item.value; }, 0);
        if (item && item.length > 0) {
            var percentage = (item[0].value / total) * 100;
            return (Math.round(percentage * 100) / 100).toFixed(1) + " %";
        }
        return name;
    };
    PieChartComponent.prototype.ngOnDestroy = function () { };
    __decorate([
        core_1.Input()
    ], PieChartComponent.prototype, "options");
    PieChartComponent = __decorate([
        core_1.Component({
            selector: "app-pie-chart",
            templateUrl: "./pie-chart.component.html",
            styleUrls: ["./pie-chart.component.less"]
        })
    ], PieChartComponent);
    return PieChartComponent;
}());
exports.PieChartComponent = PieChartComponent;
