"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ManageTemplateDocumentsComponent = void 0;
var core_1 = require("@angular/core");
var event_emitter_1 = require("@app/shared/utils/event-emitter");
var ManageTemplateDocumentsComponent = /** @class */ (function () {
    function ManageTemplateDocumentsComponent() {
        this.currentStep = 1;
        this.overloading = false;
        this.parentStyle = {};
    }
    ManageTemplateDocumentsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.handlers = [
            event_emitter_1.eventEmitter.on("template-document:nextStep", function (_a) {
                var file = _a.file, goStep = _a.goStep;
                _this.changeFileSuccess(file, goStep);
            }),
            event_emitter_1.eventEmitter.on("template-document:prevStep", function (_a) {
                var file = _a.file, goStep = _a.goStep;
                _this.changeFileSuccess(file, goStep);
            }),
        ];
    };
    ManageTemplateDocumentsComponent.prototype.changeFileSuccess = function (file, goStep) {
        var _this = this;
        this.overloading = true;
        this.parentStyle = {
            "z-index": 99999,
            opacity: 0.3
        };
        setTimeout(function () {
            _this.currentStep = goStep;
            console.log(file);
            _this.overloading = false;
            _this.parentStyle = {};
        }, 2000);
    };
    ManageTemplateDocumentsComponent.prototype.ngOnDestroy = function () {
        event_emitter_1.eventEmitter.destroy(this.handlers);
    };
    ManageTemplateDocumentsComponent = __decorate([
        core_1.Component({
            selector: "app-manage-template-documents",
            templateUrl: "./manage-template-documents.component.html",
            styleUrls: ["./manage-template-documents.component.less"]
        })
    ], ManageTemplateDocumentsComponent);
    return ManageTemplateDocumentsComponent;
}());
exports.ManageTemplateDocumentsComponent = ManageTemplateDocumentsComponent;
