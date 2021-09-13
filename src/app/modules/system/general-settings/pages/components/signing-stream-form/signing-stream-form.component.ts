import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { eventEmitter } from "@app/shared/utils/event-emitter";
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

  private addEmployeeSignBlank() {
    return {
      name: null,
      groupName: null,
      groupType: GROUP_TYPE.HSMUSB,
      receptionEmail: false,
      receptionFileCopy: false,
      address: null,
      idNumer: null,
      phoneNumber: null,
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
        columnName: 'Nhập vào tên luồng làm việc',
        message: 'không hợp lệ!',
        note: '',
      });

      return result;
    }

    if (!this.threadGroup.threadedSignTemplate || this.threadGroup.threadedSignTemplate.length === 0) {
      result.push({
        columnName: '',
        message: 'Vui lòng nhập thông tin người ký',
        note: '',
      });

      return result;
    }

    const isDuplicate = CheckDuplicateEmail(this.threadGroup.threadedSignTemplate);
    if (isDuplicate) {
      result.push({
        columnName: 'Email',
        message: 'Có sự trùng lặp địa người nhận (chỉ Email), vui lòng kiểm tra lại!',
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
    } else if (groupType ===  this.groupType.ONSIGN) {
      item.taxCode = null;
      item.groupName = null;
    } else {
      item.name = null;
      item.address = null;
      item.phoneNumber = null,
      item.idNumber = null;
    }
    item.receptionFileCopy = false;
    item.receptionEmail = false;
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
