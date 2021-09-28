"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ManageBookmarksTableComponent = void 0;
var core_1 = require("@angular/core");
var ManageBookmarksTableComponent = /** @class */ (function () {
    function ManageBookmarksTableComponent(modal) {
        this.modal = modal;
        this.bookmark = {
            OnSign_ID: "21321",
            Chinhanh: "123213",
            Chucvu: "21321",
            Diachi: "3213",
            CMND: "21321",
            Gioitinh: "21321",
            Denngay: new Date(),
            Hovaten: "qwewqe",
            Hieuluc: "12",
            Luong: "211212",
            H: "eqeq",
            Ngaycap: new Date(),
            Hovaten2: "daewqwe",
            Ngaysinh: new Date(),
            Loaihopdong: "qwewqewqeqe",
            SoHD: "wqewqewq",
            Noicap: "qwewqe",
            Tungay: new Date()
        };
    }
    ManageBookmarksTableComponent.prototype.ngOnInit = function () { };
    ManageBookmarksTableComponent.prototype.keys = function () {
        return Object.keys(this.bookmark);
    };
    ManageBookmarksTableComponent.prototype.closeModal = function () {
        this.modal.destroy();
    };
    ManageBookmarksTableComponent = __decorate([
        core_1.Component({
            selector: "app-manage-bookmarks-table",
            templateUrl: "./manage-bookmarks-table.component.html",
            styleUrls: ["./manage-bookmarks-table.component.less"]
        })
    ], ManageBookmarksTableComponent);
    return ManageBookmarksTableComponent;
}());
exports.ManageBookmarksTableComponent = ManageBookmarksTableComponent;
