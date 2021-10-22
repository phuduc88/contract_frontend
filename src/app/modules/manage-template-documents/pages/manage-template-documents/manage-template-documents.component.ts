import { Component, OnInit, OnDestroy } from "@angular/core";
import { eventEmitter } from "@app/shared/utils/event-emitter";
import {
  DocumentTemplateService,
  DocumentTemplateDataService,
  SignFlowService,
} from "@app/core/services";
import {
  DialogUploadTemplateErrorComponent,
  IframeViewerComponent,
  SignatureTemplateComponent,
} from "@app/shared/components";
import { NzModalService } from "ng-zorro-antd/modal";
import { DATE_FORMAT, MIME_TYPE, PAGE_SIZE } from "@app/shared/constant";
import { download } from "@app/shared/utils/download-file";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: "app-manage-template-documents",
  templateUrl: "./manage-template-documents.component.html",
  styleUrls: ["./manage-template-documents.component.less"],
})
export class ManageTemplateDocumentsComponent implements OnInit, OnDestroy {
  currentStep = 1;
  total: number;
  skip: number;
  overloading = false;
  selectedPage: number = 1;
  documents: any;
  private handlers;
  keyWord: any = "";
  documentType: any = null;
  parentStyle = {};
  error = [];
  documentTemplate: any;

  constructor(
    private modalService: NzModalService,
    private documentTemplateService: DocumentTemplateService,
    private documentTemplateDataService: DocumentTemplateDataService,
    private signFlowService: SignFlowService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.getDocumentTemplate();
  }

  handleChangeFileTemplate({ file, goStep }) {
    this.changeFileSuccess(file, goStep);
  }

  handleGoBack({ goStep }) {
    this.currentStep = goStep;
    if (this.currentStep === 1) {
      this.getDocumentTemplate(this.skip);
    }

    if (this.currentStep === 2) {
      this.documentTemplate.documentData = [];
    }
  }
  changeFileSuccess(file, goStep) {
    this.overloading = true;
    this.parentStyle = {
      "z-index": 99999,
      opacity: 0.3,
    };
    setTimeout(() => {
      this.documentTemplateService
        .uploadContract(file.target.files)
        .subscribe((res) => {
          this.error = res.error;
          if (this.error.length > 0) {
            this.showDialogError(this.error);
          } else {
            this.currentStep = goStep;
            this.documentTemplate = res.result;
            this.documentTemplate.employeesSign = [];
            this.showSignatureFlowDialog(this.documentTemplate);
          }
          this.overloading = false;
          this.parentStyle = {};
        });
    }, 200);
  }

  private showSignatureFlowDialog(documentSign) {
    const modal = this.modalService.create({
      nzStyle: { top: 0 },
      nzClosable: true,
      nzTitle: "Ký tài liệu",
      nzClassName: "signature-flow-dialog",
      nzContent: SignatureTemplateComponent,
      nzOnOk: (data) => console.log("Click ok", data),
      nzComponentParams: {
        documentSign,
      },
      nzFooter: [],
    });

    modal.afterClose.subscribe((result) => {
      if (!result) {
        return;
      }
      this.documentTemplate = result;
      this.currentStep = result.currentStep;
    });
  }
  private showDialogError(errors) {
    this.modalService.create({
      nzClosable: true,
      nzTitle: "Lỗi upload thông tin mẫu hợp đồng",
      nzClassName: "signature-pad-custom",
      nzContent: DialogUploadTemplateErrorComponent,
      nzOnOk: (data) => console.log("Click ok", data),
      nzComponentParams: {
        errors,
      },
    });
  }

  handleUploadFileBookmark(data) {
    this.documentTemplateService
      .uploadFileData(this.documentTemplate.id, data.file.target.files)
      .subscribe((res) => {
        this.error = res.error;
        if (this.error.length > 0) {
          this.showDialogError(this.error);
        } else {
          this.currentStep = data.goStep;
          this.documentTemplate = res.result;
          this.documentTemplate.dataBookmarks = this.builObject(
            res.result.documentData
          );
        }
        this.overloading = false;
        this.parentStyle = {};
      });
  }

  handleUploadReceiverFile(data) {
    this.documentTemplateService
      .uploadReceiverData(this.documentTemplate.id, data.file.target.files)
      .subscribe((res) => {
        this.error = res.error;
        if (this.error.length > 0) {
          this.showDialogError(this.error);
        } else {
          console.log(res);
        }
        this.overloading = false;
        this.parentStyle = {};
      });
  }

  handleSaveChangeDataUpload(data) {
    this.overloading = true;
    this.parentStyle = {
      "z-index": 99999,
      opacity: 0.3,
    };
    this.documentTemplateService
      .updateDataImport(data.documentTemplate.id, data.documentTemplate)
      .subscribe((res) => {
        this.error = res.error;
        if (this.error.length > 0) {
          this.showDialogError(this.error);
        } else {
          this.currentStep = data.goStep;
          this.documentTemplate = res.result;
        }
        this.overloading = false;
        this.parentStyle = {};
      });
  }

  private builObject(documentData) {
    const dataBookmarks = [];
    documentData.forEach((item) => {
      const itemBookmark = {
        recordUpLoad: item.recordUpLoad,
        originFileName: item.originFileName,
      };

      item.rows.forEach((row) => {
        itemBookmark[row.name] = row.value;
      });
      dataBookmarks.push(itemBookmark);
    });
    return dataBookmarks;
  }

  handleDownloadFileTemplateBookmark(data) {
    this.overloading = true;
    this.documentTemplateService
      .downloadExcelBookmark(data.id)
      .then((response) => {
        const subfixFile = ".xlsx";
        const fileName = `B2.Dữ liệu bookmarks tệp ${this.documentTemplate.fileName}${subfixFile}`;
        const mimeType = this.getMimeType(subfixFile);
        download(fileName, response, mimeType);
        this.overloading = false;
      });
  }

  getMimeType(subfixFile: string) {
    const mimeType = MIME_TYPE.find((d) => d.key === subfixFile);
    if (mimeType) {
      return mimeType.value;
    }
    return MIME_TYPE[0].value;
  }

  ngOnDestroy(): void {}

  private getDocumentTemplate(skip = 0, take = PAGE_SIZE) {
    this.overloading = true;
    this.documentTemplateService
      .filter({
        skip,
        take,
        keyWord: this.keyWord,
        documentType: this.documentType,
      })
      .subscribe((res) => {
        this.documents = res.data;
        this.total = res.total;
        this.skip = skip;
        this.documents.total = this.total;
        this.documents.take = take;
        this.overloading = false;
        if (res.data.length === 0 && this.selectedPage > 1) {
          this.skip -= PAGE_SIZE;
          this.selectedPage -= 1;
          this.getDocumentTemplate(this.skip);
        }
      });
  }

  private handlePageChange({ skip, page }) {
    this.skip = skip;
    this.selectedPage = page;
    this.getDocumentTemplate(skip);
  }

  private handleFormSearch(formValue) {
    this.keyWord = formValue.keyWord;
    this.documentType = formValue.documentType;
    this.skip = 0;
    this.selectedPage = 1;
    this.getDocumentTemplate(this.skip);
  }

  handleDelelete({ data }) {
    this.documentTemplateService.delete(data.id).subscribe(() => {
      this.getDocumentTemplate(this.skip);
    });
  }

  handleDownloadTemplate({ data }) {
    this.overloading = true;

    this.documentTemplateService.downloadTemplate(data.id).then((response) => {
      const subfixFile = ".docx";
      const fileName = data.originFileName;
      const mimeType = this.getMimeType(subfixFile);
      download(fileName, response, mimeType);
      this.overloading = false;
    });
  }

  handleDownloadBookmark({ data }) {
    this.overloading = true;
    this.documentTemplateService
      .downloadExcelBookmark(data.id)
      .then((response) => {
        const subfixFile = ".xlsx";
        const fileName = `B2.Dữ liệu bookmarks tệp ${data.originFileName}.xlsx`;
        const mimeType = this.getMimeType(subfixFile);
        download(fileName, response, mimeType);
        this.overloading = false;
      });
  }

  handleViewDetail({ data }) {
    this.overloading = true;
    this.documentTemplateService.getDetail(data.id).subscribe((res) => {
      this.overloading = false;
      this.currentStep = 2;
      this.documentTemplate = res;
    });
  }

  handleDeleteBookmark({ data }) {
    this.overloading = true;
    this.documentTemplateDataService
      .delete(data.documentTemplateId, data.recordUpLoad)
      .subscribe((res) => {
        this.overloading = false;
      });
  }

  handleDownloadTemplateBookmark({ data }) {
    this.overloading = true;
    this.documentTemplateDataService
      .downloadDocument(data.documentTemplateId, data.recordUpLoad)
      .then((response) => {
        const subfixFile = ".pdf";
        const fileName = `${data.originFileName}.${subfixFile}`;
        const mimeType = this.getMimeType(subfixFile);
        download(fileName, response, mimeType);
        this.overloading = false;
      });
  }

  handleQuickView({ data }) {
    this.overloading = true;
    // this.documentTemplateDataService
    //   .quickViewDocument(data.documentTemplateId, data.recordUpLoad)
    //   .subscribe((res) => {
    //     this.overloading = false;
    //     console.log(res);
    //   });

    this.signFlowService.getDetail("1104").subscribe((data: any) => {
      this.overloading = false;
      let srcUrl: any = this.sanitizer.bypassSecurityTrustResourceUrl(
        "data:application/pdf;base64," + data.filesSign[0].data
      );

      const modal = this.modalService.create({
        nzClosable: true,
        nzTitle: "Tệp PDF",
        nzStyle: { top: "20px" },
        nzClassName: "iframe-viewer",
        nzKeyboard: false,
        nzContent: IframeViewerComponent,
        nzOnOk: (data) => console.log("Click ok", data),
        nzComponentParams: {
          srcUrl,
        },
        nzFooter: [],
      });
    });
  }

  handleDownloadFileTemplateReceiver() {
    this.overloading = true;
    this.parentStyle = {
      "z-index": 99999,
      opacity: 0.3,
    };
    this.documentTemplateService.downloadExcelReceiver().then((response) => {
      const subfixFile = ".xlsx";
      const fileName = `Mẫu file dữ liệu người nhận.xlsx`;
      const mimeType = this.getMimeType(subfixFile);
      download(fileName, response, mimeType);
      this.overloading = false;
      this.parentStyle = {};
    });
  }

  handleUploadFileReceiver({ file }) {
    this.overloading = true;
    this.parentStyle = {
      "z-index": 99999,
      opacity: 0.3,
    };
    this.documentTemplateService
      .uploadReceiverData(this.documentTemplate.id, file.target.files)
      .subscribe((res) => {
        this.error = res.error;
        if (this.error.length > 0) {
          this.showDialogError(this.error);
        }
        this.overloading = false;
        this.parentStyle = {};
      });
  }

  handleEditDocumentTemplate({ data }) {
    this.overloading = true;
    this.parentStyle = {
      "z-index": 99999,
      opacity: 0.3,
    };

    this.documentTemplateService
      .editDocumentTemplate(data.id)
      .subscribe((res) => {
        this.showSignatureFlowDialog(res);
        this.overloading = false;
        this.parentStyle = {};
      });
  }
}
