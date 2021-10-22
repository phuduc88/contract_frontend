"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignContractComponent = void 0;
var core_1 = require("@angular/core");
var SignContractComponent = /** @class */ (function () {
    function SignContractComponent() {
        this.typeValue = "A";
    }
    SignContractComponent.prototype.ngOnInit = function () { };
    SignContractComponent.prototype.ngOnDestroy = function () { };
    SignContractComponent.prototype.save = function () { };
    SignContractComponent = __decorate([
        core_1.Component({
            selector: "app-sign-contract",
            templateUrl: "./sign-contract.component.html",
            styleUrls: ["./sign-contract.component.less"]
        })
    ], SignContractComponent);
    return SignContractComponent;
}());
exports.SignContractComponent = SignContractComponent;
