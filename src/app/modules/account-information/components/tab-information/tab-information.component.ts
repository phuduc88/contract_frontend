import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewContainerRef } from "@angular/core";
import { Credential } from '@app/core/models';
import { NzModalService } from "ng-zorro-antd/modal";
import { InviteEmployeeComponent } from "../tab-information/invite-employee.component";
import { AccountService, RoleService } from '@app/core/services';
import { REGEX, ROLE } from '@app/shared/constant';

@Component({
  selector: 'tab-information',
  templateUrl: './tab-information.component.html',
  styleUrls: ['tab-information.component.less']
})
export class TabInformationComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() currentUser: Credential;
  user: Credential;
  accounts: any = []
  constructor(
    private modalService: NzModalService,
    private accountService: AccountService,
    private roleService: RoleService,
    private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    this.user = this.currentUser;
    this.getTreeAccount();
  }

  adddEmployee() {
    const accountInfo = {
      email: null,
      name: null,
      active: true,
      mobile: null,
      usingHSM: false,
      roleLevel: ROLE.CUSTOMER,
      roles: [],
    };
    
    this.showDialogAccount(accountInfo);
  }

  chooseEmployee(accountInfo) {
    this.accountService.getDetailById(accountInfo.id).subscribe((res) => {
      this.showDialogAccount(res);
    });    
  }

  showDialogAccount(accountInfo) {
    const modal = this.modalService.create({
      nzClosable: false,
      nzWidth: 980,
      nzTitle: 'Thêm mới thành viên',
      nzStyle: { top: 20 },
      nzClassName: "invite-employee",
      nzKeyboard: false,
      nzContent: InviteEmployeeComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzOnOk: (data) => console.log('Click ok', data),
      nzComponentParams: {
        accountInfo
      },
      nzFooter: []
    });

    modal.afterClose.subscribe(result => {
      if(!result) {
        return;
      }

      if(!result.id) {
        this.createAccount(result);
      } else {
        this.updateAccount(result);
      }
    });
  }

  ngAfterViewInit()
  {
  }

  ngOnDestroy()
  {
  }

  private createAccount(accountInfo) {
    this.accountService.create(accountInfo).subscribe((item) =>{
      this.accounts.push(item);
    })
  }

  private updateAccount(accountInfo) {
    this.accountService.update(accountInfo.id, accountInfo).subscribe((item) =>{
      this.getTreeAccount();
    })
  }

  private getTreeAccount() {
    this.accountService.getAccountTrees().subscribe((items) =>{
      this.accounts = items;
    });
  }

  private updateSourceTree(employeeUpdate) {
    const index = this.accounts.findIndex(i => i.id == employeeUpdate.id);
    this.accounts[index] = employeeUpdate;
  }
}
