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
exports.LineChartComponent = void 0;
var core_1 = require("@angular/core");
var LineChartComponent = /** @class */ (function () {
    function LineChartComponent() {
        this.config = {
            view: [1200, 250],
            scheme: {
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
        };
    }
    LineChartComponent.prototype.ngOnInit = function () {
        Object.assign(this.config, __assign({}, this.options));
    };
    LineChartComponent.prototype.onSelect = function (e) {
        console.log('Select point:', e);
    };
    LineChartComponent.prototype.ngOnDestroy = function () {
    };
    __decorate([
        core_1.Input()
    ], LineChartComponent.prototype, "options");
    LineChartComponent = __decorate([
        core_1.Component({
            selector: "app-line-chart",
            templateUrl: "./line-chart.component.html",
            styleUrls: ["./line-chart.component.less"]
        })
    ], LineChartComponent);
    return LineChartComponent;
}());
exports.LineChartComponent = LineChartComponent;
