"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContractSearchAuthenticationComponent = void 0;
var core_1 = require("@angular/core");
var components_1 = require("../components");
var ContractSearchAuthenticationComponent = /** @class */ (function () {
    function ContractSearchAuthenticationComponent(modalService) {
        this.modalService = modalService;
    }
    ContractSearchAuthenticationComponent.prototype.ngOnInit = function () { };
    ContractSearchAuthenticationComponent.prototype.changeFile = function (event) {
        var modal = this.modalService.create({
            nzClosable: true,
            nzTitle: "Xác thực hợp đồng",
            nzStyle: { top: 0 },
            nzClassName: "invite-employee signature-flow",
            nzKeyboard: false,
            nzContent: components_1.ContractAuthenticationProcessS2Component,
            nzOnOk: function (data) { return console.log("Click ok", data); },
            nzFooter: []
        });
    };
    ContractSearchAuthenticationComponent.prototype.ngAfterViewInit = function () { };
    ContractSearchAuthenticationComponent.prototype.ngOnDestroy = function () { };
    ContractSearchAuthenticationComponent = __decorate([
        core_1.Component({
            selector: "app-contract-search-authentication",
            templateUrl: "./contract-search-authentication.component.html",
            styleUrls: ["./contract-search-authentication.component.less"]
        })
    ], ContractSearchAuthenticationComponent);
    return ContractSearchAuthenticationComponent;
}());
exports.ContractSearchAuthenticationComponent = ContractSearchAuthenticationComponent;
