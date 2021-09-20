"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ManageTemplateDocumentsDropS2Component = void 0;
var core_1 = require("@angular/core");
var manage_template_documents_table_1 = require("@app/modules/manage-template-documents/data/manage-template-documents-table");
var event_emitter_1 = require("@app/shared/utils/event-emitter");
var ManageTemplateDocumentsDropS2Component = /** @class */ (function () {
    function ManageTemplateDocumentsDropS2Component() {
        this.datas = manage_template_documents_table_1.MANAGE_TEMPLATE_DOCUMENT_DATA;
    }
    ManageTemplateDocumentsDropS2Component.prototype.ngOnInit = function () { };
    ManageTemplateDocumentsDropS2Component.prototype.changeFileSuccess = function (event) {
        event_emitter_1.eventEmitter.emit("template-document:nextStep", {
            file: event,
            goStep: 3
        });
    };
    ManageTemplateDocumentsDropS2Component.prototype.goBack = function () {
        event_emitter_1.eventEmitter.emit("template-document:prevStep", {
            file: null,
            goStep: 1
        });
    };
    ManageTemplateDocumentsDropS2Component = __decorate([
        core_1.Component({
            selector: "app-manage-template-documents-drop-s2",
            templateUrl: "./manage-template-documents-drop-s2.component.html",
            styleUrls: ["./manage-template-documents-drop-s2.component.less"]
        })
    ], ManageTemplateDocumentsDropS2Component);
    return ManageTemplateDocumentsDropS2Component;
}());
exports.ManageTemplateDocumentsDropS2Component = ManageTemplateDocumentsDropS2Component;
