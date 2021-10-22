import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { DOCUMENTSTATUS } from "@app/shared/constant";

@Component({
  selector: "app-document-table",
  templateUrl: "./document-table.component.html",
  styleUrls: ["./document-table.component.less"],
})
export class DocumentTableComponent implements OnInit {
  @Input() documents: any;
  total = 0;
  selectedPage = 1;
  take = 1;
  numberPages = 1;
  skip = 1;
  documentsTest: any = [];
  isSelectAll: boolean;
  status: any = DOCUMENTSTATUS;
  @Output() editDocument: EventEmitter<any> = new EventEmitter();
  @Output() continueSignDocument: EventEmitter<any> = new EventEmitter();
  @Output() viewDocument: EventEmitter<any> = new EventEmitter();
  @Output() singDocument: EventEmitter<any> = new EventEmitter();
  @Output() onPageChange: EventEmitter<any> = new EventEmitter();
  @Output() onCheckChange: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes) {
    if (
      changes.documents &&
      changes.documents.currentValue &&
      changes.documents.currentValue.length
    ) {
      let documents = changes.documents.currentValue;
      this.documents = documents;
      this.isSelectAll =
        documents.length > 0 && documents.filter((x) => !x.isSelected) == 0;
      this.caculatorPage();
    }
  }

  private caculatorPage() {
    if (!this.documents) {
      return 1;
    }
    this.total = (this.documents.total || 0) * 1;
    this.take = (this.documents.take || 0) * 1;
    let numberPaging = this.total / this.take;
    numberPaging = parseInt(numberPaging.toString());
    const surplus = this.total % this.take;
    if (surplus > 0) {
      numberPaging = numberPaging + 1;
    }

    this.numberPages = numberPaging;
  }

  pageChange(page) {
    this.skip = page === 1 ? 0 : (page - 1) * this.take;

    this.onPageChange.emit({
      skip: this.skip,
      page,
    });
  }

  firstPage() {
    this.selectedPage = 1;
    this.pageChange(1);
  }

  nextPage() {
    let nextPage = this.selectedPage + 1;
    if (nextPage <= this.numberPages) {
      this.selectedPage = nextPage;
      this.pageChange(nextPage);
    }
  }

  previousPage() {
    let previous = this.selectedPage - 1;
    if (previous > 0) {
      this.selectedPage = previous;
      this.pageChange(previous);
    }
  }

  lastPage() {
    this.selectedPage = this.numberPages;
    this.pageChange(this.selectedPage);
  }

  selectAllDocument() {
    this.onCheckChange.emit({
      isSelectAll: true,
      checked: this.isSelectAll,
    });
  }

  documentSelect(document: any) {
    this.onCheckChange.emit({
      isSelectAll: false,
      id: document.id,
      checked: document.isSelected,
    });
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
