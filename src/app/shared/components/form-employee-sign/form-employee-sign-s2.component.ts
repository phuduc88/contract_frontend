import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { GROUP_TYPE } from "@app/shared/constant";
import "jqueryui";

@Component({
  selector: "app-form-employee-sign-s2",
  templateUrl: "./form-employee-sign-s2.component.html",
  styleUrls: ["form-employee-sign-s2.component.less"],
})
export class FormEployeeSignS2Component implements OnInit {
  employeesSign: any = [];
  constructor() {}

  ngOnInit() {}

  removeEmployeeSing(index) {
    const employeesSignCopy = [...this.employeesSign];
    employeesSignCopy.splice(index, 1);
    this.employeesSign = employeesSignCopy;
  }

  addEmployeeSign() {
    const employeesSignCopy = [...this.employeesSign];
    employeesSignCopy.push({
      name: null,
    });
    this.employeesSign = employeesSignCopy;
  }

  ngOnChanges(changes) {}
}
