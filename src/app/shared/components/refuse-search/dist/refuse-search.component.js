"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RefuseSearchComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var RefuseSearchComponent = /** @class */ (function () {
    function RefuseSearchComponent(formBuilder) {
        this.formBuilder = formBuilder;
    }
    RefuseSearchComponent.prototype.ngOnInit = function () {
        this.loadForm();
    };
    RefuseSearchComponent.prototype.ngOnDestroy = function () { };
    RefuseSearchComponent.prototype.loadForm = function () {
        this.formRefuse = this.formBuilder.group({
            reason: ["", forms_1.Validators.required]
        });
    };
    RefuseSearchComponent.prototype.save = function () {
        for (var i in this.formRefuse.controls) {
            this.formRefuse.controls[i].markAsDirty();
            this.formRefuse.controls[i].updateValueAndValidity();
        }
        if (this.formRefuse.invalid) {
            return;
        }
    };
    RefuseSearchComponent = __decorate([
        core_1.Component({
            selector: "app-refuse-search",
            templateUrl: "./refuse-search.component.html",
            styleUrls: ["./refuse-search.component.less"]
        })
    ], RefuseSearchComponent);
    return RefuseSearchComponent;
}());
exports.RefuseSearchComponent = RefuseSearchComponent;
