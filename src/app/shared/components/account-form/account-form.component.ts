import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Subject } from 'rxjs';
import { NzModalRef } from 'ng-zorro-antd/modal';
import * as moment from 'moment';
import * as _ from 'lodash';
import { AccountService } from '@app/core/services';
import { DropdownItem } from '@app/core/interfaces';
import { PAGE_SIZE, STATUS, ACTION, ROLE } from '@app/shared/constant';

import { download } from '@app/shared/utils/download-file';
import { DATE_FORMAT, MIME_TYPE } from '@app/shared/constant';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AcountFormComponent implements OnInit {
  @Input() company: any;
  accountForm: FormGroup;
  documentForm: FormGroup;
  passwordVisible = false;
  password?: string;
  isExitsAccount: boolean = false;
  accountInfo: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private modal: NzModalRef,
    private accountService: AccountService,
  ) { }

  ngOnInit() {

    this.accountForm = this.formBuilder.group({
      email: [''],
      delegate: [''],
      mobile: [''],
      loginId: [''],
      password: [''],

    });

    this.loadAccountDefault();
  }

  save(): void {
    for (const i in this.accountForm.controls) {
      this.accountForm.controls[i].markAsDirty();
      this.accountForm.controls[i].updateValueAndValidity();
    }

    if (this.accountForm.invalid) {
      return;
    }

    const agencyData = this.getData();
    if (ROLE.SALE === this.company.roleLevel) {

      this.accountService.createUserAgency(agencyData).subscribe(data => {
        const result = {
          type: 'createAccount',
          isSuccess: true,
        }
        this.modal.destroy(result);
      });

    } else {

      this.accountService.createUserCustomer(agencyData).subscribe(data => {
        const result = {
          type: 'createAccount',
          isSuccess: true,
        }
        this.modal.destroy(result);
      });

    }
  }

  dismiss(): void {
    this.modal.destroy();
  }

  private sendEmail() {
    this.accountInfo.email = this.emailContract;
    this.accountInfo.customerId = this.company.id
    this.accountService.sendEmail(this.accountInfo).subscribe(data => {
      const result = {
        type: 'sendEmail',
        isSuccess: true,
      }
      this.modal.destroy(result);
    });

  }

  get emailContract() {
    return this.accountForm.get('email').value;
  }

  getData() {

    const formData = {
      ...this.company,
      ...this.accountForm.value,
      name: this.delegate,
      companyId: this.company.id
    };

    return formData;
  }
  private loadAccountDefault() {
    this.accountService.getAccountOfCompany(this.company.id).subscribe(data => {
      this.isExitsAccount = data.id > 0;
      if (data.id > 0) {
        this.accountInfo = data;
        this.accountForm.patchValue({
          email: data.email,
          delegate: data.name,
          mobile: data.mobile,
          loginId: data.loginId,
          password: data.password,
        });

      } else {

        this.accountForm.patchValue({
          email: this.company.email,
          delegate: this.company.delegate,
          mobile: this.company.tel,
          loginId: this.company.tax,
          password: this.company.tax,
        });

      }

    });
  }
  get delegate() {
    return this.accountForm.get('delegate').value;
  }

}
