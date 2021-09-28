"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var layout_1 = require("@app/shared/layout");
var pages_1 = require("./pages");
var routes = [
    {
        path: '',
        component: layout_1.AuthLayoutComponent,
        children: [
            { path: 'login', component: pages_1.AuthLoginComponent },
            { path: 'forgot', component: pages_1.RequestResetPasswordComponent },
            { path: 'forgot-success', component: pages_1.RequestResetSuccessComponent },
            { path: 'reset-password', component: pages_1.ResetPasswordComponent },
            { path: 'reset-success', component: pages_1.ResetSuccessComponent },
            { path: 'new-password/:token', component: pages_1.ChangePasswordComponent },
            { path: 'check-point', component: pages_1.CheckPointComponent },
        ]
    }
];
var AuthRoutingModule = /** @class */ (function () {
    function AuthRoutingModule() {
    }
    AuthRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], AuthRoutingModule);
    return AuthRoutingModule;
}());
exports.AuthRoutingModule = AuthRoutingModule;
