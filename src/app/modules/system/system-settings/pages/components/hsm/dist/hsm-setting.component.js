"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HsmSettingFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var HsmSettingFormComponent = /** @class */ (function () {
    function HsmSettingFormComponent(formBuilder) {
        this.formBuilder = formBuilder;
    }
    HsmSettingFormComponent.prototype.ngOnInit = function () {
        this.loadForm();
    };
    HsmSettingFormComponent.prototype.ngOnDestroy = function () { };
    HsmSettingFormComponent.prototype.loadForm = function () {
        this.formHsmSetting = this.formBuilder.group({
            supplier: ["", forms_1.Validators.required],
            service: ["", forms_1.Validators.required],
            parameterConnect: [""],
            active: [""]
        });
    };
    HsmSettingFormComponent.prototype.save = function () {
        for (var i in this.formHsmSetting.controls) {
            this.formHsmSetting.controls[i].markAsDirty();
            this.formHsmSetting.controls[i].updateValueAndValidity();
        }
        if (this.formHsmSetting.invalid) {
            return;
        }
    };
    HsmSettingFormComponent = __decorate([
        core_1.Component({
            selector: "app-hsm-setting-form",
            templateUrl: "./hsm-setting.component.html",
            styleUrls: ["./hsm-setting.component.less"]
        })
    ], HsmSettingFormComponent);
    return HsmSettingFormComponent;
}());
exports.HsmSettingFormComponent = HsmSettingFormComponent;
