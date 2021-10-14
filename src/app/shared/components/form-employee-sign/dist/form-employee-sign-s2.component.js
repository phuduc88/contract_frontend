"use strict";
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
exports.FormEployeeSignS2Component = void 0;
var core_1 = require("@angular/core");
require("jqueryui");
var FormEployeeSignS2Component = /** @class */ (function () {
    function FormEployeeSignS2Component() {
        this.employeesSign = [];
    }
    FormEployeeSignS2Component.prototype.ngOnInit = function () { };
    FormEployeeSignS2Component.prototype.removeEmployeeSing = function (index) {
        var employeesSignCopy = __spreadArrays(this.employeesSign);
        employeesSignCopy.splice(index, 1);
        this.employeesSign = employeesSignCopy;
    };
    FormEployeeSignS2Component.prototype.addEmployeeSign = function () {
        var employeesSignCopy = __spreadArrays(this.employeesSign);
        employeesSignCopy.push({
            name: null
        });
        this.employeesSign = employeesSignCopy;
    };
    FormEployeeSignS2Component.prototype.ngOnChanges = function (changes) { };
    FormEployeeSignS2Component = __decorate([
        core_1.Component({
            selector: "app-form-employee-sign-s2",
            templateUrl: "./form-employee-sign-s2.component.html",
            styleUrls: ["form-employee-sign-s2.component.less"]
        })
    ], FormEployeeSignS2Component);
    return FormEployeeSignS2Component;
}());
exports.FormEployeeSignS2Component = FormEployeeSignS2Component;
