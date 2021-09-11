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
exports.InviteEmployeeComponent = void 0;
var core_1 = require("@angular/core");
var permission_table_1 = require("../../data/permission-table");
var InviteEmployeeComponent = /** @class */ (function () {
    function InviteEmployeeComponent(formBuilder, modal) {
        this.formBuilder = formBuilder;
        this.modal = modal;
        this.datas = permission_table_1.PERMISSION_LIST_DATA;
        this.showCompany = true;
        this.showPermission = {
            QUANLYTAILIEU: true,
            QUANTRITHANHVIEN: true,
            KY: true,
            MAUTAILIEU: true
        };
    }
    InviteEmployeeComponent.prototype.ngOnInit = function () {
        this.setCheckboxParentAll();
    };
    InviteEmployeeComponent.prototype.closeModal = function () {
        this.modal.destroy();
    };
    InviteEmployeeComponent.prototype.inviteEmployee = function () {
        debugger;
        var a = this.datas;
    };
    InviteEmployeeComponent.prototype.toggleCompany = function () {
        this.showCompany = !this.showCompany;
    };
    InviteEmployeeComponent.prototype.togglePermission = function (p) {
        this.showPermission[p] = !this.showPermission[p];
    };
    InviteEmployeeComponent.prototype.togglePermissionChildren = function (p) {
        return this.showPermission[p];
    };
    InviteEmployeeComponent.prototype.setCheckboxParentAll = function () {
        var _this = this;
        this.datas = this.datas.map(function (item) {
            return __assign(__assign({}, item), { check: _this.getCheckboxParent(item) });
        });
    };
    InviteEmployeeComponent.prototype.setCheckboxParent = function (id) {
        var _this = this;
        this.datas = this.datas.map(function (item) {
            return item.id === id
                ? __assign(__assign({}, item), { check: _this.getCheckboxParent(item) }) : item;
        });
    };
    InviteEmployeeComponent.prototype.getCheckboxParent = function (data) {
        var childrensCount = data.childrens.length;
        var childrensCheckCount = data.childrens.filter(function (x) { return x.check; }).length;
        return childrensCount === childrensCheckCount;
    };
    InviteEmployeeComponent.prototype.parentCheck = function (event, id) {
        debugger;
        this.datas = this.datas.map(function (item) {
            return item.id === id
                ? __assign(__assign({}, item), { childrens: item.childrens.map(function (children) {
                        return __assign(__assign({}, children), { check: event.target.checked });
                    }) }) : item;
        });
        this.setCheckboxParentAll();
    };
    InviteEmployeeComponent.prototype.childrenCheck = function (event, parentId, childrenId) {
        this.datas = this.datas.map(function (item) {
            return item.id === parentId
                ? __assign(__assign({}, item), { childrens: item.childrens.map(function (children) {
                        return children.id === childrenId
                            ? __assign(__assign({}, children), { check: event.target.checked }) : children;
                    }) }) : item;
        });
        this.setCheckboxParentAll();
    };
    __decorate([
        core_1.Input()
    ], InviteEmployeeComponent.prototype, "employeeInfo");
    InviteEmployeeComponent = __decorate([
        core_1.Component({
            selector: "invite-employee",
            templateUrl: "./invite-employee.component.html",
            styleUrls: ["./invite-employee.component.less"]
        })
    ], InviteEmployeeComponent);
    return InviteEmployeeComponent;
}());
exports.InviteEmployeeComponent = InviteEmployeeComponent;
