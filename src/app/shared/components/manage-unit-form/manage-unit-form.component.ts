import { Component, OnInit, OnDestroy, ViewEncapsulation, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City, District } from '@app/core/models';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import {
  CompanyService,
  DocumentTypeService, AuthenticationService, BenefitLevelService
} from '@app/core/services';
import { forkJoin } from 'rxjs';
import { REGEX, CRON_TIMES, schemaSign } from '@app/shared/constant';


@Component({
  selector: 'app-manage-unit-form',
  templateUrl: './manage-unit-form.component.html',
  styleUrls: ['./manage-unit-form.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ManageUnitFormComponent implements OnInit, OnDestroy {
  @Input() company: any = {};
  form: FormGroup;
  cities: City[] = [];
  isurranceDepartments: any;
  registerDistricts: District[] = [];
  departments: any = [];
  salaryAreas: any = [];
  groupCompanies: any = [];
  loading: boolean = false;
  paymentMethods: any = [];
  districts: City[] = [];
  wards: City[] = [];
  private saveTimer;
  authenticationToken: string;
  shemaUrl: any;
  times: any[] = [];
  timer: any;
  loaddingToken: boolean = false;
  benefitLevels: any;
  coefficients: any;
  calculationTypes: any;

  constructor(
    private formBuilder: FormBuilder,
    private modal: NzModalRef,
    private modalService: NzModalService,
    private departmentService: DocumentTypeService,
    private companyService: CompanyService,
    private authenticationService: AuthenticationService,
    private benefitLevelService: BenefitLevelService,

  ) { }

  ngOnInit() {
    this.loading = false;
    const company = this.company;
    this.departments = company.departments ? company.departments : [];
    this.form = this.formBuilder.group({
      cityCode: [{ value: company.cityCode, disabled: true }, [Validators.required]],
      isurranceDepartmentCode: [{ value: company.isurranceDepartmentCode, disabled: true }, [Validators.required]],
      salaryAreaCode: [company.salaryAreaCode, [Validators.required]],
      isurranceCode: [{ value: company.isurranceCode, disabled: true }, [Validators.required]],
      name: [company.name, [Validators.required]],
      address: [company.address, [Validators.required]],
      addressRegister: [company.addressRegister, [Validators.required]],
      taxCode: [company.taxCode, [Validators.required]],
      tel: [company.tel, [Validators.required, Validators.pattern(REGEX.PHONE_NUMBER)]],
      delegate: [company.delegate, [Validators.required]],
      position: [company.position, [Validators.required]],
      personContact: [company.personContact, [Validators.required]],
      mobile: [company.mobile, [Validators.required, Validators.pattern(REGEX.PHONE_NUMBER)]],
      emailOfContract: [company.emailOfContract, [Validators.required, Validators.pattern(REGEX.EMAIL)]],
      paymentMethodCode: [company.paymentMethodCode, [Validators.required]],
      responseResults: [(company.responseResults || '0').toString(), [Validators.required]],
      privateKey: [company.privateKey, [Validators.required]],
      vendorToken: [company.vendorToken, [Validators.required]],
      fromDate: [company.fromDate, [Validators.required]],
      expired: [company.expired, [Validators.required]],
      submissionType: [(company.submissionType || '0').toString(), [Validators.required]],
      interestCalculation: [(company.interestCalculation || '0').toString()],
      groupCode: [company.groupCode, [Validators.required]],
      objectType: [company.objectType],
      calculationType: [(company.calculationType || '0').toString()],
      coefficient: [(company.coefficient || '0').toString()],
      wardsCode: [company.wardsCode],
      districtCode: [company.districtCode],
      subjectsCard: [(company.subjectsCard || '0').toString()],
    });

    this.changeGroup(company.groupCode, false);
    this.changeObjectType(company.objectType);
    // const jobs = [
    //     this.cityService.getCities(),
    //     this.salaryAreaService.getSalaryAreas(),
    //     this.isurranceDepartmentService.getIsurranceDepartments(companyInfo.cityCode),
    //     this.groupCompanyService.getGroupCompany(),
    //     this.paymentMethodServiced.getPaymentMethods(),
    //     this.districtService.getDistrict(companyInfo.cityCode),
    //     this.wardsService.getWards(companyInfo.districtCode),
    //     this.benefitLevelService.filter(),
    //     this.coefficientService.filter(),
    //     this.categoryService.getCategories('calculationtype')
    // ];

    // forkJoin(jobs).subscribe(([cities, salaryAreas, isurranceDepartments, groupCompanies, paymentMethods, districts, wards, benefitLevels, coefficients, calculationTypes]) => {
    //     this.cities = cities;
    //     this.salaryAreas = salaryAreas;
    //     this.isurranceDepartments = isurranceDepartments;
    //     this.groupCompanies = groupCompanies;
    //     this.paymentMethods = paymentMethods;
    //     this.wards = wards;
    //     this.districts = districts;
    //     this.benefitLevels = benefitLevels;
    //     this.coefficients = coefficients;
    //     this.calculationTypes = calculationTypes;
    // });

    this.loading = true;
    this.buildShemaURL();
  }

  ngOnDestroy() {
    clearTimeout(this.saveTimer);
  }

  save(): void {

    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }

    if (this.checkDuplicateDepartment()) {
      return;
    }

    if (this.form.invalid) {
      return;
    }

    this.updateCompanyInfo();
  }

  updateCompanyInfo() {

    const companyInfo = this.getData();
    this.companyService.update(this.company.id, this.getData()).subscribe(data => {
      this.modal.destroy(companyInfo);
    });
  }

  getData() {
    const currentCopmanyInfo = {
      ...this.form.getRawValue(),
      id: this.company.id,
      companyId: this.company.companyId,
    }

    if (this.groupCode === '02' || this.groupCode === '05') {
      currentCopmanyInfo.subjectsCard = null;
      currentCopmanyInfo.departments = [];
    } else if (this.groupCode === '03') {
      currentCopmanyInfo.departments = [];
      currentCopmanyInfo.districtCode = null;
      currentCopmanyInfo.wardsCode = null;
    } else if (this.groupCode === '04') {
      currentCopmanyInfo.departments = [];
      currentCopmanyInfo.subjectsCard = null;
      currentCopmanyInfo.wardsCode = null;
    } else {
      currentCopmanyInfo.departments = this.departments;
      currentCopmanyInfo.districtCode = null;
      currentCopmanyInfo.subjectsCard = null;
      currentCopmanyInfo.wardsCode = null;
    }

    if (currentCopmanyInfo.objectType !== 'GD') {
      currentCopmanyInfo.calculationType = 0;
    }

    return currentCopmanyInfo;
  }

  dismiss(): void {
    this.modal.destroy();
  }


  changeRegisterCity(value) {
    if (!this.loading) {
      return;
    }

    this.districts = [];
    this.isurranceDepartments = [];
    this.wards = [];
    this.form.patchValue({
      isurranceDepartmentCode: null,
      districtCode: null,
      wardsCode: null
    });
    this.getIsurranceDepartments(value);
    this.getDistricts(value);
  }


  changeDistricts(value) {

    if (!this.loading) {
      return;
    }
    this.wards = [];
    this.form.patchValue({
      wardsCode: null
    });
    this.getwards(value);
  }

  getDistricts(cityCode) {
    // this.districtService.getDistrict(cityCode).subscribe(data => {
    //   this.districts = data;
    // });
  }

  getIsurranceDepartments(cityCode) {
    // this.isurranceDepartmentService.getIsurranceDepartments(cityCode).subscribe(data => {
    //     this.isurranceDepartments = data;
    // });
  }


  getCertification() {
    const link = document.createElement('a');
    link.href = this.shemaUrl;
    link.click();
    this.loaddingToken = true;
    this.cronJob();
  }

  getwards(districtCode) {
    // this.wardsService.getWards(districtCode).subscribe(data => {
    //     this.wards = data;
    // });
  }

  get objectType() {
    return this.form.get('objectType').value;
  }

  get groupCode() {
    return this.form.get('groupCode').value;
  }

  changeObjectType(value) {
    if (value === 'GD') {
      this.form.get('calculationType').setValidators(Validators.required);
    } else {
      this.form.get('calculationType').clearValidators();
      this.form.get('calculationType').markAsPristine();
    }
  }

  changeGroup(value, isChangeValue) {

    if (value === '01' || value === '06' || value === '07') {
      this.form.get('districtCode').clearValidators();
      this.form.get('districtCode').markAsPristine();
      this.form.get('wardsCode').clearValidators();
      this.form.get('wardsCode').markAsPristine();
      this.form.get('subjectsCard').clearValidators();
      this.form.get('subjectsCard').markAsPristine();

      this.form.get('objectType').clearValidators();
      this.form.get('objectType').markAsPristine();

      this.form.get('coefficient').clearValidators();
      this.form.get('coefficient').markAsPristine();
    } if (value === '06') {
      this.form.get('coefficient').setValidators(Validators.required);
      this.form.get('districtCode').clearValidators();
      this.form.get('districtCode').markAsPristine();
      this.form.get('wardsCode').clearValidators();
      this.form.get('wardsCode').markAsPristine();
      this.form.get('subjectsCard').clearValidators();
      this.form.get('subjectsCard').markAsPristine();

      this.form.get('objectType').clearValidators();
      this.form.get('objectType').markAsPristine();

    } else if (value === '02') {
      this.form.get('districtCode').setValidators(Validators.required);
      this.form.get('wardsCode').setValidators(Validators.required);

      this.form.get('subjectsCard').clearValidators();
      this.form.get('subjectsCard').markAsPristine();
      this.form.get('objectType').clearValidators();
      this.form.get('objectType').markAsPristine();

      this.form.get('coefficient').clearValidators();
      this.form.get('coefficient').markAsPristine();

    } else if (value === '05') {
      this.form.get('districtCode').setValidators(Validators.required);
      this.form.get('wardsCode').setValidators(Validators.required);
      this.form.get('objectType').setValidators(Validators.required);

      this.form.get('subjectsCard').clearValidators();
      this.form.get('subjectsCard').markAsPristine();
      this.form.get('coefficient').clearValidators();
      this.form.get('coefficient').markAsPristine();
    } else if (value === '03') {
      this.form.get('subjectsCard').setValidators(Validators.required);

      this.form.get('districtCode').clearValidators();
      this.form.get('districtCode').markAsPristine();
      this.form.get('wardsCode').clearValidators();
      this.form.get('wardsCode').markAsPristine();
      this.form.get('objectType').clearValidators();
      this.form.get('objectType').markAsPristine();
      this.form.get('coefficient').clearValidators();
      this.form.get('coefficient').markAsPristine();
    }
    else if (value === '04') {
      this.form.get('districtCode').setValidators(Validators.required);

      this.form.get('wardsCode').clearValidators();
      this.form.get('wardsCode').markAsPristine();
      this.form.get('subjectsCard').clearValidators();
      this.form.get('subjectsCard').markAsPristine();
      this.form.get('objectType').clearValidators();
      this.form.get('objectType').markAsPristine();
      this.form.get('coefficient').clearValidators();
      this.form.get('coefficient').markAsPristine();
    }
    else {
      this.form.get('districtCode').clearValidators();
      this.form.get('districtCode').markAsPristine();
      this.form.get('subjectsCard').clearValidators();
      this.form.get('subjectsCard').markAsPristine();
      this.form.get('wardsCode').clearValidators();
      this.form.get('wardsCode').markAsPristine();
      this.form.get('objectType').clearValidators();
      this.form.get('objectType').markAsPristine();
      this.form.get('coefficient').clearValidators();
      this.form.get('coefficient').markAsPristine();
    }

    if (isChangeValue) {
      this.form.patchValue({
        objectType: null,
        calculationType: null,
        coefficient: null,
        interestCalculation: null,

      });
    }

  }

  handleUpperCase(key) {
    const value = this.form.value[key];

    this.form.patchValue({
      [key]: value.toUpperCase()
    });
  }

  checkDuplicateDepartment() {
    let isDup = false;
    let code_values = [];
    //iterate the source data
    for (let x of this.departments) {

      if (x.id != "") {
        if (code_values.indexOf(x.id) != -1) {
          isDup = true;
          break;
        } else {
          code_values.push(x.id)
        }
      }

    }

    return isDup;
  }

  private buildShemaURL() {
    this.authenticationToken = this.authenticationService.currentCredentials.token;
    let shemaSign = window['schemaSign'] || schemaSign;
    shemaSign = shemaSign.replace('token', this.authenticationToken);
    this.shemaUrl = shemaSign.replace('declarationId', 'sign');
  }

  cronJob() {

    if (this.loaddingToken) {

      this.timer = setTimeout(() => {
        this.getTokenInfo();
        this.cronJob();

      }, CRON_TIMES);

    } else {
      clearTimeout(this.timer);
    }
  }

  private getTokenInfo() {

    const companyId = this.authenticationService.currentCredentials.company.id;
    this.companyService.getCompanyInfo(companyId).subscribe(data => {
      this.form.patchValue({
        privateKey: data.privateKey,
        vendorToken: data.vendorToken,
        fromDate: data.fromDate,
        expired: data.expired,
      });

      this.loaddingToken = false;
    });

  }
}
