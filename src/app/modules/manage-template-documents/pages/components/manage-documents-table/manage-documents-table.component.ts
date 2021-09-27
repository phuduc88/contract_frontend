import { Component, Input, OnInit, EventEmitter, Output, OnChanges } from "@angular/core";

@Component({
  selector: "app-manage-documents-table",
  templateUrl: "./manage-documents-table.component.html",
  styleUrls: ["./manage-documents-table.component.less"],
})
export class ManageDocumentsTableComponent implements OnInit, OnChanges {
  @Input() documentData;
  @Output() onPageChange: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteBookmark: EventEmitter<any> = new EventEmitter();
  @Output() onDownloadTemplateBookmark: EventEmitter<any> = new EventEmitter();
  @Output() onQuickView: EventEmitter<any> = new EventEmitter();
  total = 0;
  selectedPage = 1
  take = 1;
  numberPages = 1;
  skip = 1;

  ngOnInit() {
  }

  ngOnChanges(changes) { 
    if (changes.documentData && changes.documentData.currentValue) {
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
    if (!this.documentData) {
      return 1;
    }
    this.total = (this.documentData.total || 0) * 1;
    this.take = (this.documentData.take || 0) * 1;
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

  deleteBookmark(data, index) {
    this.documentData.splice(index, 1);
    this.onDeleteBookmark.emit({
      data,
      index
    });
  }

  downloadTemplateBookmark(data) {
    this.onDownloadTemplateBookmark.emit({
      data
    });
  }

  quickView(data) {
    this.onQuickView.emit({
      data
    })
  }
   
}
