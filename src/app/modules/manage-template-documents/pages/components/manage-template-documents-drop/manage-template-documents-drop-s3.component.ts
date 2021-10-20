import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { eventEmitter } from "@app/shared/utils/event-emitter";
import orderBy from 'lodash/orderBy';
@Component({
  selector: "app-manage-template-documents-drop-s3",
  templateUrl: "./manage-template-documents-drop-s3.component.html",
  styleUrls: ["./manage-template-documents-drop-s3.component.less"],
})
export class ManageTemplateDocumentsDropS3Component implements OnInit {
  @Input() documentTemplate: any;
  @Output() onSaveChangeFileUpload: EventEmitter<any> = new EventEmitter();
  @Output() onGoBack: EventEmitter<any> = new EventEmitter();
  currentPage = 1;
  headerColumn: any = [];
  // numberHeaderEmpSign: any = 0;
  numberHeader: any = 0;
  ngOnInit() {
    this.getHeaderColumn();
  }

  private getHeaderColumn() {
    if(this.documentTemplate.dataBookmarks.length < 1) {
      return;
    }
    const firstItem = this.documentTemplate.dataBookmarks[0];
    let numberColumn = 0;
    Object.keys(firstItem).forEach(key => {
      if(key !== 'recordUpLoad' && key !== 'originFileName') {
        this.headerColumn.push({
          colunmName: key
        })  
        numberColumn++;
      }
    });

    this.numberHeader = numberColumn;
  }

  delete(data, index) {
    this.documentTemplate.dataBookmarks.splice(index, 1);
  }

  nextStep() {
   this.documentTemplate.documentData = this.refomatData();
   this.onSaveChangeFileUpload.emit({goStep: 4, documentTemplate: this.documentTemplate});
  }

  private refomatData() {
    const dataBookmarks = orderBy(this.documentTemplate.dataBookmarks, 'recordUpLoad', 'asc');
    const documentData = [];
    dataBookmarks.forEach((bookmark) => {
      const rowData = {
        recordUpLoad:bookmark.recordUpLoad,
        originFileName:bookmark.originFileName,
      };
      const documentItem = {
        documentTemplateId: this.documentTemplate.id,
        rows: this.getProperty(bookmark, rowData),
      }
      documentData.push(documentItem);
    });
    return documentData;
  }

  private getProperty(bookmark, row) {
    const result = [];
    Object.keys(bookmark).forEach(key => {
      if(key !== 'recordUpLoad' && key !== 'originFileName') {
        const iteData = {...row};
        iteData.name = key;
        iteData.value = bookmark[key];
        result.push(iteData);
      }
    });
    return result;
  } 

  goBack() {
    this.onGoBack.emit({goStep: 2});
  }
}
