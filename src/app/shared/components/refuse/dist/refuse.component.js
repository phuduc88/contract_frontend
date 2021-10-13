"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RefuseComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var RefuseComponent = /** @class */ (function () {
    function RefuseComponent(formBuilder) {
        this.formBuilder = formBuilder;
    }
    RefuseComponent.prototype.ngOnInit = function () {
        this.loadForm();
    };
    RefuseComponent.prototype.ngOnDestroy = function () { };
    RefuseComponent.prototype.loadForm = function () {
        this.formRefuse = this.formBuilder.group({
            reason: ["", forms_1.Validators.required]
        });
    };
    RefuseComponent.prototype.save = function () {
        for (var i in this.formRefuse.controls) {
            this.formRefuse.controls[i].markAsDirty();
            this.formRefuse.controls[i].updateValueAndValidity();
        }
        if (this.formRefuse.invalid) {
            return;
        }
    };
    RefuseComponent = __decorate([
        core_1.Component({
            selector: "app-refuse",
            templateUrl: "./refuse.component.html",
            styleUrls: ["./refuse.component.less"]
        })
    ], RefuseComponent);
    return RefuseComponent;
}());
exports.RefuseComponent = RefuseComponent;
