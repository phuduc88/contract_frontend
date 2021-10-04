"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CustomersFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var constant_1 = require("@app/shared/constant");
var CustomersFormComponent = /** @class */ (function () {
    function CustomersFormComponent(formBuilder) {
        this.formBuilder = formBuilder;
    }
    CustomersFormComponent.prototype.ngOnInit = function () {
        this.loadForm();
    };
    CustomersFormComponent.prototype.ngOnDestroy = function () {
    };
    CustomersFormComponent.prototype.loadForm = function () {
        this.formCustomer = this.formBuilder.group({
            tax: ['', forms_1.Validators.required],
            companyName: ['', forms_1.Validators.required],
            address: ['', forms_1.Validators.required],
            email: ['', [forms_1.Validators.pattern(constant_1.REGEX.EMAIL)]],
            tel: ['', [forms_1.Validators.pattern(constant_1.REGEX.PHONE_NUMBER)]],
            delegate: [''],
            position: [''],
            bankName: [''],
            bankAccount: ['']
        });
    };
    CustomersFormComponent.prototype.save = function () {
        for (var i in this.formCustomer.controls) {
            this.formCustomer.controls[i].markAsDirty();
            this.formCustomer.controls[i].updateValueAndValidity();
        }
        if (this.formCustomer.invalid) {
            return;
        }
    };
    __decorate([
        core_1.Input()
    ], CustomersFormComponent.prototype, "customerId");
    CustomersFormComponent = __decorate([
        core_1.Component({
            selector: 'app-customers-form',
            templateUrl: './customers.component.html',
            styleUrls: ['./customers.component.less']
        })
    ], CustomersFormComponent);
    return CustomersFormComponent;
}());
exports.CustomersFormComponent = CustomersFormComponent;
