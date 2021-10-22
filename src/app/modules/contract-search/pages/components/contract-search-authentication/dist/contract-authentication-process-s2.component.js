"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.ContractAuthenticationProcessS2Component = void 0;
var core_1 = require("@angular/core");
var constant_1 = require("@app/shared/constant");
var event_emitter_1 = require("@app/shared/utils/event-emitter");
var $ = require("jquery");
require("jqueryui");
var drag_drop_1 = require("@angular/cdk/drag-drop");
var components_1 = require("@app/shared/components");
var ContractAuthenticationProcessS2Component = /** @class */ (function () {
    function ContractAuthenticationProcessS2Component(authService, modalService, signFlowService, route) {
        this.authService = authService;
        this.modalService = modalService;
        this.signFlowService = signFlowService;
        this.route = route;
        this.isAuthentication = false;
        this.documentSignCustom = null;
        this.height = 0;
        this.zoomX = 1;
        this.x = constant_1.SIGNATURE.X;
        this.y = constant_1.SIGNATURE.Y;
        this.objectSelect = null;
        this.canvasFs = [];
        this.selectedSignature = {};
        this.isDisplay = false;
        this.isContractSearch = true;
    }
    ContractAuthenticationProcessS2Component.prototype.getParameterByName = function (name) {
        var url = window.location.href;
        name = name.replace(/[[]]/g, "$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return "";
        }
        return decodeURIComponent(results[2].replace("/+/g", " "));
    };
    ContractAuthenticationProcessS2Component.prototype.ngOnInit = function () {
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
            event_emitter_1.eventEmitter.on("authentication:approve", function () {
                _this.approve();
            }),
            event_emitter_1.eventEmitter.on("authentication:refuseApprove", function () {
                _this.refuseApprove();
            }),
            event_emitter_1.eventEmitter.on("authentication:sign", function () {
                _this.sign();
            }),
            event_emitter_1.eventEmitter.on("authentication:refuseSign", function () {
                _this.refuseSign();
            }),
        ];
        this.id = this.getParameterByName("s");
        this.signFlowService.getDetail(this.id || "1104").subscribe(function (data) {
            _this.documentSignCustom = data;
            var listSign = [
                {
                    page: 4,
                    coordinateY: 1110.1092965262283,
                    coordinateX: 171.3839067731585,
                    signType: 1,
                    height: 160,
                    width: 328,
                    privateId: "7fea5454-82cd-456c-9177-06c171726e63",
                    signIndex: 3,
                    emailAssignment: "phucduc88@gmail.com",
                    scaleX: 1,
                    scaleY: 1,
                    img: { url: "/assets/img/pdfjs/sign-icon.svg" },
                    isinitial: false,
                    name: "mauhopdongminvoicekhachhang1.pdf",
                    fileSignId: 2137,
                    scale: 1
                },
            ];
            _this.documentSign = __assign(__assign({}, _this.documentSignCustom), { listSign: listSign });
        });
    };
    ContractAuthenticationProcessS2Component.prototype.addSignToDoc = function (sign) {
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
    ContractAuthenticationProcessS2Component.prototype.removeSign = function (sign) {
        var listSign = this.documentSign.listSign;
        if (listSign && listSign.length > 0) {
            listSign.forEach(function (item, index) {
                if (sign.privateId == item.privateId) {
                    listSign.splice(index, 1);
                }
            });
        }
    };
    ContractAuthenticationProcessS2Component.prototype.signSelected = function (sign) {
        event_emitter_1.eventEmitter.emit("sign:selection", sign);
    };
    ContractAuthenticationProcessS2Component.prototype.clearProperties = function () {
        var _this = this;
        setTimeout(function () {
            _this.isDisplay = false;
            _this.selectedSignature = new Object();
        }, 10);
    };
    ContractAuthenticationProcessS2Component.prototype.setProperties = function (obj) {
        var _this = this;
        setTimeout(function () {
            _this.isDisplay = true;
            _this.selectedSignature = obj;
            if (obj.isUpdate) {
                _this.updateLocationOfSign(obj);
            }
        }, 10);
    };
    ContractAuthenticationProcessS2Component.prototype.closeSignatureProperties = function () {
        this.isDisplay = false;
    };
    ContractAuthenticationProcessS2Component.prototype.changeEmailAssignment = function (emailAssignment) {
        event_emitter_1.eventEmitter.emit("sign:changeEmailAssignment", emailAssignment);
    };
    ContractAuthenticationProcessS2Component.prototype.updateLocationOfSign = function (currentSign) {
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
    ContractAuthenticationProcessS2Component.prototype.ngAfterViewInit = function () {
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
    ContractAuthenticationProcessS2Component.prototype.drop = function (event) {
        drag_drop_1.moveItemInArray(this.documentSign.listSign, event.previousIndex, event.currentIndex);
    };
    ContractAuthenticationProcessS2Component.prototype.authentication = function () {
        this.isAuthentication = !this.isAuthentication;
    };
    ContractAuthenticationProcessS2Component.prototype.goBack = function () { };
    ContractAuthenticationProcessS2Component.prototype.approve = function () {
        this.confirmModal = this.modalService.confirm({
            nzTitle: "BẠN CÓ CHĂC MUỐN PHÊ DUYỆT HỢP ĐỒNG NÀY ?",
            nzOkText: "CÓ",
            nzCancelText: "KHÔNG",
            nzClosable: false,
            nzClassName: "approve-modal",
            nzOnOk: function () {
                alert("OK");
            }
        });
    };
    ContractAuthenticationProcessS2Component.prototype.refuseApprove = function () {
        this.confirmModal = this.modalService.create({
            nzClosable: true,
            nzTitle: "Từ chối phê duyệt",
            nzClassName: "refuse-approve-custom",
            nzContent: components_1.RefuseSearchComponent,
            nzOnOk: function (data) { return console.log("Click ok", data); },
            nzComponentParams: {},
            nzFooter: []
        });
    };
    ContractAuthenticationProcessS2Component.prototype.sign = function () {
        this.confirmModal = this.modalService.create({
            nzClosable: true,
            nzTitle: "Loại chữ ký số",
            nzClassName: "sign-contract-custom",
            nzContent: components_1.SignContractComponent,
            nzOnOk: function (data) { return console.log("Click ok", data); },
            nzComponentParams: {},
            nzFooter: []
        });
    };
    ContractAuthenticationProcessS2Component.prototype.refuseSign = function () {
        this.confirmModal = this.modalService.create({
            nzClosable: true,
            nzTitle: "Từ chối ký duyệt",
            nzClassName: "refuse-sign-custom",
            nzContent: components_1.RefuseSearchComponent,
            nzOnOk: function (data) { return console.log("Click ok", data); },
            nzComponentParams: {},
            nzFooter: []
        });
    };
    ContractAuthenticationProcessS2Component.prototype.ngOnDestroy = function () {
        event_emitter_1.eventEmitter.destroy(this.handlers);
    };
    __decorate([
        core_1.Input()
    ], ContractAuthenticationProcessS2Component.prototype, "documentSign");
    ContractAuthenticationProcessS2Component = __decorate([
        core_1.Component({
            selector: "app-contract-authentication-process-s2",
            templateUrl: "./contract-authentication-process-s2.component.html",
            styleUrls: ["./contract-authentication-process-s2.component.less"]
        })
    ], ContractAuthenticationProcessS2Component);
    return ContractAuthenticationProcessS2Component;
}());
exports.ContractAuthenticationProcessS2Component = ContractAuthenticationProcessS2Component;
