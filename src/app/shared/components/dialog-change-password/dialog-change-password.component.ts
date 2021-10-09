import { AfterViewInit, Component, Input, Output, EventEmitter, OnDestroy, OnInit, ViewContainerRef, OnChanges } from "@angular/core";
import * as $ from 'jquery';
import { NzModalRef } from "ng-zorro-antd/modal";
import 'jqueryui';
import { eventEmitter } from '@app/shared/utils/event-emitter';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DATE_FORMAT, REGEX } from '@app/shared/constant';
import { AuthenticationService } from '@app/core/services';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dialog-change-password',
  templateUrl: './dialog-change-password.component.html',
  styleUrls: ['dialog-change-password.component.less']
})
export class DialogChangePasswordComponent implements OnInit, OnDestroy, AfterViewInit {
  formChangePassword: FormGroup;
  passwordNewVisible: boolean = false;
  passwordVisible: boolean = false;
  currentUser: any;
  constructor(
    private modal: NzModalRef,
    private router: Router,
    private modalService: NzModalService,
    private formBuilder: FormBuilder, 
    private authService: AuthenticationService
  ) 
  {}

  ngOnInit() {
    this.currentUser = this.authService.currentCredentials;
    this.formChangePassword = this.formBuilder.group({
      account: [{ value: this.currentUser.userId, disabled: true }, [Validators.required]],
      password: ['', Validators.required],
      passwordNew: ['',Validators.required],
    });
  }

  dismiss() {
    this.modal.destroy();
  }

  save() {
    const passWordInfo = this.getData();
    this.authService.resetPassword(this.currentUser.token, passWordInfo.password, passWordInfo.passwordNew).subscribe(res =>{
      this.showMessage();
    });
  }

  showMessage() {
    const modal = this.modalService.confirm({
      nzTitle: 'Thay đổi mật khẩu thành công',
    });

    modal.afterClose.subscribe(result => {
      this.authService.saveRememberMe({remember: false});
      this.authService.logout();
      this.modal.destroy();
      this.router.navigate(['/auth/login'], { replaceUrl: true });
    });
  }

  ngAfterViewInit() {}

  ngOnDestroy() { }

  getData() {
    const formValue = {
        ...this.formChangePassword.getRawValue(),         
    };
    return formValue;
  }
}
