"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContractAuthenticationProcessS1Component = void 0;
var core_1 = require("@angular/core");
var ContractAuthenticationProcessS1Component = /** @class */ (function () {
    function ContractAuthenticationProcessS1Component() {
        this.onChangeFile = new core_1.EventEmitter();
    }
    ContractAuthenticationProcessS1Component.prototype.ngOnInit = function () {
    };
    ContractAuthenticationProcessS1Component.prototype.handleChange = function (e) {
        this.onChangeFile.emit(e);
    };
    __decorate([
        core_1.Output()
    ], ContractAuthenticationProcessS1Component.prototype, "onChangeFile");
    ContractAuthenticationProcessS1Component = __decorate([
        core_1.Component({
            selector: 'app-contract-authentication-process-s1',
            templateUrl: './contract-authentication-process-s1.component.html',
            styleUrls: ['./contract-authentication-process-s1.component.less']
        })
    ], ContractAuthenticationProcessS1Component);
    return ContractAuthenticationProcessS1Component;
}());
exports.ContractAuthenticationProcessS1Component = ContractAuthenticationProcessS1Component;
