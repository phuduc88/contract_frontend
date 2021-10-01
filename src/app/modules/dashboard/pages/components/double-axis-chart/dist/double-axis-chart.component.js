"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.DoubleAxisChartComponent = void 0;
var core_1 = require("@angular/core");
var ngx_charts_1 = require("@swimlane/ngx-charts");
var d3_shape_1 = require("d3-shape");
var d3_scale_1 = require("d3-scale");
// import { id } from '@swimlane/ngx-charts/release/utils';
var DoubleAxisChartComponent = /** @class */ (function (_super) {
    __extends(DoubleAxisChartComponent, _super);
    function DoubleAxisChartComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legendTitle = 'Legend';
        _this.autoScale = true;
        _this.timeline = true;
        _this.showXGridLines = true;
        _this.showYMainGridLines = true;
        _this.showYSecondaryGridLines = false;
        _this.curve = d3_shape_1.curveLinear;
        _this.activeEntries = [];
        _this.roundDomains = false;
        _this.tooltipDisabled = false;
        _this.showRefLines = false;
        _this.showRefLabels = true;
        _this.yDefaultAxis = 'left';
        _this.activate = new core_1.EventEmitter();
        _this.deactivate = new core_1.EventEmitter();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.scaleType = 'linear';
        _this.yOrientLeft = 'left';
        _this.yOrientRight = 'right';
        _this.legendSpacing = 0;
        _this.barPadding = 10;
        _this.timelineHeight = 50;
        _this.timelinePadding = 10;
        /* timeline */
        _this.comboArr = [];
        return _this;
    }
    DoubleAxisChartComponent.prototype.ngOnInit = function () {
    };
    DoubleAxisChartComponent.prototype.dataSplit = function () {
        var _a;
        _a = this.chartsData.reduce(function (acc, item) {
            if (item.secondAxis) {
                acc[1].push(item);
            }
            else {
                acc[0].push(item);
            }
            return acc;
        }, [[], []]), this.lineChart = _a[0], this.lineChart1 = _a[1];
        if (this.lineChart1.length) {
            var _b = this.getYDomainLine(this.lineChart), min1_1 = _b[0], max1_1 = _b[1];
            var _c = this.getYDomainLine(this.lineChart1), min2_1 = _c[0], max2_1 = _c[1];
            this.comboArr = this.lineChart.concat(this.lineChart1.map(function (line) {
                return {
                    name: line.name,
                    series: line.series.map(function (point) {
                        return {
                            name: point.name,
                            value: ((point.value - min2_1) * (max1_1 - min1_1) / (max2_1 - min2_1)) + min1_1
                        };
                    })
                };
            }));
        }
        else {
            this.comboArr = this.lineChart;
        }
    };
    DoubleAxisChartComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    DoubleAxisChartComponent.prototype.update = function () {
        this.dataSplit();
        _super.prototype.update.call(this);
        var q = {
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.yMainAxisShowLabel,
            showLegend: this.legend,
            legendType: this.schemeType
        };
        this.dims = ngx_charts_1.calculateViewDimensions(q);
        if (this.yAxis && this.lineChart1.length) {
            this.dims.width -= 65;
        }
        if (this.timeline) {
            this.dims.height -= (this.timelineHeight + this.margin[2] + this.timelinePadding);
        }
        if (!this.yAxis) {
            this.legendSpacing = 0;
        }
        else if (this.yMainAxisShowLabel && this.yAxis) {
            this.legendSpacing = 100;
        }
        else {
            this.legendSpacing = 40;
        }
        // line chart
        this.xDomain = this.getXDomainLine();
        // todo open after resolve bug in charts
        // if (this.filteredDomain) {
        // 	this.xDomain = this.filteredDomain;
        // }
        this.xScaleLine = this.getXScale(this.xDomain, this.dims.width);
        this.seriesDomain = this.getSeriesDomain();
        this.yDomainLine = this.getYDomainLine(this.lineChart);
        this.yMainScale = this.getYScaleLine(this.yDomainLine, this.dims.height);
        if (this.lineChart1.length) {
            this.yDomainLine1 = this.getYDomainLine(this.lineChart1);
            this.ySecondScale = this.getYScaleLine(this.yDomainLine1, this.dims.height);
        }
        this.updateTimeline();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        // this.clipPathId = 'clip' + id().toString();
        this.clipPath = "url(#" + this.clipPathId + ")";
    };
    DoubleAxisChartComponent.prototype.deactivateAll = function () {
        this.activeEntries = __spreadArrays(this.activeEntries);
        for (var _i = 0, _a = this.activeEntries; _i < _a.length; _i++) {
            var entry = _a[_i];
            this.deactivate.emit({ value: entry, entries: [] });
        }
        this.activeEntries = [];
    };
    DoubleAxisChartComponent.prototype.hideCircles = function () {
        this.hoveredVertical = null;
        this.deactivateAll();
    };
    DoubleAxisChartComponent.prototype.updateHoveredVertical = function (item) {
        this.hoveredVertical = item.value;
        this.deactivateAll();
    };
    DoubleAxisChartComponent.prototype.updateDomain = function (domain) {
        this.filteredDomain = domain;
        this.xDomain = this.filteredDomain;
        this.xScaleLine = this.getXScale(this.xDomain, this.dims.width);
    };
    DoubleAxisChartComponent.prototype.getSeriesDomain = function () {
        this.combinedSeries = this.lineChart.concat(this.lineChart1);
        return this.combinedSeries.map(function (d) { return d.name; });
    };
    DoubleAxisChartComponent.prototype.isDate = function (value) {
        return value instanceof Date;
    };
    DoubleAxisChartComponent.prototype.getScaleType = function (values) {
        var date = true;
        var num = true;
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (!this.isDate(value)) {
                date = false;
            }
            if (typeof value !== 'number') {
                num = false;
            }
        }
        if (date) {
            return 'time';
        }
        if (num) {
            return 'linear';
        }
        return 'ordinal';
    };
    DoubleAxisChartComponent.prototype.getXDomainLine = function () {
        var values = [];
        for (var _i = 0, _a = this.lineChart; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!values.includes(d.name)) {
                    values.push(d.name);
                }
            }
        }
        this.scaleType = this.getScaleType(values);
        var domain = [];
        if (this.scaleType === 'time') {
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [min, max];
        }
        else if (this.scaleType === 'linear') {
            values = values.map(function (v) { return Number(v); });
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [min, max];
        }
        else {
            domain = values;
        }
        this.xSet = values;
        return domain;
    };
    DoubleAxisChartComponent.prototype.getYDomainLine = function (data) {
        var domain = [];
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var results = data_1[_i];
            for (var _a = 0, _b = results.series; _a < _b.length; _a++) {
                var d = _b[_a];
                if (domain.indexOf(d.value) < 0) {
                    domain.push(d.value);
                }
                if (d.min !== undefined) {
                    if (domain.indexOf(d.min) < 0) {
                        domain.push(d.min);
                    }
                }
                if (d.max !== undefined) {
                    if (domain.indexOf(d.max) < 0) {
                        domain.push(d.max);
                    }
                }
            }
        }
        if (!this.autoScale) {
            domain.push(0);
        }
        var min = this.yMainScaleMin ? this.yMainScaleMin : Math.min.apply(Math, domain);
        var max = this.yMainScaleMax ? this.yMainScaleMax : Math.max.apply(Math, domain);
        if (this.ySecondaryAxisScaleFactor) {
            var minMax = this.ySecondaryAxisScaleFactor(min, max);
            return [minMax.min, minMax.max];
        }
        else {
            return [min, max];
        }
    };
    DoubleAxisChartComponent.prototype.getXScale = function (domain, width) {
        var scale;
        if (this.bandwidth === undefined) {
            this.bandwidth = (this.dims.width - this.barPadding);
        }
        if (this.scaleType === 'time') {
            scale = d3_scale_1.scaleTime()
                .range([0, width])
                .domain(domain);
        }
        else if (this.scaleType === 'linear') {
            scale = d3_scale_1.scaleLinear()
                .range([0, width])
                .domain(domain);
            if (this.roundDomains) {
                scale = scale.nice();
            }
        }
        else if (this.scaleType === 'ordinal') {
            scale = d3_scale_1.scalePoint()
                .range([this.bandwidth / 2, width - this.bandwidth / 2])
                .domain(domain);
        }
        return scale;
    };
    DoubleAxisChartComponent.prototype.getYScaleLine = function (domain, height) {
        var scale = d3_scale_1.scaleLinear()
            .range([height, 0])
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    };
    DoubleAxisChartComponent.prototype.getYScale = function (yDomain, height) {
        var scale = d3_scale_1.scaleLinear()
            .range([height, 0])
            .domain(yDomain);
        return this.roundDomains ? scale.nice() : scale;
    };
    DoubleAxisChartComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    DoubleAxisChartComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.xDomain;
        }
        else {
            domain = this.yDomain;
        }
        this.colors = new ngx_charts_1.ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
        this.colorsLine = new ngx_charts_1.ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    DoubleAxisChartComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.seriesDomain;
            opts.colors = this.colorsLine;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.seriesDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    DoubleAxisChartComponent.prototype.updateLineWidth = function (width) {
        this.bandwidth = width;
    };
    DoubleAxisChartComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width + 20;
        this.update();
    };
    DoubleAxisChartComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    DoubleAxisChartComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = __spreadArrays([item], this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    DoubleAxisChartComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = __spreadArrays(this.activeEntries);
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    DoubleAxisChartComponent.prototype.updateTimeline = function () {
        if (this.timeline) {
            this.timelineWidth = this.dims.width;
            this.timelineXDomain = this.getXDomainLine();
            this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
            var timeLineDomain = this.getYDomainLine(this.comboArr);
            this.timelineYScale = this.getYScale(timeLineDomain, this.timelineHeight);
            this.timelineTransform = "translate(" + this.dims.xOffset + ", " + -this.margin[2] + ")";
        }
    };
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "legend");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "legendTitle");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "xAxis");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "yAxis");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "showXAxisLabel");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "yMainAxisShowLabel");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "ySecondaryAxisShowLabel");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "xAxisLabel");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "yMainAxisLabel");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "ySecondaryAxisLabel");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "autoScale");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "timeline");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "gradient");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "showXGridLines");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "showYMainGridLines");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "showYSecondaryGridLines");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "curve");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "activeEntries");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "schemeType");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "rangeFillOpacity");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "xAxisTickFormatting");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "yMainAxisTickFormatting");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "ySecondaryAxisTickFormatting");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "xAxisTicks");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "yMainAxisTicks");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "ySecondaryAxisTicks");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "roundDomains");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "tooltipDisabled");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "showRefLines");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "referenceLines");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "showRefLabels");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "xScaleMin");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "xScaleMax");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "yMainScaleMin");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "yMainScaleMax");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "ySecondaryScaleMin");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "ySecondaryScaleMax");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "yDefaultAxis");
    __decorate([
        core_1.Input('results')
    ], DoubleAxisChartComponent.prototype, "chartsData");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "yMainAxisScaleFactor");
    __decorate([
        core_1.Input()
    ], DoubleAxisChartComponent.prototype, "ySecondaryAxisScaleFactor");
    __decorate([
        core_1.Output()
    ], DoubleAxisChartComponent.prototype, "activate");
    __decorate([
        core_1.Output()
    ], DoubleAxisChartComponent.prototype, "deactivate");
    __decorate([
        core_1.ContentChild('tooltipTemplate')
    ], DoubleAxisChartComponent.prototype, "tooltipTemplate");
    __decorate([
        core_1.ContentChild('seriesTooltipTemplate')
    ], DoubleAxisChartComponent.prototype, "seriesTooltipTemplate");
    __decorate([
        core_1.HostListener('mouseleave')
    ], DoubleAxisChartComponent.prototype, "hideCircles");
    DoubleAxisChartComponent = __decorate([
        core_1.Component({
            selector: 'app-double-axis-chart',
            templateUrl: './double-axis-chart.component.html',
            styleUrls: ['./double-axis-chart.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], DoubleAxisChartComponent);
    return DoubleAxisChartComponent;
}(ngx_charts_1.BaseChartComponent));
exports.DoubleAxisChartComponent = DoubleAxisChartComponent;
