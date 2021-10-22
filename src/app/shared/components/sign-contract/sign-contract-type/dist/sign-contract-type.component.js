"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignContractTypeComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var constant_1 = require("@app/shared/constant");
var rxjs_1 = require("rxjs");
var event_emitter_1 = require("@app/shared/utils/event-emitter");
var SignContractTypeComponent = /** @class */ (function () {
    function SignContractTypeComponent(formBuilder, msg) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.msg = msg;
        this.loading = false;
        this.beforeUpload = function (file, _fileList) {
            return new rxjs_1.Observable(function (observer) {
                var isJpgOrPng = file.type === "image/jpeg" ||
                    file.type === "image/png" ||
                    file.type === "image/jpg";
                if (!isJpgOrPng) {
                    _this.msg.error("Bạn chỉ có thể tải lên ảnh");
                    observer.complete();
                    return;
                }
                var isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    _this.msg.error("Kích thước ảnh nhỏ hơn 2 MB");
                    observer.complete();
                    return;
                }
                observer.next(isJpgOrPng && isLt2M);
                observer.complete();
            });
        };
    }
    SignContractTypeComponent.prototype.ngOnInit = function () {
        this.signTypeForm = this.formBuilder.group({
            mobile: [
                "",
                [forms_1.Validators.required, forms_1.Validators.pattern(constant_1.REGEX.PHONE_NUMBER)],
            ],
            uploadType: ["usbToken"],
            typeValue: ["SIM"]
        });
    };
    Object.defineProperty(SignContractTypeComponent.prototype, "typeValue", {
        get: function () {
            return this.signTypeForm.controls.typeValue.value;
        },
        enumerable: false,
        configurable: true
    });
    SignContractTypeComponent.prototype.ngOnDestroy = function () { };
    SignContractTypeComponent.prototype.save = function () { };
    SignContractTypeComponent.prototype.getBase64 = function (img, callback) {
        var reader = new FileReader();
        reader.addEventListener("load", function () { return callback(reader.result.toString()); });
        reader.readAsDataURL(img);
    };
    SignContractTypeComponent.prototype.handleChange = function (info) {
        var _this = this;
        switch (info.file.status) {
            case "uploading":
                this.loading = true;
                break;
            default:
                this.getBase64(info.file.originFileObj, function (img) {
                    _this.loading = false;
                    _this.avatarUrl = img;
                    event_emitter_1.eventEmitter.emit("sign:changeImage", {
                        imgUrl: img,
                        imgType: info.file.type
                    });
                });
                break;
        }
    };
    SignContractTypeComponent = __decorate([
        core_1.Component({
            selector: "app-sign-contract-type",
            templateUrl: "./sign-contract-type.component.html",
            styleUrls: ["./sign-contract-type.component.less"]
        })
    ], SignContractTypeComponent);
    return SignContractTypeComponent;
}());
exports.SignContractTypeComponent = SignContractTypeComponent;
