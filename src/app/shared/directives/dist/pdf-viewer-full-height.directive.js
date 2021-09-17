"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PdfViewerFullHeightDirective = void 0;
var core_1 = require("@angular/core");
var CARD_OFFSET = 20;
var PdfViewerFullHeightDirective = /** @class */ (function () {
    function PdfViewerFullHeightDirective(elementRef) {
        this.elementRef = elementRef;
        this.updateElementHeight = this.updateElementHeight.bind(this);
    }
    PdfViewerFullHeightDirective.prototype.ngOnInit = function () {
        this.updateElementHeight();
        window.addEventListener("resize", this.updateElementHeight);
    };
    PdfViewerFullHeightDirective.prototype.ngOnDestroy = function () {
        window.removeEventListener("resize", this.updateElementHeight);
    };
    PdfViewerFullHeightDirective.prototype.updateElementHeight = function () {
        var element = this.elementRef.nativeElement;
        var header = document.getElementsByClassName("ant-modal-header")[0];
        var footer = document.getElementsByClassName("signature-flow-footer")[0];
        var controlFile = document.getElementsByClassName("control-file")[0];
        element.style.height = window.innerHeight -
            header.clientHeight -
            footer.clientHeight -
            controlFile.clientHeight -
            CARD_OFFSET + "px";
    };
    __decorate([
        core_1.Input()
    ], PdfViewerFullHeightDirective.prototype, "currentStep");
    PdfViewerFullHeightDirective = __decorate([
        core_1.Directive({
            // tslint:disable-next-line:directive-selector
            selector: "[pdfViewerFullHeight]"
        })
    ], PdfViewerFullHeightDirective);
    return PdfViewerFullHeightDirective;
}());
exports.PdfViewerFullHeightDirective = PdfViewerFullHeightDirective;
