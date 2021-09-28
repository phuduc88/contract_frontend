"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ManageTemplateDocumentsComponent = void 0;
var core_1 = require("@angular/core");
var components_1 = require("@app/shared/components");
var constant_1 = require("@app/shared/constant");
var download_file_1 = require("@app/shared/utils/download-file");
var ManageTemplateDocumentsComponent = /** @class */ (function () {
    function ManageTemplateDocumentsComponent(modalService, documentTemplateService, documentTemplateDataService) {
        this.modalService = modalService;
        this.documentTemplateService = documentTemplateService;
        this.documentTemplateDataService = documentTemplateDataService;
        this.currentStep = 1;
        this.overloading = false;
        this.selectedPage = 1;
        this.parentStyle = {};
        this.error = [];
    }
    ManageTemplateDocumentsComponent.prototype.ngOnInit = function () {
        this.getDocumentTemplate();
    };
    ManageTemplateDocumentsComponent.prototype.handleChangeFileTemplate = function (_a) {
        var file = _a.file, goStep = _a.goStep;
        this.changeFileSuccess(file, goStep);
    };
    ManageTemplateDocumentsComponent.prototype.handleGoBack = function (_a) {
        var goStep = _a.goStep;
        this.currentStep = goStep;
        if (this.currentStep === 1) {
            this.getDocumentTemplate(this.skip);
        }
        if (this.currentStep === 2) {
            this.documentTemplate.documentData = [];
        }
    };
    ManageTemplateDocumentsComponent.prototype.changeFileSuccess = function (file, goStep) {
        var _this = this;
        this.overloading = true;
        this.parentStyle = {
            "z-index": 99999,
            opacity: 0.3
        };
        setTimeout(function () {
            _this.documentTemplateService.uploadContract(file.target.files).subscribe(function (res) {
                _this.error = res.error;
                if (_this.error.length > 0) {
                    _this.showDialogError(_this.error);
                }
                else {
                    _this.currentStep = goStep;
                    _this.documentTemplate = res.result;
                }
                _this.overloading = false;
                _this.parentStyle = {};
            });
        }, 200);
    };
    ManageTemplateDocumentsComponent.prototype.showDialogError = function (errors) {
        this.modalService.create({
            nzClosable: true,
            nzTitle: 'Lỗi upload thông tin mẫu hợp đồng',
            nzClassName: "signature-pad-custom",
            nzContent: components_1.DialogUploadTemplateErrorComponent,
            nzOnOk: function (data) { return console.log('Click ok', data); },
            nzComponentParams: {
                errors: errors
            }
        });
    };
    ManageTemplateDocumentsComponent.prototype.handleUploadFileBookmark = function (data) {
        var _this = this;
        this.documentTemplateService.uploadFileData(this.documentTemplate.id, data.file.target.files).subscribe(function (res) {
            _this.error = res.error;
            if (_this.error.length > 0) {
                _this.showDialogError(_this.error);
            }
            else {
                _this.currentStep = data.goStep;
                _this.documentTemplate = res.result;
                _this.documentTemplate.dataBookmarks = _this.builObject(res.result.documentData);
            }
            _this.overloading = false;
            _this.parentStyle = {};
        });
    };
    ManageTemplateDocumentsComponent.prototype.handleSaveChangeDataUpload = function (data) {
        var _this = this;
        this.overloading = true;
        this.parentStyle = {
            "z-index": 99999,
            opacity: 0.3
        };
        this.documentTemplateService.updateDataImport(data.documentTemplate.id, data.documentTemplate).subscribe(function (res) {
            _this.error = res.error;
            if (_this.error.length > 0) {
                _this.showDialogError(_this.error);
            }
            else {
                _this.currentStep = data.goStep;
                console.log(res.result);
                _this.documentTemplate = res.result;
            }
            _this.overloading = false;
            _this.parentStyle = {};
        });
    };
    ManageTemplateDocumentsComponent.prototype.builObject = function (documentData) {
        var dataBookmarks = [];
        documentData.forEach(function (item) {
            var itemBookmark = {
                recordUpLoad: item.recordUpLoad,
                originFileName: item.originFileName
            };
            item.rows.forEach(function (row) {
                itemBookmark[row.name] = row.value;
            });
            dataBookmarks.push(itemBookmark);
        });
        return dataBookmarks;
    };
    ManageTemplateDocumentsComponent.prototype.handleDownloadFileTemplateBookmark = function (data) {
        var _this = this;
        this.overloading = true;
        this.documentTemplateService.downloadExcelBookmark(data.id).then(function (response) {
            var subfixFile = '.xlsx';
            var fileName = "B2.D\u1EEF li\u1EC7u bookmarks t\u1EC7p " + _this.documentTemplate.fileName + subfixFile;
            var mimeType = _this.getMimeType(subfixFile);
            download_file_1.download(fileName, response, mimeType);
            _this.overloading = false;
        });
    };
    ManageTemplateDocumentsComponent.prototype.getMimeType = function (subfixFile) {
        var mimeType = constant_1.MIME_TYPE.find(function (d) { return d.key === subfixFile; });
        if (mimeType) {
            return mimeType.value;
        }
        return constant_1.MIME_TYPE[0].value;
    };
    ManageTemplateDocumentsComponent.prototype.ngOnDestroy = function () {
    };
    ManageTemplateDocumentsComponent.prototype.getDocumentTemplate = function (skip, take) {
        var _this = this;
        if (skip === void 0) { skip = 0; }
        if (take === void 0) { take = constant_1.PAGE_SIZE; }
        this.overloading = true;
        this.documentTemplateService.filter({
            skip: skip,
            take: take
        }).subscribe(function (res) {
            _this.documents = res.data;
            _this.total = res.total;
            _this.skip = skip;
            _this.documents.total = _this.total;
            _this.documents.take = take;
            _this.overloading = false;
            if (res.data.length === 0 && _this.selectedPage > 1) {
                _this.skip -= constant_1.PAGE_SIZE;
                _this.selectedPage -= 1;
                _this.getDocumentTemplate(_this.skip);
            }
        });
    };
    ManageTemplateDocumentsComponent.prototype.handlePageChange = function (_a) {
        var skip = _a.skip, page = _a.page;
        this.skip = skip;
        this.selectedPage = page;
        this.getDocumentTemplate(skip);
    };
    ManageTemplateDocumentsComponent.prototype.handleDelelete = function (_a) {
        var _this = this;
        var data = _a.data;
        this.documentTemplateService["delete"](data.id).subscribe(function () {
            _this.getDocumentTemplate(_this.skip);
        });
    };
    ManageTemplateDocumentsComponent.prototype.handleDownloadTemplate = function (_a) {
        var _this = this;
        var data = _a.data;
        this.overloading = true;
        this.documentTemplateService.downloadTemplate(data.id).then(function (response) {
            var subfixFile = '.docx';
            var fileName = data.originFileName;
            var mimeType = _this.getMimeType(subfixFile);
            download_file_1.download(fileName, response, mimeType);
            _this.overloading = false;
        });
    };
    ManageTemplateDocumentsComponent.prototype.handleDownloadBookmark = function (_a) {
        var _this = this;
        var data = _a.data;
        this.overloading = true;
        this.documentTemplateService.downloadExcelBookmark(data.id).then(function (response) {
            var subfixFile = '.xlsx';
            var fileName = "B2.D\u1EEF li\u1EC7u bookmarks t\u1EC7p " + data.originFileName + ".xlsx";
            var mimeType = _this.getMimeType(subfixFile);
            download_file_1.download(fileName, response, mimeType);
            _this.overloading = false;
        });
    };
    ManageTemplateDocumentsComponent.prototype.handleViewDetail = function (_a) {
        var _this = this;
        var data = _a.data;
        this.overloading = true;
        this.documentTemplateService.getDetail(data.id).subscribe(function (res) {
            _this.overloading = false;
            _this.currentStep = 2;
            _this.documentTemplate = res;
        });
    };
    ManageTemplateDocumentsComponent.prototype.handleDeleteBookmark = function (_a) {
        var _this = this;
        var data = _a.data;
        this.overloading = true;
        this.documentTemplateDataService["delete"](data.documentTemplateId, data.recordUpLoad).subscribe(function (res) {
            _this.overloading = false;
        });
    };
    ManageTemplateDocumentsComponent.prototype.handleDownloadTemplateBookmark = function (_a) {
        var _this = this;
        var data = _a.data;
        this.overloading = true;
        this.documentTemplateDataService.downloadDocument(data.documentTemplateId, data.recordUpLoad).then(function (response) {
            var subfixFile = '.pdf';
            var fileName = data.originFileName + "." + subfixFile;
            var mimeType = _this.getMimeType(subfixFile);
            download_file_1.download(fileName, response, mimeType);
            _this.overloading = false;
        });
    };
    ManageTemplateDocumentsComponent.prototype.handleQuickView = function (_a) {
        var _this = this;
        var data = _a.data;
        this.overloading = true;
        this.documentTemplateDataService.quickViewDocument(data.documentTemplateId, data.recordUpLoad).subscribe(function (res) {
            _this.overloading = false;
            console.log(res);
        });
    };
    ManageTemplateDocumentsComponent = __decorate([
        core_1.Component({
            selector: "app-manage-template-documents",
            templateUrl: "./manage-template-documents.component.html",
            styleUrls: ["./manage-template-documents.component.less"]
        })
    ], ManageTemplateDocumentsComponent);
    return ManageTemplateDocumentsComponent;
}());
exports.ManageTemplateDocumentsComponent = ManageTemplateDocumentsComponent;
