"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var guards_1 = require("@app/core/guards");
var routes = [
    {
        path: "",
        redirectTo: "/dashboard",
        pathMatch: "full"
    },
    {
        path: "auth",
        loadChildren: "./modules/auth/auth.module#AuthModule"
    },
    {
        path: "dashboard",
        loadChildren: "./modules/dashboard/dashboard.module#DashboardModule",
        canActivate: [guards_1.AuthGuard]
    },
    {
        path: "categories",
        loadChildren: "./modules/categories/categories.module#CategoriesModule",
        canActivate: [guards_1.AuthGuard]
    },
    {
        path: "company",
        loadChildren: "./modules/company/company.module#CompanyModule",
        canActivate: [guards_1.AuthGuard]
    },
    {
        path: "contract",
        loadChildren: "./modules/contract/contract.module#ContractModule",
        canActivate: [guards_1.AuthGuard]
    },
    {
        path: "employees",
        loadChildren: "./modules/employees/employees.module#EmployeesModule",
        canActivate: [guards_1.AuthGuard]
    },
    {
        path: "customers",
        loadChildren: "./modules/customers/customers.module#CustomersModule",
        canActivate: [guards_1.AuthGuard]
    },
    {
        path: "account-management",
        loadChildren: "./modules/system/accounts-management/accounts.module#AccountsModule",
        canActivate: [guards_1.AuthGuard]
    },
    {
        path: "products",
        loadChildren: "./modules/system/products/products.module#ProductsModule",
        canActivate: [guards_1.AuthGuard]
    },
    {
        path: "emails-notification",
        loadChildren: "./modules/system/emails-notification/emails-notification.module#EmailsNotificationModule",
        canActivate: [guards_1.AuthGuard]
    },
    {
        path: "register-ivan",
        loadChildren: "./modules/register-ivan/register-ivan.module#RegisterIvanModule",
        canActivate: [guards_1.AuthGuard]
    },
    {
        path: "search",
        loadChildren: "./modules/system/search/search.module#SearchModule",
        canActivate: [guards_1.AuthGuard]
    },
    {
        path: "account-information",
        loadChildren: "./modules/account-information/account-information.module#AccountInformationModule",
        canActivate: [guards_1.AuthGuard]
    },
    {
        path: "manage-documents",
        loadChildren: "./modules/documents/documents.module#DocumentsModule",
        canActivate: [guards_1.AuthGuard]
    },
    {
        path: "cai-dat-chung",
        loadChildren: "./modules/system/general-settings/general-settings.module#GeneralSettingsModule"
    },
    {
        path: "manage-template-documents",
        loadChildren: "./modules/manage-template-documents/manage-template-documents.module#ManageTemplateDocumentsModule"
    },
    {
        path: "system-settings",
        loadChildren: "./modules/system/system-settings/system-settings.module#SystemSettingsModule"
    },
    {
        path: "plugin-settings",
        loadChildren: "./modules/system/plugin-settings/plugin-settings.module#PluginSettingsModule"
    },
    {
        path: "report",
        loadChildren: "./modules/report/report.module#ReportModule"
    },
    {
        path: "transactions",
        loadChildren: "./modules/system/transactions/transactions.module#TransactionsModule"
    },
    {
        path: "contract-search",
        loadChildren: "./modules/contract-search/contract-search.module#ContractSearchModule"
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
