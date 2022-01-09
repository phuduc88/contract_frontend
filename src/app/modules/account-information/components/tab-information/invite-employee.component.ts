import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators, AsyncValidator, ValidationErrors } from "@angular/forms";
import { NzModalRef } from "ng-zorro-antd/modal";
import { forkJoin, Subject } from 'rxjs';
import { REGEX, ROLE } from '@app/shared/constant';
import { RoleService, AuthenticationService, AccountService } from '@app/core/services';
import { Credential } from "@app/core/models";
import { Observable } from 'rxjs';
import { of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: "invite-employee",
  templateUrl: "./invite-employee.component.html",
  styleUrls: ["./invite-employee.component.less"],
})
export class InviteEmployeeComponent implements OnInit {   
  @Input() accountInfo: any;
  form: FormGroup;
  roles: any;
  showCompany = true;
  invalid: boolean = true;
  valid: string = 'VALID';
  currentUser: Credential;
  lableSave: any = 'Tạo tài khoản';
  constructor(
    private formBuilder: FormBuilder, 
    private roleService: RoleService,
    private authService: AuthenticationService,
    private accountService: AccountService,
    private modal: NzModalRef
  ){}

  ngOnInit() {
    
    this.currentUser = this.authService.currentCredentials;
    this.form = this.formBuilder.group({
      name: [{ value: this.accountInfo.name, disabled: (this.accountInfo.id)} ,[Validators.required]],
      email: [{ value: this.accountInfo.email, disabled: (this.accountInfo.id)}, [Validators.required, Validators.pattern(REGEX.EMAIL)], this.emailAccountValidator.bind(this)],
      roleLevel: [this.accountInfo.roleLevel],
      mobile: [this.accountInfo.mobile, [Validators.required, Validators.pattern(REGEX.PHONE_NUMBER)]],
      description: [''],
      loginId: [{ value: this.accountInfo.loginId, disabled: (this.accountInfo.id)}, [Validators.required], this.userAccountValidator.bind(this)],
    });

    const jobs = [
      this.roleService.getRoleByLevel(this.accountInfo.roleLevel),
    ];

    forkJoin(jobs).subscribe(([roles]) => {
      this.roles = this.checkedRoleOfEmployee(roles);
      this.setCheckboxParentAll();
    });

    if(this.accountInfo.id) {
      this.lableSave = 'Chỉnh sửa'; 
    }

    this.form.statusChanges.subscribe(r => {
      this.invalid = !(this.valid === r)
    });
  }

  closeModal() {
    this.modal.destroy();
  }

  save() {
    setTimeout(() => {
      for (const i in this.form.controls) {      
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
    }, 10);
   
    if (this.invalid) {
      return;
    }

    this.inviteEmployee();
  }

  private checkedRoleOfEmployee(roleLevel){
    const roles = [];
     
    roleLevel.forEach(role => {
      let roleOfUser = {
        ...role,
        childrens: []
      };

      role.childrens.forEach((child) => {
       
        if (this.accountInfo.roles && this.accountInfo.roles.length > 0) {
          const rolechecked = this.accountInfo.roles.find(r => r.functionName === child.functionName);
          child.check = false;
          if (rolechecked) {
            child.check = true;
          } 
        } else {
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
  
  emailAccountValidator(control: FormControl) :Observable<ValidationErrors | null>  {
    const email = control.value;
     if (email && email.indexOf("@") != -1) {
      return this.accountService.validData(email, '0').pipe(
        map(result => result.isValid ? null : 
            { 
              emailAccount: true,
              invalid: true
            }
        )
      );
    } else {
      return observableOf(null);
    }
  }

  userAccountValidator(control: FormControl) :Observable<ValidationErrors | null>   {
    const userId = control.value;
    if (userId) {
     return this.accountService.validData(userId, '1').pipe(
       map(result => result.isValid ? null : { userAccount: true })
     );
   } else {
    return observableOf(null);
  }
 }

  getData() {
    const formData = {
      id: this.accountInfo.id,
      ...this.form.getRawValue(),
      active: true,
      roles: [],
    };

    formData.roles = this.getRoleSelected();
    return formData;
  }

  private getRoleSelected() {
    let childrens = [];
    this.roles.map((item) => {
      childrens = childrens.concat(item.childrens.filter(p => p.check));
    });
    
    return childrens;
  }

  changeRoleLevel(event) {
    this.roleService.getRoleByLevel(event).subscribe(roles => {
      this.roles = this.checkedRoleOfEmployee(roles);
      this.setCheckboxParentAll();
    });
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
