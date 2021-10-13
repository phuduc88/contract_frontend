"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PreviewImageComponent = void 0;
var core_1 = require("@angular/core");
var carousel_1 = require("ng-zorro-antd/carousel");
var PreviewImageComponent = /** @class */ (function () {
    function PreviewImageComponent() {
    }
    PreviewImageComponent.prototype.ngOnInit = function () { };
    PreviewImageComponent.prototype.prevSlide = function () {
        this.carouselCustomer.pre();
    };
    PreviewImageComponent.prototype.nextSlide = function () {
        this.carouselCustomer.next();
    };
    PreviewImageComponent.prototype.gotoSlice = function (i) {
        this.carouselCustomer.goTo(Number(i));
    };
    PreviewImageComponent.prototype.ngOnDestroy = function () { };
    __decorate([
        core_1.ViewChild(carousel_1.NzCarouselComponent, { static: false })
    ], PreviewImageComponent.prototype, "carouselCustomer");
    __decorate([
        core_1.Input()
    ], PreviewImageComponent.prototype, "imgList");
    PreviewImageComponent = __decorate([
        core_1.Component({
            selector: "app-preview-image",
            templateUrl: "./preview-image.component.html",
            styleUrls: ["./preview-image.component.less"]
        })
    ], PreviewImageComponent);
    return PreviewImageComponent;
}());
exports.PreviewImageComponent = PreviewImageComponent;
