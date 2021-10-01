"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardUseContractComponent = void 0;
var core_1 = require("@angular/core");
var DashboardUseContractComponent = /** @class */ (function () {
    function DashboardUseContractComponent() {
        this.optionsContractUserNew = {
            results: [
                {
                    name: "Nháp",
                    value: 5
                },
                {
                    name: "Đang xử lý",
                    value: 13
                },
                {
                    name: "Đã từ chối",
                    value: 1
                },
                {
                    name: "Hoàn thành",
                    value: 9
                },
                {
                    name: "Đã hủy",
                    value: 14
                },
            ],
            barPadding: 40
        };
        this.optionsContractUserHandle = {
            results: [
                {
                    name: "Hóa đơn chờ ký nháy",
                    value: 0
                },
                {
                    name: "Hóa đơn chờ phê duyệt",
                    value: 1
                },
                {
                    name: "Hóa đơn chờ ký duyệt",
                    value: 6
                },
            ],
            barPadding: 50
        };
        this.optionsContractCompany = {
            results: [
                {
                    name: "Hợp đồng đang xử lý (19)",
                    value: 19
                },
                {
                    name: "Hợp đồng đã từ chối (1)",
                    value: 1
                },
                {
                    name: "Hợp đồng đã hoàn thành (9)",
                    value: 9
                },
                {
                    name: "Hợp đồng đã hủy (17)",
                    value: 17
                },
            ]
        };
        this.datas = [
            {
                label: "Chờ thiết lập luồng ký",
                value: 0
            },
            {
                label: "Đang xử lý",
                value: 0
            },
            {
                label: "Đã ký",
                value: 0
            },
            {
                label: "Đã từ chối",
                value: 0
            },
        ];
    }
    DashboardUseContractComponent.prototype.ngOnInit = function () { };
    DashboardUseContractComponent.prototype.ngOnDestroy = function () { };
    DashboardUseContractComponent = __decorate([
        core_1.Component({
            selector: "app-dashboard-use-contract",
            templateUrl: "./dashboard-use-contract.component.html",
            styleUrls: ["./dashboard-use-contract.component.less"]
        })
    ], DashboardUseContractComponent);
    return DashboardUseContractComponent;
}());
exports.DashboardUseContractComponent = DashboardUseContractComponent;
