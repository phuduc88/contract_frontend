"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.SignatureFlowS3Component = void 0;
var core_1 = require("@angular/core");
var constant_1 = require("@app/shared/constant");
var event_emitter_1 = require("@app/shared/utils/event-emitter");
var $ = require("jquery");
require("jqueryui");
var drag_drop_1 = require("@angular/cdk/drag-drop");
var SignatureFlowS3Component = /** @class */ (function () {
    function SignatureFlowS3Component(authService, modalService) {
        this.authService = authService;
        this.modalService = modalService;
        this.height = 0;
        this.zoomX = 1;
        this.x = constant_1.SIGNATURE.X;
        this.y = constant_1.SIGNATURE.Y;
        this.objectSelect = null;
        this.canvasFs = [];
        this.selectedSignature = {};
        this.isDisplay = false;
    }
    SignatureFlowS3Component.prototype.ngOnInit = function () {
        var _this = this;
        this.currentUser = this.authService.currentCredentials;
        this.handlers = [
            event_emitter_1.eventEmitter.on("sign:add", function (sign) {
                _this.addSignToDoc(sign);
            }),
            event_emitter_1.eventEmitter.on("sign:clear-properties", function () {
                _this.clearProperties();
            }),
            event_emitter_1.eventEmitter.on("sign:set-properties", function (obj) {
                _this.setProperties(obj);
            }),
            event_emitter_1.eventEmitter.on("sign:remove", function (sign) {
                _this.removeSign(sign);
            }),
            event_emitter_1.eventEmitter.on("sign:NotEmailAssignment", function () {
                _this.modalService.warning({ nzTitle: "Vui lòng chọn người ký !" });
            }),
        ];
    };
    SignatureFlowS3Component.prototype.addSignToDoc = function (sign) {
        if (!this.documentSign.listSign || this.documentSign.listSign.length == 0) {
            this.documentSign.listSign = [];
            this.documentSign.listSign.push(sign);
            return;
        }
        var currentSign = this.documentSign.listSign.find(function (signed) { return signed.privateId == sign.privateId; });
        if (!currentSign) {
            this.documentSign.listSign.push(sign);
            return;
        }
    };
    SignatureFlowS3Component.prototype.removeSign = function (sign) {
        var listSign = this.documentSign.listSign;
        if (listSign && listSign.length > 0) {
            listSign.forEach(function (item, index) {
                if (sign.privateId == item.privateId) {
                    listSign.splice(index, 1);
                }
            });
        }
    };
    SignatureFlowS3Component.prototype.signSelected = function (sign) {
        event_emitter_1.eventEmitter.emit("sign:selection", sign);
    };
    SignatureFlowS3Component.prototype.clearProperties = function () {
        var _this = this;
        setTimeout(function () {
            _this.isDisplay = false;
            _this.selectedSignature = new Object();
        }, 10);
    };
    SignatureFlowS3Component.prototype.setProperties = function (obj) {
        var _this = this;
        setTimeout(function () {
            _this.isDisplay = true;
            _this.selectedSignature = obj;
            if (obj.isUpdate) {
                _this.updateLocationOfSign(obj);
            }
        }, 10);
    };
    SignatureFlowS3Component.prototype.closeSignatureProperties = function () {
        this.isDisplay = false;
    };
    SignatureFlowS3Component.prototype.changeEmailAssignment = function (emailAssignment) {
        event_emitter_1.eventEmitter.emit("sign:changeEmailAssignment", emailAssignment);
    };
    SignatureFlowS3Component.prototype.updateLocationOfSign = function (currentSign) {
        var listSignCopy = __spreadArrays(this.documentSign.listSign);
        listSignCopy.forEach(function (item) {
            if (item.privateId == currentSign.privateId) {
                item.coordinateY = currentSign.top;
                item.coordinateX = currentSign.left;
                item.page = currentSign.page;
                item.scale = currentSign.scaleX;
            }
        });
        this.documentSign.listSign = listSignCopy;
    };
    SignatureFlowS3Component.prototype.ngAfterViewInit = function () {
        // Init drag for Signature Image
        $(constant_1.SIGNATURE.SELECTOR.ObjDragToViewer).draggable({
            cursor: "move",
            containment: $(constant_1.SIGNATURE.SELECTOR.Containment),
            helper: "clone",
            drag: function (e) {
                var parent = e.target["offsetParent"];
                if (parent) {
                    $(parent).addClass("width");
                }
            }
        });
    };
    SignatureFlowS3Component.prototype.drop = function (event) {
        drag_drop_1.moveItemInArray(this.documentSign.listSign, event.previousIndex, event.currentIndex);
    };
    SignatureFlowS3Component.prototype.ngOnDestroy = function () {
        event_emitter_1.eventEmitter.destroy(this.handlers);
    };
    __decorate([
        core_1.Input()
    ], SignatureFlowS3Component.prototype, "documentSign");
    SignatureFlowS3Component = __decorate([
        core_1.Component({
            selector: "signature-flow-s3",
            templateUrl: "./signature-flow-s3.component.html",
            styleUrls: ["signature-flow-s3.component.less"]
        })
    ], SignatureFlowS3Component);
    return SignatureFlowS3Component;
}());
exports.SignatureFlowS3Component = SignatureFlowS3Component;
