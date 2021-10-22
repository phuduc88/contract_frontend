"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContractSearchTableComponent = void 0;
var core_1 = require("@angular/core");
var constant_1 = require("@app/shared/constant");
var ContractSearchTableComponent = /** @class */ (function () {
    function ContractSearchTableComponent() {
        this.status = constant_1.DOCUMENTSTATUS;
        this.editDocument = new core_1.EventEmitter();
        this.continueSignDocument = new core_1.EventEmitter();
        this.viewDocument = new core_1.EventEmitter();
        this.singDocument = new core_1.EventEmitter();
    }
    ContractSearchTableComponent.prototype.ngOnInit = function () {
    };
    ContractSearchTableComponent.prototype.ngOnChanges = function (changes) {
        if (changes.documents && changes.documents.currentValue && changes.documents.currentValue.length) {
            this.documents = changes.documents.currentValue;
        }
    };
    ContractSearchTableComponent.prototype.selectAllDocument = function () {
    };
    ContractSearchTableComponent.prototype.signDocument = function (item) {
        this.singDocument.emit(item);
    };
    ContractSearchTableComponent.prototype.viewDetail = function (item) {
        this.viewDocument.emit(item);
    };
    ContractSearchTableComponent.prototype["continue"] = function (item) {
        this.continueSignDocument.emit(item);
    };
    __decorate([
        core_1.Input()
    ], ContractSearchTableComponent.prototype, "documents");
    __decorate([
        core_1.Output()
    ], ContractSearchTableComponent.prototype, "editDocument");
    __decorate([
        core_1.Output()
    ], ContractSearchTableComponent.prototype, "continueSignDocument");
    __decorate([
        core_1.Output()
    ], ContractSearchTableComponent.prototype, "viewDocument");
    __decorate([
        core_1.Output()
    ], ContractSearchTableComponent.prototype, "singDocument");
    ContractSearchTableComponent = __decorate([
        core_1.Component({
            selector: 'app-contract-search-table',
            templateUrl: './contract-search-table.component.html',
            styleUrls: ['./contract-search-table.component.less']
        })
    ], ContractSearchTableComponent);
    return ContractSearchTableComponent;
}());
exports.ContractSearchTableComponent = ContractSearchTableComponent;
