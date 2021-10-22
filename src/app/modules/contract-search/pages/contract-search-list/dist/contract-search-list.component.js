"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContractSearchListComponent = void 0;
var core_1 = require("@angular/core");
var constant_1 = require("@app/shared/constant");
var custom_validation_1 = require("@app/shared/utils/custom-validation");
var ContractSearchListComponent = /** @class */ (function () {
    function ContractSearchListComponent(formBuilder, contractService, modalService) {
        this.formBuilder = formBuilder;
        this.contractService = contractService;
        this.modalService = modalService;
        this.documents = {};
        this.sortName = '';
        this.selectedPage = 1;
        this.keyword = '';
        this.status = constant_1.DOCUMENTSTATUS;
        this.shortColumn = {
            key: '',
            value: ''
        };
        this.isSpinning = false;
        this.contracts = [];
        this.filter = {
            name: '',
            tax: '',
            delegate: '',
            active: ''
        };
    }
    ContractSearchListComponent.prototype.ngOnInit = function () {
        this.formSearch = this.formBuilder.group({
            keyword: [''],
            dateFrom: [''],
            dateTo: ['']
        });
        this.getContracts();
    };
    ContractSearchListComponent.prototype.handleFilter = function (key) {
        this.keyword = this.filter[key];
        this.getContracts();
    };
    ContractSearchListComponent.prototype.getContracts = function (skip, take) {
        if (skip === void 0) { skip = 0; }
        if (take === void 0) { take = constant_1.PAGE_SIZE; }
    };
    ContractSearchListComponent.prototype.sort = function (event) {
        this.shortColumn = event;
        this.getContracts();
    };
    Object.defineProperty(ContractSearchListComponent.prototype, "dateTo", {
        get: function () {
            var dateTo = this.formSearch.get('dateTo').value;
            if (!dateTo)
                return '';
            var birth = custom_validation_1.getBirthDay(dateTo, false, false);
            return birth.format;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContractSearchListComponent.prototype, "dateFrom", {
        get: function () {
            var dateFrom = this.formSearch.get('dateFrom').value;
            if (!dateFrom)
                return '';
            var birth = custom_validation_1.getBirthDay(dateFrom, false, false);
            return birth.format;
        },
        enumerable: false,
        configurable: true
    });
    ContractSearchListComponent.prototype["delete"] = function (id) {
        var _this = this;
        this.contractService["delete"](id).subscribe(function () {
            _this.getContracts(_this.skip);
        });
    };
    ContractSearchListComponent.prototype.redNew = function (id) {
        var _this = this;
        this.modalService.confirm({
            nzTitle: 'Bạn có chắc chắn muốn làm mới hơp đồng?',
            nzOkText: 'Làm mới',
            nzCancelText: 'Không',
            nzOkType: 'danger',
            nzOnOk: function () {
                _this.contractService.rednew(id).subscribe(function (data) {
                    _this.getContracts(_this.skip);
                });
            }
        });
    };
    ContractSearchListComponent.prototype.handleSearchBox = function () {
        this.getContracts();
    };
    ContractSearchListComponent.prototype.ngOnDestroy = function () {
    };
    ContractSearchListComponent.prototype.download = function (contractId) {
    };
    ContractSearchListComponent = __decorate([
        core_1.Component({
            selector: 'app-contract-search-list',
            templateUrl: './contract-search-list.component.html',
            styleUrls: ['./contract-search-list.component.less']
        })
    ], ContractSearchListComponent);
    return ContractSearchListComponent;
}());
exports.ContractSearchListComponent = ContractSearchListComponent;
