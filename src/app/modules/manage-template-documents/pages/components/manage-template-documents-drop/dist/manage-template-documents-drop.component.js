"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ManageTemplateDocumentsDropComponent = void 0;
var core_1 = require("@angular/core");
var manage_template_documents_table_1 = require("@app/modules/manage-template-documents/data/manage-template-documents-table");
var event_emitter_1 = require("@app/shared/utils/event-emitter");
var ManageTemplateDocumentsDropComponent = /** @class */ (function () {
    function ManageTemplateDocumentsDropComponent() {
        this.datas = manage_template_documents_table_1.MANAGE_TEMPLATE_DOCUMENTS_DATA;
    }
    ManageTemplateDocumentsDropComponent.prototype.ngOnInit = function () { };
    ManageTemplateDocumentsDropComponent.prototype.changeFileSuccess = function (event) {
        event_emitter_1.eventEmitter.emit("template-document:nextStep", {
            file: event,
            goStep: 2
        });
    };
    ManageTemplateDocumentsDropComponent = __decorate([
        core_1.Component({
            selector: "app-manage-template-documents-drop",
            templateUrl: "./manage-template-documents-drop.component.html",
            styleUrls: ["./manage-template-documents-drop.component.less"]
        })
    ], ManageTemplateDocumentsDropComponent);
    return ManageTemplateDocumentsDropComponent;
}());
exports.ManageTemplateDocumentsDropComponent = ManageTemplateDocumentsDropComponent;
