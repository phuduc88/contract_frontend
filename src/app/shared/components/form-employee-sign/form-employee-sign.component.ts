import { AfterViewInit, Component, Input, Output, EventEmitter, OnDestroy, OnInit, ViewContainerRef, OnChanges } from "@angular/core";
import { CheckDuplicateEmail, GROUP_TYPE, REGEX, ValidateEmail, ValidatePhone } from '@app/shared/constant';
import * as $ from 'jquery';
import { NzModalService } from "ng-zorro-antd/modal";
import 'jqueryui';
import { eventEmitter } from '@app/shared/utils/event-emitter';

@Component({
  selector: 'app-form-employee-sign',
  templateUrl: './form-employee-sign.component.html',
  styleUrls: ['form-employee-sign.component.less']
})
export class FormEployeeSingComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() employeesSign: any = [];
  @Output() onFormValid: EventEmitter<any> = new EventEmitter();
  @Output() onAddEmployeeSing: EventEmitter<any> = new EventEmitter();
  groupType = GROUP_TYPE;
  private handlers: any = [];
  constructor(
    private modalService: NzModalService,
  ) 
  {}

  ngOnInit() {
    this.handlers = [
      eventEmitter.on('employeeSing:validFrom', ({ action }) => {        
          this.validForm();
      })
    ];
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() { }

  removeEmployeeSing(index) {
    const employeesSignCopy = [...this.employeesSign];
    employeesSignCopy.splice(index, 1);
    this.employeesSign = employeesSignCopy;
  }

  addEmployeeSign() {
    const formVale =  {
      employeesSign: this.employeesSign,
      validForm : this.validationEmployeeSign(),
    }
    this.onAddEmployeeSing.emit(formVale);
  }

  ngOnChanges(changes) {
    if (changes.employeesSign && changes.employeesSign.currentValue && changes.employeesSign.currentValue.length) {
       this.employeesSign = changes.employeesSign.currentValue;
    }
  }

  validForm() {
    const formVale =  {
      employeesSign: this.employeesSign,
      validForm : this.validationEmployeeSign(),
    }

    this.onFormValid.emit(formVale);
  }

  validationEmployeeSign() {
    let result = [];
    if (!this.employeesSign || this.employeesSign.length === 0) {
      result.push({
        columnName: '',
        message: 'Vui lòng nhập thông tin người ký',
        note: '',
      });

      return result;
    }

    const isDuplicate = CheckDuplicateEmail(this.employeesSign);
    if (isDuplicate) {
      result.push({
        columnName: 'Email',
        message: 'Có sự trùng lặp địa người nhận (chỉ Email), vui lòng kiểm tra lại!',
        note: '',
      });
    }

    this.employeesSign.forEach(item => {
      if (item.groupType ===  this.groupType.HSMUSB) {
        result = result.concat(this.validOrganization(item));
      } else if (item.groupType ===  this.groupType.ONSIGN) {
        result = result.concat(this.validIndividual(item));   
      } else {
        result = result.concat(this.validPersionCopy(item));
      }
    });

    return result;
  }

  private validOrganization(item) {
    const result = [];
    if (!item.groupName) {
      result.push({
        columnName: 'Tên cá nhân, tổ chức doanh nghiệp ',
        message: 'không hợp lệ!',
        note: '',
      });
    }
    if (!item.email || !ValidateEmail(item.email)) {
      result.push({
        columnName: 'Địa chỉ email',
        message: 'không hợp lệ!',
        note: '',
      });
    }
    if (!item.taxCode) {
      result.push({
        columnName: 'Mã số thuế',
        message: 'không hợp lệ!',
        note: '',
      });
    }

    return result;
  }

  private validIndividual(item) {
    const result = [];
    if (!item.groupName) {
      result.push({
        columnName: 'Tên cá nhân, tổ chức doanh nghiệp ',
        message: 'không hợp lệ!',
        note: '',
      });
    } 

    if (!item.email || !ValidateEmail(item.email)) {
      result.push({
        columnName: 'Địa chỉ email',
        message: 'không hợp lệ!',
        note: '',
      });
    }

    if (!item.address === null) {
      result.push({
        columnName: 'Địa chỉ',
        message: 'không hợp lệ!',
        note: '',
      });
    } 
    if (!item.phoneNumber || !ValidatePhone(item.phoneNumber)) {
      result.push({
        columnName: 'Số điện thoại',
        message: 'không hợp lệ!',
        note: 'Số điện thoại dùng để xác nhận mã kích hoạt'
      });
    }
    if (!item.idNumber) {
      result.push({
        columnName: 'Số chứng minh nhân dân/thẻ căn cước',
        message: 'không hợp lệ!',
        note: 'Số CMND/Căn cước để xác nhận cá nhân sử dụng chữ ký OnSign'
      });
    }

    return result;
  }


  private validPersionCopy(item) {
    const result = [];
    if (!item.groupName) {
      result.push({
        columnName: 'Tên cá nhân',
        message: 'không hợp lệ!',
        note: '',
      });
    } else if (!item.email || !ValidateEmail(item.email)) {
      result.push({
        columnName: 'Địa chỉ email',
        message: 'không hợp lệ!',
        note: '',
      });
    } 
    return result;
  }
}
