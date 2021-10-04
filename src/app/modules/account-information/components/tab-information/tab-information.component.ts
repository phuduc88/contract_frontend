import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewContainerRef } from "@angular/core";
import { Credential } from '@app/core/models';
import { NzModalService } from "ng-zorro-antd/modal";
import { InviteEmployeeComponent } from "../tab-information/invite-employee.component";
import { EmployeeService, RoleService } from '@app/core/services';

@Component({
  selector: 'tab-information',
  templateUrl: './tab-information.component.html',
  styleUrls: ['tab-information.component.less']
})
export class TabInformationComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() currentUser: Credential;
  user: Credential;
  employees: any = []
  constructor(
    private modalService: NzModalService,
    private employeeService: EmployeeService,
    private roleService: RoleService,
    private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    this.user = this.currentUser;
    this.getTreeEmployee();
  }

  adddEmployee() {
    const employeeInfo = {
      email: null,
      fullName: null,
      active: true,
      usingHSM: false,
      roles: [],
    };
    
    this.showDialogEmployee(employeeInfo);
  }

  chooseEmployee(employeeInfo) {
    this.employeeService.getEmployeeById(employeeInfo.id).subscribe((res) => {
      this.showDialogEmployee(res);
    });    
  }

  showDialogEmployee(employeeInfo) {
    const modal = this.modalService.create({
      nzClosable: false,
      nzTitle: 'Gửi lời mời thêm thành viên',
      nzStyle: { top: 20 },
      nzClassName: "invite-employee",
      nzKeyboard: false,
      nzContent: InviteEmployeeComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzOnOk: (data) => console.log('Click ok', data),
      nzComponentParams: {
        employeeInfo
      },
      nzFooter: []
    });

    modal.afterClose.subscribe(result => {
      if(!result) {
        return;
      }

      if(!result.id) {
        this.createEmployee(result);
      } else {
        this.updateEmployee(result);
      }
    });
  }

  ngAfterViewInit()
  {
  }

  ngOnDestroy()
  {
  }

  private createEmployee(employeeInfo) {
    this.employeeService.create(employeeInfo).subscribe((item) =>{
      this.employees.push(item);
    })
  }

  private updateEmployee(employeeInfo) {
    this.employeeService.update(employeeInfo.id, employeeInfo).subscribe((item) =>{
      this.getTreeEmployee();
    })
  }

  private getTreeEmployee() {
    this.employeeService.getEmployeeTrees().subscribe((items) =>{
      this.employees = items;
    });
  }

  private updateSourceTree(employeeUpdate) {
    const index = this.employees.findIndex(i => i.id == employeeUpdate.id);
    this.employees[index] = employeeUpdate;
  }
}
