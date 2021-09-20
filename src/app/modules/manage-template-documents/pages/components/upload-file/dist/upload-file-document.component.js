"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UploadFileDocumentComponent = void 0;
var core_1 = require("@angular/core");
var UploadFileDocumentComponent = /** @class */ (function () {
    function UploadFileDocumentComponent() {
        this.onChangeFileSuccess = new core_1.EventEmitter();
    }
    UploadFileDocumentComponent.prototype.ngOnInit = function () { };
    UploadFileDocumentComponent.prototype.handleChange = function (event) {
        this.onChangeFileSuccess.emit(event);
    };
    __decorate([
        core_1.Input()
    ], UploadFileDocumentComponent.prototype, "accept");
    __decorate([
        core_1.Output()
    ], UploadFileDocumentComponent.prototype, "onChangeFileSuccess");
    UploadFileDocumentComponent = __decorate([
        core_1.Component({
            selector: "app-upload-file-document",
            templateUrl: "./upload-file-document.component.html",
            styleUrls: ["./upload-file-document.component.less"]
        })
    ], UploadFileDocumentComponent);
    return UploadFileDocumentComponent;
}());
exports.UploadFileDocumentComponent = UploadFileDocumentComponent;
