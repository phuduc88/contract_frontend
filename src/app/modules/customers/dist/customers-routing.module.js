"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CustomersRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var layout_1 = require("@app/shared/layout");
var pages_1 = require("./pages");
var routes = [
    {
        path: "",
        component: layout_1.LayoutComponent,
        children: [
            {
                path: "",
                component: pages_1.CustomersListS2Component
            },
            {
                path: "add",
                component: pages_1.CustomersAddS2Component
            },
            {
                path: ":id/edit",
                component: pages_1.CustomersEditS2Component
            },
            {
                path: "import",
                component: pages_1.CustomersImportComponent
            },
        ]
    },
];
var CustomersRoutingModule = /** @class */ (function () {
    function CustomersRoutingModule() {
    }
    CustomersRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], CustomersRoutingModule);
    return CustomersRoutingModule;
}());
exports.CustomersRoutingModule = CustomersRoutingModule;
