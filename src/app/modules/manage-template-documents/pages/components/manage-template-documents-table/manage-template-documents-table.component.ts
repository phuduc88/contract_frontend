import { Component, Input, OnInit, EventEmitter, Output, OnChanges } from "@angular/core";

@Component({
  selector: "app-manage-template-documents-table",
  templateUrl: "./manage-template-documents-table.component.html",
  styleUrls: ["./manage-template-documents-table.component.less"],
})
export class ManageTemplateDocumentsTableComponent implements OnInit, OnChanges {
  @Input() documents;
  @Output() onPageChange: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onDownloadTemplate: EventEmitter<any> = new EventEmitter();
  @Output() onDownloadBookmark: EventEmitter<any> = new EventEmitter();
  @Output() onViewDetail: EventEmitter<any> = new EventEmitter();
  total = 0;
  selectedPage = 1
  take = 1;
  numberPages = 1;
  skip = 1;

  ngOnInit() {
  }

  ngOnChanges(changes) { 
    if (changes.documents && changes.documents.currentValue) {
      this.caculatorPage();
    }
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

  private caculatorPage() {
    if (!this.documents) {
      return 1;
    }
    this.total = (this.documents.total || 0) * 1;
    this.take = (this.documents.take || 0) * 1;
    let numberPaging = (this.total / this.take);
    numberPaging = parseInt(numberPaging.toString());
    const surplus = this.total % this.take;
    if(surplus > 0) {
      numberPaging = numberPaging + 1;
    }

    this.numberPages = numberPaging;
  }

  pageChange(page) {
    this.skip = page === 1 ? 0 : (page - 1) * this.take;

    this.onPageChange.emit({
      skip: this.skip,
      page
    });
  }

  delete(data, index) {
    this.documents.splice(index, 1);
    this.onDelete.emit({
      data,
      index
    });
  }

  downloadTemplate(data) {
    this.onDownloadTemplate.emit({
      data
    });
  }

  downloadBookmark(data) {
    this.onDownloadBookmark.emit({
      data
    });
  }

  viewDetail(data) {
    this.onViewDetail.emit({
      data
    })
  }
   
}
