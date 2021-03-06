import { AfterViewInit, Component, Input, Output, EventEmitter, OnDestroy, OnInit, ViewContainerRef, OnChanges } from "@angular/core";
import { CheckDuplicateEmail, GROUP_TYPE, REGEX, ValidateEmail, ValidatePhone } from '@app/shared/constant';
import * as $ from 'jquery';
import { NzModalService } from "ng-zorro-antd/modal";
import 'jqueryui';
import { eventEmitter } from '@app/shared/utils/event-emitter';
import { ClientService } from '@app/core/services';

@Component({
  selector: 'app-form-employee-sign',
  templateUrl: './form-employee-sign.component.html',
  styleUrls: ['form-employee-sign.component.less']
})
export class FormEployeeSingComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() employeesSign: any = [];
  @Output() onFormValid: EventEmitter<any> = new EventEmitter();
  @Output() onAddEmployeeSing: EventEmitter<any> = new EventEmitter();
  @Output() onFormValidOnly: EventEmitter<any> = new EventEmitter();
  groupType = GROUP_TYPE;
  private handlers: any = [];
  constructor(
    private modalService: NzModalService,
    private clientService: ClientService,
  ) 
  {}

  ngOnInit() {
    this.handlers = [
      eventEmitter.on('employeeSing:validFrom', ({ action }) => {        
          this.validForm(action);
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

  chooseProduct(client, item) {
    if (client) {
      item.groupName = client.name;
      item.taxCode = client.taxCode;
      item.email = client.email;
      item.clientId = client.id;
      item.addCustomer = false;
    }
  }

  handleSearchTax(item) {
    if (item.taxCode) {
      this.clientService.getOrganizationByTax(item.taxCode).then((data) => {
        if (data['MaSoThue']) {
          item.groupName = data['Title'],
          item.name = data['Title'],
          item.email = '';
          item.addCustomer = true; 
        } else {
          item.groupName = '';
          item.name = '';
          item.email = '';
          item.addCustomer = true; 
          this.taxInvalid();
        }
      });
    } else {
      this.taxInvalid();
    }
  }

  changeGroupType(data, currentItem) {
    if(data === 3) {
      currentItem.isEmployeeSign = null;
    } else {
      currentItem.isEmployeeSign = true;
    }
  }

  taxInvalid() {
    this.modalService.warning({
      nzTitle: 'Kh??ng t??m th???y m?? s??? thu??? c???n t??m'
    });
  }

  validForm(action) {
    const formVale =  {
      employeesSign: this.employeesSign,
      validForm : this.validationEmployeeSign(),
    }

    if (!action) {
      this.onFormValidOnly.emit(formVale);
    } else {
      this.onFormValid.emit(formVale);
    }
    
  }

  validationEmployeeSign() {
    let result = [];
    if (!this.employeesSign || this.employeesSign.length === 0) {
      result.push({
        columnName: '',
        message: 'Vui l??ng nh???p th??ng tin ng?????i k??',
        note: '',
      });

      return result;
    }

    const isDuplicate = CheckDuplicateEmail(this.employeesSign);
    if (isDuplicate) {
      result.push({
        columnName: 'Email',
        message: 'Tr??ng l???p ?????a ng?????i nh???n (ch??? Email), vui l??ng ki???m tra l???i!',
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
        columnName: 'T??n c?? nh??n, t??? ch???c doanh nghi???p ',
        message: 'kh??ng h???p l???!',
        note: '',
      });
    }
    if (!item.email || !ValidateEmail(item.email)) {
      result.push({
        columnName: '?????a ch??? email',
        message: 'kh??ng h???p l???!',
        note: '',
      });
    }
    if (!item.taxCode) {
      result.push({
        columnName: 'M?? s??? thu???',
        message: 'kh??ng h???p l???!',
        note: '',
      });
    }

    return result;
  }

  private validIndividual(item) {
    const result = [];
    if (!item.groupName) {
      result.push({
        columnName: 'T??n c?? nh??n, t??? ch???c doanh nghi???p ',
        message: 'kh??ng h???p l???!',
        note: '',
      });
    } 

    if (!item.email || !ValidateEmail(item.email)) {
      result.push({
        columnName: '?????a ch??? email',
        message: 'kh??ng h???p l???!',
        note: '',
      });
    }

    if (!item.address === null) {
      result.push({
        columnName: '?????a ch???',
        message: 'kh??ng h???p l???!',
        note: '',
      });
    } 
    if (!item.phoneNumber || !ValidatePhone(item.phoneNumber)) {
      result.push({
        columnName: 'S??? ??i???n tho???i',
        message: 'kh??ng h???p l???!',
        note: 'S??? ??i???n tho???i d??ng ????? x??c nh???n m?? k??ch ho???t'
      });
    }
    if (!item.idNumber) {
      result.push({
        columnName: 'S??? ch???ng minh nh??n d??n/th??? c??n c?????c',
        message: 'kh??ng h???p l???!',
        note: 'S??? CMND/C??n c?????c ????? x??c nh???n c?? nh??n s??? d???ng ch??? k?? OnSign'
      });
    }

    return result;
  }


  private validPersionCopy(item) {
    const result = [];
    if (!item.groupName) {
      result.push({
        columnName: 'T??n c?? nh??n',
        message: 'kh??ng h???p l???!',
        note: '',
      });
    } else if (!item.email || !ValidateEmail(item.email)) {
      result.push({
        columnName: '?????a ch??? email',
        message: 'kh??ng h???p l???!',
        note: '',
      });
    } 
    return result;
  }
}
