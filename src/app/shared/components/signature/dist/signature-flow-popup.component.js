"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignatureFlowPopupComponent = void 0;
var core_1 = require("@angular/core");
var SignatureFlowPopupComponent = /** @class */ (function () {
    function SignatureFlowPopupComponent(modal, modalService) {
        this.modal = modal;
        this.modalService = modalService;
    }
    SignatureFlowPopupComponent.prototype.ngOnInit = function () { };
    SignatureFlowPopupComponent.prototype.ngOnDestroy = function () { };
    SignatureFlowPopupComponent = __decorate([
        core_1.Component({
            selector: "signature-flow-popup",
            templateUrl: "./signature-flow-popup.component.html",
            styleUrls: ["signature-flow-popup.component.less"]
        })
    ], SignatureFlowPopupComponent);
    return SignatureFlowPopupComponent;
}());
exports.SignatureFlowPopupComponent = SignatureFlowPopupComponent;
