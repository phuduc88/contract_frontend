"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ManageDocumentsTableComponent = void 0;
var core_1 = require("@angular/core");
var manage_bookmarks_table_component_1 = require("./manage-bookmarks-table.component");
var ManageDocumentsTableComponent = /** @class */ (function () {
    function ManageDocumentsTableComponent(modalService) {
        this.modalService = modalService;
        this.onPageChange = new core_1.EventEmitter();
        this.onDeleteBookmark = new core_1.EventEmitter();
        this.onDownloadTemplateBookmark = new core_1.EventEmitter();
        this.onQuickView = new core_1.EventEmitter();
        this.total = 0;
        this.selectedPage = 1;
        this.take = 1;
        this.numberPages = 1;
        this.skip = 1;
    }
    ManageDocumentsTableComponent.prototype.ngOnInit = function () { };
    ManageDocumentsTableComponent.prototype.ngOnChanges = function (changes) {
        if (changes.documentData && changes.documentData.currentValue) {
            this.caculatorPage();
        }
    };
    ManageDocumentsTableComponent.prototype.firstPage = function () {
        this.selectedPage = 1;
        this.pageChange(1);
    };
    ManageDocumentsTableComponent.prototype.nextPage = function () {
        var nextPage = this.selectedPage + 1;
        if (nextPage <= this.numberPages) {
            this.selectedPage = nextPage;
            this.pageChange(nextPage);
        }
    };
    ManageDocumentsTableComponent.prototype.previousPage = function () {
        var previous = this.selectedPage - 1;
        if (previous > 0) {
            this.selectedPage = previous;
            this.pageChange(previous);
        }
    };
    ManageDocumentsTableComponent.prototype.lastPage = function () {
        this.selectedPage = this.numberPages;
        this.pageChange(this.selectedPage);
    };
    ManageDocumentsTableComponent.prototype.caculatorPage = function () {
        if (!this.documentData) {
            return 1;
        }
        this.total = (this.documentData.total || 0) * 1;
        this.take = (this.documentData.take || 0) * 1;
        var numberPaging = this.total / this.take;
        numberPaging = parseInt(numberPaging.toString());
        var surplus = this.total % this.take;
        if (surplus > 0) {
            numberPaging = numberPaging + 1;
        }
        this.numberPages = numberPaging;
    };
    ManageDocumentsTableComponent.prototype.pageChange = function (page) {
        this.skip = page === 1 ? 0 : (page - 1) * this.take;
        this.onPageChange.emit({
            skip: this.skip,
            page: page
        });
    };
    ManageDocumentsTableComponent.prototype.deleteBookmark = function (data, index) {
        this.documentData.splice(index, 1);
        this.onDeleteBookmark.emit({
            data: data,
            index: index
        });
    };
    ManageDocumentsTableComponent.prototype.downloadTemplateBookmark = function (data) {
        this.onDownloadTemplateBookmark.emit({
            data: data
        });
    };
    ManageDocumentsTableComponent.prototype.quickView = function (data) {
        this.onQuickView.emit({
            data: data
        });
    };
    ManageDocumentsTableComponent.prototype.viewBookmarks = function () {
        var modal = this.modalService.create({
            nzClosable: true,
            nzTitle: "Thông tin tệp tài liệu",
            nzStyle: { top: 20 },
            nzClassName: "manage-bookmarks",
            nzKeyboard: false,
            nzContent: manage_bookmarks_table_component_1.ManageBookmarksTableComponent,
            nzOnOk: function (data) { return console.log("Click ok", data); },
            nzComponentParams: {},
            nzFooter: []
        });
    };
    __decorate([
        core_1.Input()
    ], ManageDocumentsTableComponent.prototype, "documentData");
    __decorate([
        core_1.Output()
    ], ManageDocumentsTableComponent.prototype, "onPageChange");
    __decorate([
        core_1.Output()
    ], ManageDocumentsTableComponent.prototype, "onDeleteBookmark");
    __decorate([
        core_1.Output()
    ], ManageDocumentsTableComponent.prototype, "onDownloadTemplateBookmark");
    __decorate([
        core_1.Output()
    ], ManageDocumentsTableComponent.prototype, "onQuickView");
    ManageDocumentsTableComponent = __decorate([
        core_1.Component({
            selector: "app-manage-documents-table",
            templateUrl: "./manage-documents-table.component.html",
            styleUrls: ["./manage-documents-table.component.less"]
        })
    ], ManageDocumentsTableComponent);
    return ManageDocumentsTableComponent;
}());
exports.ManageDocumentsTableComponent = ManageDocumentsTableComponent;
