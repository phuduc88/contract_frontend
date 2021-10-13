"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TransactionsSaveComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var constant_1 = require("@app/shared/constant");
var rxjs_1 = require("rxjs");
var carousel_1 = require("ng-zorro-antd/carousel");
var components_1 = require("@app/shared/components");
var TransactionsSaveComponent = /** @class */ (function () {
    function TransactionsSaveComponent(formBuilder, route, router, msg, sanitizer, modalService) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.msg = msg;
        this.sanitizer = sanitizer;
        this.modalService = modalService;
        this.array = [1, 2, 3, 4];
        this.imgList = [];
        this.imgListNguoiDaiDien = [];
        this.imgListBieuMau = [];
        this.beforeUpload = function (file, _fileList) {
            return new rxjs_1.Observable(function (observer) {
                var isLt10M = file.size / 1024 / 1024 < 10;
                if (!isLt10M) {
                    _this.msg.error("File phải nhỏ hơn 10MB!");
                    observer.complete();
                    return;
                }
                observer.next(isLt10M);
                observer.complete();
            });
        };
    }
    TransactionsSaveComponent.prototype.ngOnInit = function () {
        this.id = this.route.snapshot.params.id;
        this.loadForm();
    };
    TransactionsSaveComponent.prototype.loadForm = function () {
        this.form = this.formBuilder.group({
            transactionsType: ["Khách hàng doanh nghiệp"],
            name: ["", forms_1.Validators.required],
            taxCode: ["", [forms_1.Validators.required]],
            city: ["", [forms_1.Validators.required]],
            district: ["", [forms_1.Validators.required]],
            email: ["", [forms_1.Validators.required, forms_1.Validators.pattern(constant_1.REGEX.EMAIL)]],
            tel: ["", [forms_1.Validators.required, forms_1.Validators.pattern(constant_1.REGEX.PHONE_NUMBER)]],
            fullName: ["", forms_1.Validators.required],
            package: ["", forms_1.Validators.required],
            status: ["1", forms_1.Validators.required],
            device: ["TOKEN"],
            transactionType: ["NEW"],
            serial: [""],
            tokenType: ["HARD_TOKEN_EPASS2003"]
        });
    };
    TransactionsSaveComponent.prototype.handleChange = function (info, type) {
        var _this = this;
        switch (info.file.status) {
            case "uploading":
                break;
            default:
                // Get this url from response in real world.
                this.getBase64(info.file.originFileObj, function (img) {
                    switch (type) {
                        case "DN":
                            _this.imgList.push(_this.sanitizer.bypassSecurityTrustResourceUrl(img));
                            break;
                        case "PL":
                            _this.imgListNguoiDaiDien.push(_this.sanitizer.bypassSecurityTrustResourceUrl(img));
                            break;
                        default:
                            _this.imgListBieuMau.push(_this.sanitizer.bypassSecurityTrustResourceUrl(img));
                            break;
                    }
                });
                break;
        }
    };
    TransactionsSaveComponent.prototype.getBase64 = function (img, callback) {
        var reader = new FileReader();
        reader.addEventListener("load", function () { return callback(reader.result.toString()); });
        reader.readAsDataURL(img);
    };
    TransactionsSaveComponent.prototype.refuse = function () {
        this.confirmModal = this.modalService.create({
            nzClosable: true,
            nzTitle: "Từ chối giao dịch",
            nzClassName: "refuse-approve-custom",
            nzContent: components_1.RefuseComponent,
            nzOnOk: function (data) { return console.log("Click ok", data); },
            nzComponentParams: {},
            nzFooter: []
        });
    };
    TransactionsSaveComponent.prototype.ngOnDestroy = function () { };
    __decorate([
        core_1.ViewChild(carousel_1.NzCarouselComponent, { static: false })
    ], TransactionsSaveComponent.prototype, "carouselCustomer");
    TransactionsSaveComponent = __decorate([
        core_1.Component({
            selector: "app-transactions-save",
            templateUrl: "./transactions-save.component.html",
            styleUrls: ["./transactions-save.component.less"]
        })
    ], TransactionsSaveComponent);
    return TransactionsSaveComponent;
}());
exports.TransactionsSaveComponent = TransactionsSaveComponent;
