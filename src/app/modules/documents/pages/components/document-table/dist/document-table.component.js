"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DocumentTableComponent = void 0;
var core_1 = require("@angular/core");
var constant_1 = require("@app/shared/constant");
var DocumentTableComponent = /** @class */ (function () {
    function DocumentTableComponent() {
        this.total = 0;
        this.selectedPage = 1;
        this.take = 1;
        this.numberPages = 1;
        this.skip = 1;
        this.documentsTest = [];
        this.status = constant_1.DOCUMENTSTATUS;
        this.editDocument = new core_1.EventEmitter();
        this.continueSignDocument = new core_1.EventEmitter();
        this.viewDocument = new core_1.EventEmitter();
        this.singDocument = new core_1.EventEmitter();
        this.onPageChange = new core_1.EventEmitter();
        this.onCheckChange = new core_1.EventEmitter();
    }
    DocumentTableComponent.prototype.ngOnInit = function () { };
    DocumentTableComponent.prototype.ngOnChanges = function (changes) {
        if (changes.documents &&
            changes.documents.currentValue &&
            changes.documents.currentValue.length) {
            var documents = changes.documents.currentValue;
            this.documents = documents;
            this.isSelectAll =
                documents.length > 0 && documents.filter(function (x) { return !x.isSelected; }) == 0;
            this.caculatorPage();
        }
    };
    DocumentTableComponent.prototype.caculatorPage = function () {
        if (!this.documents) {
            return 1;
        }
        this.total = (this.documents.total || 0) * 1;
        this.take = (this.documents.take || 0) * 1;
        var numberPaging = this.total / this.take;
        numberPaging = parseInt(numberPaging.toString());
        var surplus = this.total % this.take;
        if (surplus > 0) {
            numberPaging = numberPaging + 1;
        }
        this.numberPages = numberPaging;
    };
    DocumentTableComponent.prototype.pageChange = function (page) {
        this.skip = page === 1 ? 0 : (page - 1) * this.take;
        this.onPageChange.emit({
            skip: this.skip,
            page: page
        });
    };
    DocumentTableComponent.prototype.firstPage = function () {
        this.selectedPage = 1;
        this.pageChange(1);
    };
    DocumentTableComponent.prototype.nextPage = function () {
        var nextPage = this.selectedPage + 1;
        if (nextPage <= this.numberPages) {
            this.selectedPage = nextPage;
            this.pageChange(nextPage);
        }
    };
    DocumentTableComponent.prototype.previousPage = function () {
        var previous = this.selectedPage - 1;
        if (previous > 0) {
            this.selectedPage = previous;
            this.pageChange(previous);
        }
    };
    DocumentTableComponent.prototype.lastPage = function () {
        this.selectedPage = this.numberPages;
        this.pageChange(this.selectedPage);
    };
    DocumentTableComponent.prototype.selectAllDocument = function () {
        this.onCheckChange.emit({
            isSelectAll: true,
            checked: this.isSelectAll
        });
    };
    DocumentTableComponent.prototype.documentSelect = function (document) {
        this.onCheckChange.emit({
            isSelectAll: false,
            id: document.id,
            checked: document.isSelected
        });
    };
    DocumentTableComponent.prototype.signDocument = function (item) {
        this.singDocument.emit(item);
    };
    DocumentTableComponent.prototype.viewDetail = function (item) {
        this.viewDocument.emit(item);
    };
    DocumentTableComponent.prototype["continue"] = function (item) {
        this.continueSignDocument.emit(item);
    };
    __decorate([
        core_1.Input()
    ], DocumentTableComponent.prototype, "documents");
    __decorate([
        core_1.Output()
    ], DocumentTableComponent.prototype, "editDocument");
    __decorate([
        core_1.Output()
    ], DocumentTableComponent.prototype, "continueSignDocument");
    __decorate([
        core_1.Output()
    ], DocumentTableComponent.prototype, "viewDocument");
    __decorate([
        core_1.Output()
    ], DocumentTableComponent.prototype, "singDocument");
    __decorate([
        core_1.Output()
    ], DocumentTableComponent.prototype, "onPageChange");
    __decorate([
        core_1.Output()
    ], DocumentTableComponent.prototype, "onCheckChange");
    DocumentTableComponent = __decorate([
        core_1.Component({
            selector: "app-document-table",
            templateUrl: "./document-table.component.html",
            styleUrls: ["./document-table.component.less"]
        })
    ], DocumentTableComponent);
    return DocumentTableComponent;
}());
exports.DocumentTableComponent = DocumentTableComponent;
