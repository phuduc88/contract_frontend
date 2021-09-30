"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CustomersListS2Component = void 0;
var core_1 = require("@angular/core");
var customer_table_1 = require("@app/modules/customers/data/customer-table");
var CustomersListS2Component = /** @class */ (function () {
    function CustomersListS2Component() {
        this.selectedPage = 1;
        this.customers = customer_table_1.CUSTOMER_LIST_DATA;
    }
    CustomersListS2Component.prototype.ngOnInit = function () { };
    CustomersListS2Component.prototype.ngOnDestroy = function () { };
    CustomersListS2Component = __decorate([
        core_1.Component({
            selector: "app-customers-list",
            templateUrl: "./customers-list.component.html",
            styleUrls: ["./customers-list.component.less"]
        })
    ], CustomersListS2Component);
    return CustomersListS2Component;
}());
exports.CustomersListS2Component = CustomersListS2Component;
