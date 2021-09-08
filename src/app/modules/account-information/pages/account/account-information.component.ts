import { Component, OnInit } from '@angular/core';
import { AuthenticationService,  SignOfUserService } from '@app/core/services';
import { Credential } from '@app/core/models';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SignaturePadComponent } from '@app/shared/components';

@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.less']
})
export class AccountInformationComponent implements OnInit {
  isTabSignature: boolean;
  isTabInfomation: boolean;
  isTabReport: boolean;
  currentUser: Credential;
  signPadOfUsers: any = [];
  constructor(private authService: AuthenticationService,
    private modalService: NzModalService,
    private signOfUserService: SignOfUserService,
  ) {
  }

  ngOnInit() {
    this.currentUser = this.authService.currentCredentials;
    this.loadSignPadOfUser();
    this.tabSettingsClick(1);
  }

  tabSettingsClick(tabId) {
    switch (tabId) {
      case 1:
        this.isTabSignature = true;
        this.isTabInfomation = false;
        this.isTabReport = false;
        break;
      case 2:
        this.isTabSignature = false;
        this.isTabInfomation = true;
        this.isTabReport = false;
        break;
      case 3:
        this.isTabSignature = false;
        this.isTabInfomation = false;
        this.isTabReport = true;
        break;
    }
  }
  openSignaturePad(signPadOfUse) {
    
    const modal = this.modalService.create({
      nzClosable: true,
      nzTitle: 'Chữ ký của bạn',
      nzClassName: "signature-pad-custom",
      nzContent: SignaturePadComponent,
      nzOnOk: () => { },
      nzComponentParams: {
        signPadOfUse,
      },
      nzFooter: []
    });

    modal.afterClose.subscribe(() => {
      this.loadSignPadOfUser();
    });
  }

  private delete(item) {
    this.modalService.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa?',
      nzOkText: 'Xóa',
      nzCancelText: 'Không',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.signOfUserService.delete(item.id).subscribe((data) => {
          this.loadSignPadOfUser();
        });
      }
    });
  }

  private useDefault(item) {
    this.signOfUserService.updateUseDefault(item.id).subscribe((data) => {
      this.loadSignPadOfUser();
    });
  }

  private loadSignPadOfUser() {
    this.signOfUserService.filter({}).subscribe((item) => {
      this.signPadOfUsers = item.data;
    });
  }
  
}
