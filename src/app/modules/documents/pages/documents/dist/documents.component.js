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
exports.__esModule = true;
exports.DocumentsComponent = void 0;
var core_1 = require("@angular/core");
var components_1 = require("@app/shared/components");
var constant_1 = require("@app/shared/constant");
var download_file_1 = require("@app/shared/utils/download-file");
var DocumentsComponent = /** @class */ (function () {
    function DocumentsComponent(authService, modalService, signFlowService, viewContainerRef, documentTypeService, router) {
        this.authService = authService;
        this.modalService = modalService;
        this.signFlowService = signFlowService;
        this.viewContainerRef = viewContainerRef;
        this.documentTypeService = documentTypeService;
        this.router = router;
        this.selectedPage = 1;
        this.isSpinning = false;
        this.filter = {};
    }
    DocumentsComponent.prototype.ngOnInit = function () {
        this.currentUser = this.authService.currentCredentials;
        this.filterDocuments();
    };
    DocumentsComponent.prototype.filterDocuments = function (skip, take) {
        var _this = this;
        if (skip === void 0) { skip = 0; }
        if (take === void 0) { take = constant_1.PAGE_SIZE; }
        this.isSpinning = true;
        var paramSearch = __assign(__assign({}, this.filter), { skip: skip,
            take: take });
        this.signFlowService.filter(paramSearch)
            .subscribe(function (items) {
            _this.documents = items.data;
            _this.skip = skip;
            _this.documents.total = items.total;
            _this.documents.take = take;
            _this.isSpinning = false;
            if (items.data.length === 0 && _this.selectedPage > 1) {
                _this.skip -= constant_1.PAGE_SIZE;
                _this.selectedPage -= 1;
                _this.filterDocuments(_this.skip);
            }
        });
    };
    DocumentsComponent.prototype.handleSelectTab = function (_a) {
        var index = _a.index;
        this.filterDocuments();
    };
    DocumentsComponent.prototype.singDocument = function (documentId) {
        var _this = this;
        this.signFlowService.downloadFileSign(documentId).then(function (response) {
            var subfixFile = '.pdf';
            var fileName = "sign_templ" + subfixFile;
            var mimeType = _this.getMimeType(subfixFile);
            download_file_1.download(fileName, response, mimeType);
        });
    };
    DocumentsComponent.prototype.handlePageChange = function (_a) {
        var skip = _a.skip, page = _a.page;
        this.skip = skip;
        this.selectedPage = page;
        this.filterDocuments(skip);
    };
    DocumentsComponent.prototype.editDocument = function (itemEdit) {
    };
    DocumentsComponent.prototype.hendlFormSearch = function (data) {
        this.filter = data;
        this.filterDocuments();
    };
    DocumentsComponent.prototype.continueSignDocument = function (documentId) {
        var _this = this;
        this.signFlowService.getDetail(documentId).subscribe(function (data) {
            _this.showDocumentSign(data);
        });
    };
    DocumentsComponent.prototype.showDocumentSign = function (documentSign) {
        this.modalService.create({
            nzClosable: false,
            nzTitle: 'Ký tài liệu',
            nzStyle: { top: 0 },
            nzClassName: "signature-flow",
            nzKeyboard: false,
            nzContent: components_1.SignatureFlowComponent,
            nzViewContainerRef: this.viewContainerRef,
            nzOnOk: function () { return new Promise(function (resolve) { return setTimeout(resolve, 1000); }); },
            nzFooter: [],
            nzComponentParams: {
                documentSign: documentSign
            }
        });
    };
    DocumentsComponent.prototype.viewDocument = function (documentView) {
        this.router.navigate(['/manage-documents/' + documentView.id]);
    };
    DocumentsComponent.prototype.getMimeType = function (subfixFile) {
        var mimeType = constant_1.MIME_TYPE.find(function (c) { return c.key === subfixFile; });
        if (mimeType) {
            return mimeType.value;
        }
        return constant_1.MIME_TYPE[0].value;
    };
    DocumentsComponent = __decorate([
        core_1.Component({
            selector: 'app-documents',
            templateUrl: './documents.component.html',
            styleUrls: ['./documents.component.less']
        })
    ], DocumentsComponent);
    return DocumentsComponent;
}());
exports.DocumentsComponent = DocumentsComponent;
