import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '@app/core/services';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: "app-check-point",
  templateUrl: "./check-point.component.html",
  styleUrls: ["./check-point.component.less"],
})
export class CheckPointComponent implements OnInit, OnDestroy {
  checkPointForm: FormGroup;
  errors: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private modalService: NzModalService,
  ) {}

  ngOnInit() {
    this.checkPointForm = this.formBuilder.group({
      otp: ['', Validators.required],
    });
  }

  handleSubmit() {
    if(this.checkPointForm.invalid) {
      return;
    }
   
   this.authService.getVerificationToken(this.form.otp.value).subscribe(data => {
     if (!data) {
      this.errorValid(data);
     } else {
       this.saveSessionToStore(data);
     }
   });

  }

  private errorValid(data) {

    const modal = this.modalService.warning({
      nzTitle: 'Mã xác thực không hợp lệ hoặc đã hết hạn vui lòng cấp lại mã'
    });

    modal.afterClose.subscribe(result => {
      this.authService.storeCredentials(null);
      this.router.navigate(['/auth/login'], { replaceUrl: true });
    });
  }

  private saveSessionToStore(data) {
    this.navigatePageDefault();
  }

  get form() {
    return this.checkPointForm.controls;
  }

  ngOnDestroy() {}

  private navigatePageDefault() {

    if (this.authService.currentCredentials) {
      let defaultUrl = '/';
      // if (ROLE.CUSTOMER === this.authService.currentCredentials.role.level
      //   && !this.authService.currentCredentials.company.hasContract) {
      //     console.log('das');
      // } else if (ROLE.SALE === this.authService.currentCredentials.role.level) {
      //   defaultUrl = this.authService.currentCredentials.role.defaultUrl;
      // }
      this.router.navigate([defaultUrl]);
    }

  }
}
