"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CustomersAddS2Component = void 0;
var core_1 = require("@angular/core");
var CustomersAddS2Component = /** @class */ (function () {
    function CustomersAddS2Component() {
    }
    CustomersAddS2Component.prototype.ngOnInit = function () {
    };
    CustomersAddS2Component.prototype.ngOnDestroy = function () {
    };
    CustomersAddS2Component = __decorate([
        core_1.Component({
            selector: 'app-customers-add',
            templateUrl: './customers-add.component.html',
            styleUrls: ['./customers-add.component.less']
        })
    ], CustomersAddS2Component);
    return CustomersAddS2Component;
}());
exports.CustomersAddS2Component = CustomersAddS2Component;
