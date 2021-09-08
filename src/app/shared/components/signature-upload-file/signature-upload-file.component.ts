import { AfterViewInit, Component, Input, Output, EventEmitter, OnDestroy, OnInit, ViewContainerRef, OnChanges } from "@angular/core";
import { SIGNATURE, GROUP_TYPE, STEP, GetIcon } from '@app/shared/constant';
import * as $ from 'jquery';
import 'jqueryui';
import { SignFlowService, FileSignService } from "@app/core/services";
 

@Component({
  selector: 'app-signature-upload-file',
  templateUrl: './signature-upload-file.component.html',
  styleUrls: ['signature-upload-file.component.less']
})
export class SignatureUploadFileComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() filesSign: any = [];
  @Input() documentId:any;
  @Input() documenType:any;
  @Output() changeFilesUpload: EventEmitter<any> = new EventEmitter();
  isSpinning: boolean;
  constructor(
    private signFlowService: SignFlowService,
    private fileSignService: FileSignService,
  ) 
  {}

  ngOnInit() {
   
  }
  ngAfterViewInit() {
    if(this.filesSign.length === 0 || !this.filesSign) {
      $('#files').trigger('click');
    }
  }

  ngOnDestroy() { }

  ngOnChanges(changes) {
    if (changes.filesSign && changes.filesSign.currentValue && changes.filesSign.currentValue.length) {
       this.filesSign = changes.filesSign.currentValue;
    }
  }

  fileChange(e) {
    const files = e.target["files"];
    if (this.documentId === 0 || !this.documentId) {
      this.uploadFile(files);
    } else {
      this.uploadAppenFile(files);
    }

    $('#files').val('');
  }

  private uploadFile(files:any) {
    this.isSpinning = true;
    const documentTypeDefault =  this.documenType || 1;
    this.signFlowService.uploadFiles(files, documentTypeDefault).subscribe((res) => {
        this.documentId = res.id;
        this.fomatFileUpload(res.filesSign);
        this.isSpinning = false;
    })
  }

  private uploadAppenFile(files:any) {
    this.isSpinning = true;
    this.signFlowService.uploadAppenFiles(files, this.documentId).subscribe((res) => {
      this.fomatFileUpload(res.filesSign);
      this.isSpinning = false;
    });

  }

  private fomatFileUpload(filesSign) {
    const filesSignCopy = [...this.filesSign] || [];
    this.filesSign = filesSignCopy.concat(filesSign);
    this.changeFilesUpload.emit({
      filesSign: this.filesSign,
      documentId: this.documentId
    });
  }

  removeFile(file, index) {
    this.fileSignService.delete(file.id).subscribe((data) => {
      const filesSignCopy = [...this.filesSign];
      filesSignCopy.splice(index, 1);
      this.filesSign = filesSignCopy;
      this.changeFilesUpload.emit({
        filesSign: this.filesSign,
        documentId: this.documentId
      });
    });
  }

  renameFile(file, index) {
    this.fileSignService.update(file.id, file).subscribe((data) => {
      const filesSignCopy = [...this.filesSign];
      filesSignCopy[index] = file;
      this.filesSign = filesSignCopy;
      this.changeFilesUpload.emit({
        filesSign: this.filesSign,
        documentId: this.documentId
      });
    });
  }
}
