import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzModalService } from "ng-zorro-antd/modal";
import { eventEmitter } from "@app/shared/utils/event-emitter";
import { ClientService } from '@app/core/services';
import { CheckDuplicateEmail, GROUP_TYPE, REGEX, ValidateEmail, ValidatePhone } from '@app/shared/constant';
@Component({
  selector: "app-general-settings-signing-stream-form",
  templateUrl: "./signing-stream-form.component.html",
  styleUrls: ["./signing-stream-form.component.less"],
})
export class SigningStreamFormComponent implements OnInit {
  @Input() threadGroup: any = {};
  groupType = GROUP_TYPE;
  constructor(
    private modal: NzModalRef,
    private modalService: NzModalService,
    private clientService: ClientService,
  ) {}

  ngOnInit() {
  }

  dismiss(): void {
    this.modal.destroy();
  }

  save() {
    const errors = this.validationEmployeeSign(true);
    if(errors.length > 0) {
      eventEmitter.emit("valid:addEmployeeSign", {errors});
    } else {
      this.modal.destroy(this.threadGroup);
    }
  }

  removeEmployeeSing(index) {
    const threadedSignTemplate = [...this.threadGroup.threadedSignTemplate];
    threadedSignTemplate.splice(index, 1);
    this.threadGroup.threadedSignTemplate = threadedSignTemplate;
  }

  addEmployeeSign() {
    const errors = this.validationEmployeeSign(false);
    if(errors.length > 0) {
      eventEmitter.emit("valid:addEmployeeSign", {errors});
    } else {
      this.threadGroup.threadedSignTemplate.push(this.addEmployeeSignBlank());
    }
  }

  chooseClient(client, item) {
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

  taxInvalid() {
    this.modalService.warning({
      nzTitle: 'Kh??ng t??m th???y m?? s??? thu??? c???n t??m'
    });
  }

  private addEmployeeSignBlank() {
    return {
      name: null,
      groupName: null,
      groupType: GROUP_TYPE.HSMUSB,
      isEmployeeSign: true,
      isEmployeeApprove: false,
      address: null,
      idNumer: null,
      phoneNumber: null,
      isCCFinish: false,
      email: null,
      taxCode: null,
      orders: '1',
      orderSign: 1
    }
  }

  validationEmployeeSign(isSave) {
    let result = [];
    if (!this.threadGroup.name && isSave) {
      result.push({
        columnName: 'Nh????p va??o t??n lu????ng la??m vi????c',
        message: 'kh??ng h???p l???!',
        note: '',
      });

      return result;
    }

    if (!this.threadGroup.threadedSignTemplate || this.threadGroup.threadedSignTemplate.length === 0) {
      result.push({
        columnName: '',
        message: 'Vui l??ng nh???p th??ng tin ng?????i k??',
        note: '',
      });

      return result;
    }

    const isDuplicate = CheckDuplicateEmail(this.threadGroup.threadedSignTemplate);
    if (isDuplicate) {
      result.push({
        columnName: 'Email',
        message: 'C?? s??? tr??ng l???p ?????a ng?????i nh???n (ch??? Email), vui l??ng ki???m tra l???i!',
        note: '',
      });
    }

    this.threadGroup.threadedSignTemplate.forEach(item => {
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

  changeGroupType(groupType, item) {
    if (groupType ===  this.groupType.HSMUSB) {
      item.name = null;
      item.address = null;
      item.phoneNumber = null,
      item.idNumber = null;
      item.isCCFinish = false;
    } else if (groupType ===  this.groupType.ONSIGN) {
      item.taxCode = null;
      item.groupName = null;
      item.isCCFinish = false;
    } else {
      item.name = null;
      item.address = null;
      item.phoneNumber = null,
      item.idNumber = null;
    }
    item.isEmployeeApprove = false;
    item.isEmployeeSign = false;
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
