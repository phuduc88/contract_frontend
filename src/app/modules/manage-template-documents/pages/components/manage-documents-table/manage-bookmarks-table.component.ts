import { Component, OnInit } from "@angular/core";
import { NzModalRef } from "ng-zorro-antd/modal";

@Component({
  selector: "app-manage-bookmarks-table",
  templateUrl: "./manage-bookmarks-table.component.html",
  styleUrls: ["./manage-bookmarks-table.component.less"],
})
export class ManageBookmarksTableComponent implements OnInit {
  bookmark = {
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
    Tungay: new Date(),
  };

  constructor(private modal: NzModalRef) {}

  ngOnInit() {}

  keys() {
    return Object.keys(this.bookmark);
  }

  closeModal() {
    this.modal.destroy();
  }
}
