import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzModalRef } from "ng-zorro-antd/modal";
import { PERMISSION_LIST_DATA } from "../../data/permission-table";

@Component({
  selector: "invite-employee",
  templateUrl: "./invite-employee.component.html",
  styleUrls: ["./invite-employee.component.less"],
})
export class InviteEmployeeComponent implements OnInit {
  datas: any = PERMISSION_LIST_DATA;
  @Input() employeeInfo: any;
  showCompany = true;
  showPermission = {
    QUANLYTAILIEU: true,
    QUANTRITHANHVIEN: true,
    KY: true,
    MAUTAILIEU: true,
  };

  constructor(private formBuilder: FormBuilder, private modal: NzModalRef) {}

  ngOnInit() {
    this.setCheckboxParentAll();
  }

  closeModal() {
    this.modal.destroy();
  }

  inviteEmployee() {
    var a = this.datas;
  }

  toggleCompany() {
    this.showCompany = !this.showCompany;
  }

  togglePermission(p) {
    this.showPermission[p] = !this.showPermission[p];
  }

  togglePermissionChildren(p) {
    return this.showPermission[p];
  }

  setCheckboxParentAll() {
    this.datas = this.datas.map((item) => {
      return { ...item, check: this.getCheckboxParent(item) };
    });
  }

  setCheckboxParent(id) {
    this.datas = this.datas.map((item) => {
      return item.id === id
        ? { ...item, check: this.getCheckboxParent(item) }
        : item;
    });
  }

  getCheckboxParent(data) {
    let childrensCount = data.childrens.length;
    let childrensCheckCount = data.childrens.filter((x) => x.check).length;
    return childrensCount === childrensCheckCount;
  }

  parentCheck(event, id) {
    this.datas = this.datas.map((item) => {
      return item.id === id
        ? {
            ...item,
            childrens: item.childrens.map((children) => {
              return { ...children, check: event.target.checked };
            }),
          }
        : item;
    });

    this.setCheckboxParentAll();
  }

  childrenCheck(event, parentId, childrenId) {
    this.datas = this.datas.map((item) => {
      return item.id === parentId
        ? {
            ...item,
            childrens: item.childrens.map((children) => {
              return children.id === childrenId
                ? { ...children, check: event.target.checked }
                : children;
            }),
          }
        : item;
    });

    this.setCheckboxParentAll();
  }
}
