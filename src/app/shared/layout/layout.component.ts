import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthenticationService } from '@app/core/services';
import { eventEmitter } from '@app/shared/utils/event-emitter';
import { PERMISSIONS, ROLE } from '@app/shared/constant';
import { SignatureFlowComponent } from '@app/shared/components';
import { 
  DialogChangePasswordComponent 
} from '@app/shared/components';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit, OnDestroy {
  isLoading = false;
  private permissions: any = {};
  private handlers: any = [];
  private isCollapsed = false;
  pmsConf = PERMISSIONS;
  currentUser = {};
  currentUrl = ""

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private modalService: NzModalService,
    private viewContainerRef: ViewContainerRef,
  ) {
  }

  ngOnInit() {
    this.handlers = [
      eventEmitter.on('loading:open', (isLoading = false) => {
        this.isLoading = isLoading;
      }),
      eventEmitter.on('saveData:loading', (display) => {
        this.isLoading = display;
      }),
      eventEmitter.on('authencation:error', (show) => {
        this.modalService.warning({
          nzTitle: 'Bạn không có quyền truy cập trang này'
        });
      }),
      eventEmitter.on('saveData:error', (message) => {
        this.modalService.warning({
          nzTitle: message
        });
      }),
      eventEmitter.on('changePassWord:open', (message) => {
         this.dialogChangePassword();
      })

    ];

    this.setPermissions();

    this.setInfo();

    this.onload();
  }

  setPermissions() {
    this.permissions = this.authService.currentCredentials.permissions;
    // const authServiceOfUser = this.authService.currentCredentials.role;
    // if (authServiceOfUser) {
    //   const userPermissions = authServiceOfUser.permission;
    //   this.permissions = {};
    //   userPermissions.forEach((screenName) => {
    //     this.permissions[screenName] = true;
    //   });

    //   if (authServiceOfUser.level === ROLE.CUSTOMER || authServiceOfUser.level === ROLE.USER_CUSTOMER) {
    //     this.permissions[PERMISSIONS.dashboard] = true;
    //   }
    // }
  }

  showMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

  setInfo() {
    const currentCredentials = this.authService.currentCredentials;
    this.currentUser = currentCredentials;
  }

  onload() {
    $(document).on('click', function (e) {
      let target = $(e.target);
      let fbutton = target.closest('.flyout-button');
      let fview = target.closest('.flyout-view');
      if (!target.hasClass('flyout-button') && !target.hasClass('flyout-view') && !fbutton.length) {
        $('.flyout-open').removeClass('flyout-open');
      } else if (fview.length) {
        setTimeout(function () {
          $('.flyout-open').removeClass('flyout-open');
        }, 300);
      }
    });

    this.currentUrl = this.router.url;
  }
  ngOnDestroy() {
    eventEmitter.destroy(this.handlers);
  }

  handleLogout() {
    this.authService.logout();
    this.authService.saveRememberMe({remember: false});
    this.router.navigate(['/auth/login'], { replaceUrl: true });
  }

  popupAlert($event) {
    let button = $($event.currentTarget);
    let w = button.width();
    let h = button.height();
    let offset = button.offset();
    let popup = $(button.attr('data-popup'));

    let top = offset.top + h + 16;
    let left = offset.left;
    if (popup.hasClass('flyout-right')) {
      left -= (w / 2 - 7);
    } else if (popup.hasClass('flyout-left')) {
      left -= (popup.width() - w - 10);
    }
    popup.css({
      top: top,
      left: left
    });

    let overlay = $('.flyout-overview');
    if ($('#flyout-account').hasClass('flyout-open')) {
      $('.flyout-open').removeClass('flyout-open');
    } else {
      button.addClass('flyout-open');
      popup.addClass('flyout-open');
      overlay.addClass('flyout-open');
    }
  }

  logout() {
    this.handleLogout();
    // this.authService.logout();
    // this.router.navigate(['/auth/login'], { replaceUrl: true });
  }

  modalSignDocument() {
    const documentSignTemp = {
      id: null,
      myselfSign: false,
      currentStep: 0,
      documentType: null,
      employeesSign: [],
      filesSign: [],
      listSign: []
    }
    this.showDocumentSign(documentSignTemp);
  }

  showDocumentSign(documentSign) {
    this.modalService.create({
      nzClosable: false,
      nzTitle: 'Chọn tài liệu',
      nzStyle: { top: 0 },
      nzClassName: "signature-flow",
      nzKeyboard: false,
      nzContent: SignatureFlowComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: [],
      nzComponentParams: {
        documentSign,
      }
    });
  }

  dialogChangePassword() {
    
    const modal = this.modalService.create({
      nzClosable: true,
      nzWidth: 650,
      nzTitle: 'Thay đổi mật khẩu',
      nzClassName: "signature-pad-custom",
      nzContent: DialogChangePasswordComponent,
      nzOnOk: () => { },
      nzComponentParams: {
      },
      nzFooter: []
    });
     
  }
}
