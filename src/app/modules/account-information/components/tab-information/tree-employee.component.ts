import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-tree-employee',
  templateUrl: './tree-employee.component.html'
})
export class TreeEmployeeComponent implements OnInit {
  @Input() treeEmployeeData: any = [];
  @Output() chooseEmployee: EventEmitter<any> = new EventEmitter();
  ngOnInit() {

  }

  eidtEmployee(employee) {
    this.chooseEmployee.emit(employee)
  }
}
