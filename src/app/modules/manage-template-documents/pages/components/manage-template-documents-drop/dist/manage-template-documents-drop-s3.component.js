"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ManageTemplateDocumentsDropS3Component = void 0;
var core_1 = require("@angular/core");
var manage_template_documents_table_1 = require("@app/modules/manage-template-documents/data/manage-template-documents-table");
var event_emitter_1 = require("@app/shared/utils/event-emitter");
var ManageTemplateDocumentsDropS3Component = /** @class */ (function () {
    function ManageTemplateDocumentsDropS3Component() {
        this.datas = manage_template_documents_table_1.IMPORT_DATA;
        this.currentPage = 1;
    }
    ManageTemplateDocumentsDropS3Component.prototype.ngOnInit = function () { };
    ManageTemplateDocumentsDropS3Component.prototype.nextStep = function () {
        event_emitter_1.eventEmitter.emit("template-document:nextStep", {
            file: null,
            goStep: 4
        });
    };
    ManageTemplateDocumentsDropS3Component.prototype.goBack = function () {
        event_emitter_1.eventEmitter.emit("template-document:prevStep", {
            file: null,
            goStep: 2
        });
    };
    ManageTemplateDocumentsDropS3Component = __decorate([
        core_1.Component({
            selector: "app-manage-template-documents-drop-s3",
            templateUrl: "./manage-template-documents-drop-s3.component.html",
            styleUrls: ["./manage-template-documents-drop-s3.component.less"]
        })
    ], ManageTemplateDocumentsDropS3Component);
    return ManageTemplateDocumentsDropS3Component;
}());
exports.ManageTemplateDocumentsDropS3Component = ManageTemplateDocumentsDropS3Component;
