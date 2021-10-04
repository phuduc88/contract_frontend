"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardSendSmsComponent = void 0;
var core_1 = require("@angular/core");
var DashboardSendSmsComponent = /** @class */ (function () {
    function DashboardSendSmsComponent(formBuilder) {
        this.formBuilder = formBuilder;
        this.options = {
            results: [
                {
                    name: "Hợp đồng",
                    series: [
                        {
                            name: new Date("2018-01-01T00:00:00"),
                            value: "100"
                        },
                        {
                            name: new Date("2018-02-01T00:00:00"),
                            value: "200"
                        },
                        {
                            name: new Date("2018-03-01T00:00:00"),
                            value: "150"
                        },
                        {
                            name: new Date("2018-04-01T00:00:00"),
                            value: "50"
                        },
                        {
                            name: new Date("2018-05-01T00:00:00"),
                            value: "100"
                        },
                    ]
                },
                {
                    name: "Tin nhắn",
                    secondAxis: true,
                    series: [
                        {
                            name: new Date("2018-01-01T00:00:00"),
                            value: "5"
                        },
                        {
                            name: new Date("2018-02-01T00:00:00"),
                            value: "4"
                        },
                        {
                            name: new Date("2018-03-01T00:00:00"),
                            value: "1"
                        },
                        {
                            name: new Date("2018-04-01T00:00:00"),
                            value: "3"
                        },
                        {
                            name: new Date("2018-05-01T00:00:00"),
                            value: "2"
                        },
                    ]
                },
            ]
        };
    }
    DashboardSendSmsComponent.prototype.ngOnInit = function () {
        this.formSearch = this.formBuilder.group({
            dateFrom: [""],
            dateTo: [""]
        });
    };
    DashboardSendSmsComponent.prototype.ngOnDestroy = function () { };
    DashboardSendSmsComponent = __decorate([
        core_1.Component({
            selector: "app-dashboard-send-sms",
            templateUrl: "./dashboard-send-sms.component.html",
            styleUrls: ["./dashboard-send-sms.component.less"]
        })
    ], DashboardSendSmsComponent);
    return DashboardSendSmsComponent;
}());
exports.DashboardSendSmsComponent = DashboardSendSmsComponent;
