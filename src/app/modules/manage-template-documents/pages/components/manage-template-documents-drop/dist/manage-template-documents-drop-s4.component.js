"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ManageTemplateDocumentsDropS4Component = void 0;
var core_1 = require("@angular/core");
var ManageTemplateDocumentsDropS4Component = /** @class */ (function () {
    function ManageTemplateDocumentsDropS4Component() {
        this.onGoBack = new core_1.EventEmitter();
        this.currentPage = 1;
    }
    ManageTemplateDocumentsDropS4Component.prototype.ngOnInit = function () { };
    ManageTemplateDocumentsDropS4Component.prototype.goBack = function () {
        this.onGoBack.emit({
            goStep: 2
        });
    };
    ManageTemplateDocumentsDropS4Component.prototype.importMultipleReceives = function () {
        this.onGoBack.emit({
            goStep: 5
        });
    };
    ManageTemplateDocumentsDropS4Component.prototype.quickView = function (data) {
        console.log(data);
    };
    __decorate([
        core_1.Input()
    ], ManageTemplateDocumentsDropS4Component.prototype, "documentTemplate");
    __decorate([
        core_1.Output()
    ], ManageTemplateDocumentsDropS4Component.prototype, "onGoBack");
    ManageTemplateDocumentsDropS4Component = __decorate([
        core_1.Component({
            selector: "app-manage-template-documents-drop-s4",
            templateUrl: "./manage-template-documents-drop-s4.component.html",
            styleUrls: ["./manage-template-documents-drop-s4.component.less"]
        })
    ], ManageTemplateDocumentsDropS4Component);
    return ManageTemplateDocumentsDropS4Component;
}());
exports.ManageTemplateDocumentsDropS4Component = ManageTemplateDocumentsDropS4Component;
