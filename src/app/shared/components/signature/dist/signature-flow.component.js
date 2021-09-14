"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignatureFlowComponent = void 0;
var core_1 = require("@angular/core");
var constant_1 = require("@app/shared/constant");
var $ = require("jquery");
require("jqueryui");
var dialog_error_component_1 = require("../dialog-error/dialog-error.component");
var event_emitter_1 = require("@app/shared/utils/event-emitter");
var sign_1 = require("@app/shared/utils/sign");
var signature_flow_save_component_1 = require("./signature-save/signature-flow-save.component");
var SignatureFlowComponent = /** @class */ (function () {
    function SignatureFlowComponent(modal, modalService, signatureFlowService, authService, threadGroupService, threadedSignTemplateService, documentTypeService) {
        this.modal = modal;
        this.modalService = modalService;
        this.signatureFlowService = signatureFlowService;
        this.authService = authService;
        this.threadGroupService = threadGroupService;
        this.threadedSignTemplateService = threadedSignTemplateService;
        this.documentTypeService = documentTypeService;
        this.formEmployeesSignError = [];
        this.ListMailRoot = [];
        this.documentsType = [];
    }
    SignatureFlowComponent.prototype.ngOnInit = function () {
        this.currentUser = this.authService.currentCredentials;
        if (this.documentSign && this.documentSign.id) {
            // load sign from document history
            this.loadDocumentFromHistory();
            this.loadSelectedEmail();
        }
        this.loadDocumentType();
        this.loadThreadGroup();
    };
    SignatureFlowComponent.prototype.ngAfterViewInit = function () {
        if (!this.documentSign.myselfSign && this.documentSign.emailAssignment) {
            event_emitter_1.eventEmitter.emit("sign:changeEmailAssignment", this.documentSign.emailAssignment);
        }
    };
    SignatureFlowComponent.prototype.loadSelectedEmail = function () {
        // load email assign
        if (this.documentSign.myselfSign) {
            this.documentSign.emailAssignment = this.currentUser.email;
            return;
        }
        if (this.documentSign.employeesSign.length > 0) {
            this.documentSign.emailAssignment =
                this.documentSign.employeesSign[0].email;
        }
    };
    SignatureFlowComponent.prototype.loadDocumentFromHistory = function () {
        var _this = this;
        var listEmployeeSign = this.documentSign.employeesSign;
        this.documentSign.listSign = [];
        if (listEmployeeSign.length === 0) {
            return;
        }
        var filesSign = this.documentSign.filesSign;
        var currentFileId = filesSign.length > 0 ? filesSign[0].id : 0;
        if (currentFileId < 1) {
            return;
        }
        listEmployeeSign.forEach(function (employee) {
            if (employee.employeesSignDetail &&
                employee.employeesSignDetail.length > 0) {
                employee.employeesSignDetail.forEach(function (sign) {
                    var file = _this.getFileName(filesSign, sign.fileSignId);
                    sign.name = file.fileName;
                    sign.img = _this.getImage(sign);
                    sign.emailAssignment = employee.email;
                    (sign.privateId = sign_1["default"].createGuid()),
                        _this.documentSign.listSign.push(sign);
                });
            }
        });
    };
    SignatureFlowComponent.prototype.getImage = function (sign) {
        if (!this.documentSign.myselfSign) {
            return this.generateImageByType(sign.signType);
        }
        var currentSign = this.currentUser.signatureImage;
        var img = document.createElement("img");
        img.src = sign_1["default"].convertBase64ToImage(this.currentUser.signatureImage);
        var option = {
            width: sign.width,
            height: sign.height
        };
        sign_1["default"].resize2img(img, option, "png", function (result) {
            img.src = result;
        });
        return img;
    };
    SignatureFlowComponent.prototype.generateImageByType = function (type) {
        var img = document.createElement("img");
        img.src =
            type == 1
                ? "/assets/img/pdfjs/sign-icon.svg"
                : "/assets/img/pdfjs/signimage.svg";
        return img;
    };
    SignatureFlowComponent.prototype.getFileName = function (documents, fileSignId) {
        var fileTemp = documents.find(function (file) { return file.id == fileSignId; });
        return fileTemp;
    };
    SignatureFlowComponent.prototype.ngOnChanges = function (changes) {
        if (changes.documentSign &&
            changes.documentSign.currentValue &&
            changes.documentSign.currentValue.length) {
            this.documentSign = changes.documentSign.currentValue;
        }
    };
    SignatureFlowComponent.prototype.changeFilesUpload = function (_a) {
        var filesSign = _a.filesSign, documentId = _a.documentId;
        this.documentSign.id = documentId;
        this.documentSign.filesSign = filesSign;
    };
    SignatureFlowComponent.prototype.addEmployeeSing = function (formVale) {
        if (formVale.validForm.length > 0) {
            this.showDialogError(formVale.validForm);
            return;
        }
        var employeesSign = formVale.employeesSign;
        employeesSign.push(this.addEmployeeSignBlank());
        this.documentSign.employeesSign = employeesSign;
    };
    SignatureFlowComponent.prototype.onChangeThreadGroup = function (threadGroupId) {
        var _this = this;
        this.documentSign.threadGroupId = threadGroupId;
        if (!threadGroupId) {
            this.documentSign.employeesSign = [this.addEmployeeSignBlank()];
            return;
        }
        this.threadedSignTemplateService
            .filter({
            threadGroupId: threadGroupId
        })
            .subscribe(function (result) {
            _this.documentSign.employeesSign = [];
            result.data.forEach(function (item) {
                item.id = null;
                _this.documentSign.employeesSign.push(item);
            });
        });
    };
    SignatureFlowComponent.prototype.showDialogError = function (errorsData) {
        this.modalService.create({
            nzClosable: true,
            nzTitle: "Lỗi thông tin người ký",
            nzClassName: "signature-pad-custom",
            nzContent: dialog_error_component_1.DialogErrorComponent,
            nzOnOk: function (data) { return console.log("Click ok", data); },
            nzComponentParams: {
                errorsData: errorsData
            }
        });
    };
    SignatureFlowComponent.prototype.addEmployeeSignBlank = function () {
        return {
            name: null,
            groupName: null,
            groupType: constant_1.GROUP_TYPE.HSMUSB,
            receptionEmail: false,
            receptionFileCopy: false,
            address: null,
            idNumer: null,
            phoneNumber: null,
            email: null,
            taxCode: null,
            orders: 1,
            orderSign: 1
        };
    };
    SignatureFlowComponent.prototype.ngOnDestroy = function () { };
    SignatureFlowComponent.prototype.closeModal = function () {
        var _this = this;
        if (this.documentSign.filesSign.length < 1) {
            this.modal.destroy();
            return;
        }
        var modalConfirm = this.modalService.create({
            nzTitle: '<i class="fa fa-question-circle" aria-hidden="true"></i></i>Bạn có muốn lưu bản nháp không?',
            nzContent: "Những thay đổi của bạn sẽ bị mất nếu bạn không lưu lại",
            nzIconType: "anticon-question-circle",
            nzFooter: [
                {
                    label: "Lưu và đóng",
                    type: "primary",
                    shape: "round",
                    onClick: function () {
                        _this.isSaveFile = true;
                        _this.showPreviewRequestSign();
                        modalConfirm.destroy();
                        _this.modal.destroy();
                    }
                },
                {
                    label: "Không cần lưu",
                    type: "primary",
                    shape: "round",
                    onClick: function () {
                        modalConfirm.destroy();
                        _this.modal.destroy();
                    }
                },
                {
                    label: "Bỏ qua",
                    shape: "round",
                    onClick: function () { return modalConfirm.destroy(); }
                },
            ]
        });
    };
    SignatureFlowComponent.prototype.prevStep = function () {
        this.documentSign.currentStep =
            this.documentSign.currentStep == constant_1.STEP.THREE &&
                this.documentSign.myselfSign
                ? constant_1.STEP.ONE
                : (this.documentSign.currentStep || constant_1.STEP.ONE) - 1;
        this.documentSign.CurrentDoc = {};
        this.documentSign.CurrentDoc.SIGN = [];
        this.documentSign.listSign = [];
        $(constant_1.SIGNATURE.SELECTOR.ContentViewer).html("");
    };
    SignatureFlowComponent.prototype.nextStep = function () {
        if (this.documentSign.filesSign.length == 0) {
            this.modalService.warning({
                nzTitle: "Vui lòng tải file lên trước khi ký!"
            });
            return;
        }
        if ((this.documentSign.currentStep || constant_1.STEP.ONE) === constant_1.STEP.ONE &&
            this.documentSign.myselfSign) {
            this.addCurrenUseToEmployeesSign();
            this.documentSign.currentStep = constant_1.STEP.THREE;
            this.documentSign.emailAssignment = this.currentUser.email;
            this.saveStep2();
            return;
        }
        if ((this.documentSign.currentStep || constant_1.STEP.ONE) === constant_1.STEP.ONE &&
            !this.documentSign.myselfSign) {
            if (!this.documentSign.employeesSign ||
                this.documentSign.employeesSign.length === 0) {
                this.documentSign.employeesSign.push(this.addEmployeeSignBlank());
            }
        }
        if ((this.documentSign.currentStep || constant_1.STEP.ONE) === constant_1.STEP.TWO &&
            !this.documentSign.myselfSign) {
            // Emit event valid employeeSing
            this.validFormEmployeeSign();
        }
        if (this.formEmployeesSignError.length > 0) {
            this.showDialogError(this.formEmployeesSignError);
            return;
        }
        this.documentSign.currentStep = this.documentSign.currentStep + 1;
    };
    SignatureFlowComponent.prototype.saveStep2 = function () {
        var _this = this;
        this.signatureFlowService
            .employeeSign(this.documentSign)
            .subscribe(function (res) {
            _this.documentSign = res;
            if (!_this.documentSign.listSign) {
                _this.documentSign.listSign = [];
            }
        });
    };
    SignatureFlowComponent.prototype.addCurrenUseToEmployeesSign = function () {
        this.documentSign.employeesSign = [
            {
                name: this.currentUser.username,
                groupName: this.currentUser.username,
                groupType: constant_1.GROUP_TYPE.HSMUSB,
                receptionEmail: true,
                receptionFileCopy: true,
                address: "",
                idNumer: "",
                phoneNumber: "",
                email: this.currentUser.email,
                taxCode: "",
                orders: 1,
                orderSign: 1
            },
        ];
    };
    SignatureFlowComponent.prototype.showPreviewRequestSign = function () {
        var _this = this;
        if (this.documentSign.employeesSign) {
            this.documentSign.employeesSign.forEach(function (employee) {
                employee.employeesSignDetail = _this.getSignByEmailAssignment(employee.email);
            });
            // this.serviceSignPosition();
            this.modalService.create({
                nzClosable: true,
                nzMaskClosable: false,
                nzTitle: "Xem lại và gửi",
                nzStyle: { top: 0 },
                nzClassName: "signature-flow-save",
                nzKeyboard: false,
                nzContent: signature_flow_save_component_1.SignatureFlowSaveComponent,
                nzOnOk: function () { return new Promise(function (resolve) { return setTimeout(resolve, 1000); }); },
                nzFooter: [],
                nzComponentParams: {
                    documentSign: this.documentSign
                }
            });
        }
    };
    SignatureFlowComponent.prototype.getSignByEmailAssignment = function (emailAssignment) {
        return this.documentSign.listSign.filter(function (sign) { return sign.emailAssignment == emailAssignment; });
    };
    // complete
    SignatureFlowComponent.prototype.requestSign = function () {
        if (this.documentSign.employeesSign) {
            var employee = this.documentSign.employeesSign[0];
            employee.employeesSignDetail = this.getSignByEmailAssignment(employee.email);
            this.serviceSignPosition();
        }
    };
    SignatureFlowComponent.prototype.serviceSignPosition = function () {
        var _this = this;
        this.signatureFlowService
            .signaturePosition(this.documentSign)
            .subscribe(function (res) {
            if (res) {
                if (!_this.isSaveFile) {
                    _this.modalService.success({ nzTitle: "Ký file thành công!" });
                }
                else {
                    _this.modalService.success({ nzTitle: "Lưu file thành công!" });
                }
                _this.modal.destroy();
            }
        });
    };
    SignatureFlowComponent.prototype.loadDocumentType = function () {
        var _this = this;
        this.documentTypeService.filter().subscribe(function (item) {
            _this.documentsType = item.data;
        });
    };
    SignatureFlowComponent.prototype.loadThreadGroup = function () {
        var _this = this;
        this.threadGroupService.filter().subscribe(function (item) {
            _this.threadGroups = item.data;
        });
    };
    //handlers event valid on the form employee sign;
    SignatureFlowComponent.prototype.formEmployeeSingValid = function (formValue) {
        if (formValue.validForm.length > 0) {
            this.formEmployeesSignError = formValue.validForm;
            return;
        }
        this.formEmployeesSignError = [];
        this.documentSign.employeesSign = formValue.employeesSign;
        this.saveStep2();
    };
    //Emit event valid employeeSing
    SignatureFlowComponent.prototype.validFormEmployeeSign = function () {
        event_emitter_1.eventEmitter.emit("employeeSing:validFrom", {
            action: "set_2"
        });
    };
    __decorate([
        core_1.Input()
    ], SignatureFlowComponent.prototype, "documentSign");
    SignatureFlowComponent = __decorate([
        core_1.Component({
            selector: "signature-flow",
            templateUrl: "./signature-flow.component.html",
            styleUrls: ["signature-flow.component.less"]
        })
    ], SignatureFlowComponent);
    return SignatureFlowComponent;
}());
exports.SignatureFlowComponent = SignatureFlowComponent;
