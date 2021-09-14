"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignDocumentFullHeightDirective = void 0;
var core_1 = require("@angular/core");
var CARD_OFFSET = 20;
var SignDocumentFullHeightDirective = /** @class */ (function () {
    function SignDocumentFullHeightDirective(elementRef) {
        this.elementRef = elementRef;
        this.updateElementHeight = this.updateElementHeight.bind(this);
    }
    SignDocumentFullHeightDirective.prototype.ngOnInit = function () {
        this.updateElementHeight();
        window.addEventListener("resize", this.updateElementHeight);
    };
    SignDocumentFullHeightDirective.prototype.ngOnChanges = function (value) {
        this.updateElementHeight();
    };
    SignDocumentFullHeightDirective.prototype.ngOnDestroy = function () {
        window.removeEventListener("resize", this.updateElementHeight);
    };
    SignDocumentFullHeightDirective.prototype.updateElementHeight = function () {
        var element = this.elementRef.nativeElement;
        var header = document.getElementsByClassName("ant-modal-header")[0];
        var footer = document.getElementsByClassName("signature-flow-footer")[0];
        var headerLeft = document.getElementsByClassName("header-left")[0];
        element.style.height = window.innerHeight -
            header.clientHeight -
            footer.clientHeight -
            (this.currentStep === 1 ? CARD_OFFSET : 0) -
            (this.currentStep === 99 ? headerLeft.clientHeight : 0) + "px";
        switch (this.currentStep) {
            case 1:
            case 99:
                element.style.overflowX = "hidden";
                element.style.overflowY = "scroll";
                break;
            case 2:
                element.style.overflowY = element.style.overflowX = "clip";
                break;
            default:
                element.style.overflow = "hidden";
                break;
        }
    };
    __decorate([
        core_1.Input()
    ], SignDocumentFullHeightDirective.prototype, "currentStep");
    SignDocumentFullHeightDirective = __decorate([
        core_1.Directive({
            // tslint:disable-next-line:directive-selector
            selector: "[signDocumentFullHeight]"
        })
    ], SignDocumentFullHeightDirective);
    return SignDocumentFullHeightDirective;
}());
exports.SignDocumentFullHeightDirective = SignDocumentFullHeightDirective;
