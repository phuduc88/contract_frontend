"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IframeViewerComponent = void 0;
var core_1 = require("@angular/core");
var IframeViewerComponent = /** @class */ (function () {
    function IframeViewerComponent() {
    }
    IframeViewerComponent.prototype.ngOnInit = function () {
        console.log(this.srcUrl);
    };
    IframeViewerComponent.prototype.ngOnDestroy = function () { };
    __decorate([
        core_1.Input()
    ], IframeViewerComponent.prototype, "srcUrl");
    IframeViewerComponent = __decorate([
        core_1.Component({
            selector: "app-iframe-viewer",
            templateUrl: "./iframe-viewer.component.html",
            styleUrls: ["./iframe-viewer.component.less"]
        })
    ], IframeViewerComponent);
    return IframeViewerComponent;
}());
exports.IframeViewerComponent = IframeViewerComponent;
