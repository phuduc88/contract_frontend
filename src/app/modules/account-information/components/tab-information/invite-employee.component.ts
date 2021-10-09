import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzModalRef } from "ng-zorro-antd/modal";
import { forkJoin, Subject } from 'rxjs';
import { REGEX } from '@app/shared/constant';
import { RoleService, AuthenticationService } from '@app/core/services';
import { Credential } from "@app/core/models";

@Component({
  selector: "invite-employee",
  templateUrl: "./invite-employee.component.html",
  styleUrls: ["./invite-employee.component.less"],
})
export class InviteEmployeeComponent implements OnInit {   
  @Input() employeeInfo: any;
  panels = [
    {
      active: true,
      name: 'This is panel header 1',
      disabled: false
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 2'
    },
    {
      active: false,
      disabled: true,
      name: 'This is panel header 3'
    }
  ];
  form: FormGroup;
  roles: any;
  isEmployeeOfCompany = true;
  showCompany = true;
  currentUser: Credential;
  constructor(
    private formBuilder: FormBuilder, 
    private roleService: RoleService,
    private authService: AuthenticationService,
    private modal: NzModalRef
  ){}

  ngOnInit() {
    // console.log(this.employeeInfo);
    this.isEmployeeOfCompany = this.employeeInfo.isEmployeeOfCompany;
    this.currentUser = this.authService.currentCredentials;
    this.form = this.formBuilder.group({
      fullName: [{ value: this.employeeInfo.fullName, disabled: (this.employeeInfo.id)} ,[Validators.required]],
      email: [{ value: this.employeeInfo.email, disabled: (this.employeeInfo.id)}, [Validators.required, Validators.pattern(REGEX.EMAIL)]],
      roleLevel: [1],
      mobile: ['', [Validators.required, Validators.pattern(REGEX.PHONE_NUMBER)]],
      description: [''],
      userName: ['', Validators.required],
    });
    const jobs = [
      this.roleService.getRoleOfEmployee(),
    ];

    forkJoin(jobs).subscribe(([roles]) => {
      this.roles = this.checkedRoleOfEmployee(roles);
      this.setCheckboxParentAll();
    });
  }

  closeModal() {
    this.modal.destroy();
  }

  save() {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }

    if (this.form.invalid) {
      return;
    }

    this.inviteEmployee();
  }

  private checkedRoleOfEmployee(rolesDefault){
    const roles = [];
     
    rolesDefault.forEach(role => {
      let roleOfUser = {
        ...role,
        childrens: []
      };
         
      role.childrens.forEach((child) => {
        const rolechecked = this.employeeInfo.roles.find(r => r.functionName === child.functionName);
        child.check = false;
        if (rolechecked) {
          child.check = true;
        } 
        roleOfUser.childrens.push(child);
      });
      
      roles.push(roleOfUser);
    });

    return roles;

  }

  inviteEmployee() {
    const data = this.getData();
    this.modal.destroy(data); 
  }

  getData() {
    const formData = {
      id: this.employeeInfo.id,
      isEmployeeOfCompany: this.isEmployeeOfCompany,
      ...this.form.getRawValue(),
      roles: [],
    };

    if (this.isEmployeeOfCompany) {
      formData.roles = this.getRoleSelected();
    }

    return formData;
  }

  private getRoleSelected() {
    let childrens = [];
    this.roles.map((item) => {
      childrens = childrens.concat(item.childrens.filter(p => p.check));
    });
    
    return childrens;
  }

  toggleCompany() {
    this.showCompany = !this.showCompany;
  }

  togglePermission(p) {
    p.expan = !p.expan;
  }

  togglePermissionChildren(p) {
    return p.expan;
  }

  setCheckboxParentAll(parentId: any = null) {
    this.roles = this.roles.map((item) => {
      return { 
        ...item, 
        expan: item.id === parentId ? true : (item.expan || true),
        check: this.getCheckboxParent(item)
       };
    });
  }

  setCheckboxParent(id) {
    this.roles = this.roles.map((item) => {
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

  parentCheck(event, data) {
    this.roles = this.roles.map((item) => {
      return item.id === data.id
        ? {
            ...item,
            childrens: item.childrens.map((children) => {
              return { ...children, check: event.target.checked };
            }),
          }
        : item;
    });
    this.setCheckboxParentAll(data.id);
  }

  childrenCheck(event, parentId, childrenId) {
    this.roles = this.roles.map((item) => {
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
