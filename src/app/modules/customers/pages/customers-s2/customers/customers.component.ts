import { Input, Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AuthenticationService,AgencieService
} from '@app/core/services';
import { Company, Customer } from '@app/core/models';
import { Router } from '@angular/router';
import { DATE_FORMAT, REGEX } from '@app/shared/constant';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject, forkJoin } from 'rxjs';

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.less']
})
export class CustomersFormComponent implements OnInit, OnDestroy {
  @Input() customerId: string;
  formCustomer: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.loadForm();
  }

  ngOnDestroy() {

  }

  private loadForm() {
    this.formCustomer = this.formBuilder.group({
      tax: ['', Validators.required],
      companyName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.pattern(REGEX.EMAIL)]],
      tel: ['', [Validators.pattern(REGEX.PHONE_NUMBER)]],
      delegate: [''],
      position: [''],
      bankName: [''],
      bankAccount: [''],
    });

  }

  private save() {
    for (const i in this.formCustomer.controls) {
      this.formCustomer.controls[i].markAsDirty();
      this.formCustomer.controls[i].updateValueAndValidity();
    }

    if (this.formCustomer.invalid) {
      return;
    }
  }


}

