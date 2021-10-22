import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DOCUMENTSTATUS } from '@app/shared/constant';

@Component({
  selector: 'app-contract-search-table',
  templateUrl: './contract-search-table.component.html',
  styleUrls: ['./contract-search-table.component.less']
})
export class ContractSearchTableComponent implements OnInit {
  @Input() documents: any;
  isSelectAll: boolean;
  status: any = DOCUMENTSTATUS;
  @Output() editDocument: EventEmitter<any> = new EventEmitter();
  @Output() continueSignDocument: EventEmitter<any> = new EventEmitter();
  @Output() viewDocument: EventEmitter<any> = new EventEmitter();
  @Output() singDocument: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.documents && changes.documents.currentValue && changes.documents.currentValue.length) {
      this.documents = changes.documents.currentValue;
    }
  }

  selectAllDocument() {
  }

  signDocument(item) {
    this.singDocument.emit(item);
  }

  viewDetail(item) {
    this.viewDocument.emit(item);
  }

  continue(item) {
    this.continueSignDocument.emit(item);
  }
}
