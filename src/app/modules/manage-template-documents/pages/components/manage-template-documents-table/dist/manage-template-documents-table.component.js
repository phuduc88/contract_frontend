"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ManageTemplateDocumentsTableComponent = void 0;
var core_1 = require("@angular/core");
var ManageTemplateDocumentsTableComponent = /** @class */ (function () {
    function ManageTemplateDocumentsTableComponent() {
    }
    ManageTemplateDocumentsTableComponent.prototype.ngOnInit = function () { };
    __decorate([
        core_1.Input()
    ], ManageTemplateDocumentsTableComponent.prototype, "datas");
    ManageTemplateDocumentsTableComponent = __decorate([
        core_1.Component({
            selector: "app-manage-template-documents-table",
            templateUrl: "./manage-template-documents-table.component.html",
            styleUrls: ["./manage-template-documents-table.component.less"]
        })
    ], ManageTemplateDocumentsTableComponent);
    return ManageTemplateDocumentsTableComponent;
}());
exports.ManageTemplateDocumentsTableComponent = ManageTemplateDocumentsTableComponent;
