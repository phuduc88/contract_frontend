"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignatureFlowDialogComponent = void 0;
var core_1 = require("@angular/core");
var SignatureFlowDialogComponent = /** @class */ (function () {
    function SignatureFlowDialogComponent(modal, modalService, authService, signFlowService) {
        this.modal = modal;
        this.modalService = modalService;
        this.authService = authService;
        this.signFlowService = signFlowService;
        this.currentStep = 1;
    }
    SignatureFlowDialogComponent.prototype.ngOnInit = function () {
        this.currentUser = this.authService.currentCredentials;
    };
    SignatureFlowDialogComponent.prototype.ngOnDestroy = function () { };
    SignatureFlowDialogComponent.prototype.nextStep = function () {
        var _this = this;
        this.signFlowService.getDetail("1096").subscribe(function (data) {
            _this.documentSign = data;
            _this.documentSign.listSign = [];
            _this.currentStep = 2;
        });
    };
    SignatureFlowDialogComponent.prototype.prevStep = function () {
        this.currentStep = 1;
    };
    SignatureFlowDialogComponent = __decorate([
        core_1.Component({
            selector: "signature-flow-dialog",
            templateUrl: "./signature-flow-dialog.component.html",
            styleUrls: ["signature-flow-dialog.component.less"]
        })
    ], SignatureFlowDialogComponent);
    return SignatureFlowDialogComponent;
}());
exports.SignatureFlowDialogComponent = SignatureFlowDialogComponent;
