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
exports.DialogCustomerComponent = void 0;
var core_1 = require("@angular/core");
require("jqueryui");
var forms_1 = require("@angular/forms");
var constant_1 = require("@app/shared/constant");
var DialogCustomerComponent = /** @class */ (function () {
    function DialogCustomerComponent(modal, formBuilder) {
        this.modal = modal;
        this.formBuilder = formBuilder;
    }
    DialogCustomerComponent.prototype.ngOnInit = function () {
        this.customerType = this.customerInfo.customerType;
        this.formCustomer = this.formBuilder.group({
            customerType: [this.customerInfo.customerType, forms_1.Validators.required],
            identityCard: [this.customerInfo.identityCard, forms_1.Validators.required],
            taxCode: [this.customerInfo.taxCode, forms_1.Validators.required],
            customerName: [this.customerInfo.customerName, forms_1.Validators.required],
            address: [this.customerInfo.address, forms_1.Validators.required],
            email: [this.customerInfo.email, [forms_1.Validators.required, forms_1.Validators.pattern(constant_1.REGEX.EMAIL)]],
            mobile: [this.customerInfo.mobile, [forms_1.Validators.required, forms_1.Validators.pattern(constant_1.REGEX.PHONE_NUMBER)]],
            delegate: [this.customerInfo.delegate],
            position: [this.customerInfo.position],
            bankName: [this.customerInfo.bankName],
            bankAccount: [this.customerInfo.bankAccount]
        });
        this.setValidForm();
    };
    DialogCustomerComponent.prototype.dismiss = function () {
        this.modal.destroy();
    };
    DialogCustomerComponent.prototype.save = function () {
        for (var i in this.formCustomer.controls) {
            this.formCustomer.controls[i].markAsDirty();
            this.formCustomer.controls[i].updateValueAndValidity();
        }
        if (this.formCustomer.invalid) {
            return;
        }
        this.modal.destroy(this.getData());
    };
    DialogCustomerComponent.prototype.ngAfterViewInit = function () { };
    DialogCustomerComponent.prototype.ngOnDestroy = function () { };
    DialogCustomerComponent.prototype.changeCustomerType = function (event) {
        this.customerType = event;
        this.setValidForm();
    };
    DialogCustomerComponent.prototype.setValidForm = function () {
        if (this.customerType == 1) {
            this.formCustomer.get('identityCard').clearValidators();
            this.formCustomer.get('identityCard').markAsPristine();
            this.formCustomer.get('taxCode').setValidators(forms_1.Validators.required);
        }
        else {
            this.formCustomer.get('identityCard').setValidators(forms_1.Validators.required);
            this.formCustomer.get('taxCode').markAsPristine();
            this.formCustomer.get('taxCode').clearValidators();
        }
    };
    DialogCustomerComponent.prototype.getData = function () {
        var formValue = __assign({}, this.formCustomer.getRawValue());
        if (this.customerType === 1) {
            formValue.identityCard = null;
        }
        if (this.customerType !== 1) {
            formValue.taxCode = null;
        }
        formValue.id = this.customerInfo.id;
        return formValue;
    };
    __decorate([
        core_1.Input()
    ], DialogCustomerComponent.prototype, "customerInfo");
    DialogCustomerComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-customer',
            templateUrl: './dialog-customer.component.html',
            styleUrls: ['dialog-customer.component.less']
        })
    ], DialogCustomerComponent);
    return DialogCustomerComponent;
}());
exports.DialogCustomerComponent = DialogCustomerComponent;
