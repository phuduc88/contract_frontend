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
exports.BarChartComponent = void 0;
var core_1 = require("@angular/core");
var BarChartComponent = /** @class */ (function () {
    function BarChartComponent() {
        this.config = {
            view: [500, 180],
            scheme: {
                domain: ["#5858FA"]
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
            legendTitle: "Tổng hợp"
        };
    }
    BarChartComponent.prototype.onSelect = function (event) {
        console.log(event);
    };
    BarChartComponent.prototype.ngOnInit = function () {
        Object.assign(this.config, __assign({}, this.options));
    };
    BarChartComponent.prototype.ngOnDestroy = function () { };
    __decorate([
        core_1.Input()
    ], BarChartComponent.prototype, "options");
    BarChartComponent = __decorate([
        core_1.Component({
            selector: "app-bar-chart",
            templateUrl: "./bar-chart.component.html",
            styleUrls: ["./bar-chart.component.less"]
        })
    ], BarChartComponent);
    return BarChartComponent;
}());
exports.BarChartComponent = BarChartComponent;
