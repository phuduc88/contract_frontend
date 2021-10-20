import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { GROUP_TYPE } from "@app/shared/constant";
import "jqueryui";
import { eventEmitter } from '@app/shared/utils/event-emitter';

@Component({
  selector: "app-form-employee-template",
  templateUrl: "./form-employee-template.component.html",
  styleUrls: ["form-employee-template.component.less"],
})
export class FormEployeeTemplateComponent implements OnInit {
  @Input() employeesSign;
  @Output() onAddEmployeeSing: EventEmitter<any> = new EventEmitter();
  @Output() onFormValid: EventEmitter<any> = new EventEmitter();
  private handlers: any = [];
  constructor() {}

  ngOnInit() {
    this.handlers = [
      eventEmitter.on('employeeTemplalte:validFrom', ({ action }) => {        
          this.validForm(action);
      })
    ];
  }

  validForm(action) {
    const formVale =  {
      employeesSign: this.employeesSign,
      validForm : [],
    }
    this.onFormValid.emit(formVale);
  }

  removeEmployeeSing(index) {
    const employeesSignCopy = [...this.employeesSign];
    employeesSignCopy.splice(index, 1);
    const employeesSignOrder = [];
    let order = 1;
    employeesSignCopy.forEach(item => {
      employeesSignOrder.push(this.buildEmployeeFake(order, item.groupType));
      order++;
    });
    this.employeesSign = employeesSignOrder;
  }

  addEmployeeSign() {
    const employeesSignCopy = [...this.employeesSign];
    const numberItem = (employeesSignCopy.length || 0) + 1;
    employeesSignCopy.push(this.buildEmployeeFake(numberItem, 1));
    this.employeesSign = employeesSignCopy;
  }

  chanegType(value, item) {
    const itemChange = this.buildEmployeeFake(item.signIndex, value);
    item.email = itemChange.email;
    item.groupName = itemChange.groupName;
    item.isEmployeeSign = itemChange.isEmployeeSign;
  }

  private buildEmployeeFake(signIndex, groupType) {
    let email = '';
    if (groupType === 1) {
      email = 'Người ký';
    } else if (groupType === 2) {
      email = 'Người xét duyệt';
    } else {
      email = 'Người nhận bản sao';
    }
    email = `${ email } ${ signIndex }`;
    const employeeSign = {
      signIndex, 
      email, 
      groupName: email,   
      isEmployeeSign: false,    
      groupType
    };
    employeeSign.isEmployeeSign = (groupType === 1);
    return employeeSign;    
  }

  ngOnChanges(changes) {}
}
