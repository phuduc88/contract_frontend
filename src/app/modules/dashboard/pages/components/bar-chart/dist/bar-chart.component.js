"use strict";
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
        this.view = [700, 400];
        // options
        this.showXAxis = true;
        this.showYAxis = true;
        this.gradient = false;
        this.showLegend = true;
        this.showXAxisLabel = true;
        this.xAxisLabel = "Country";
        this.showYAxisLabel = true;
        this.yAxisLabel = "Population";
        this.colorScheme = {
            domain: ["#5858FA"]
        };
        Object.assign(this, { single: this.single });
    }
    BarChartComponent.prototype.onSelect = function (event) {
        console.log(event);
    };
    BarChartComponent.prototype.ngOnInit = function () { };
    BarChartComponent.prototype.ngOnDestroy = function () { };
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
