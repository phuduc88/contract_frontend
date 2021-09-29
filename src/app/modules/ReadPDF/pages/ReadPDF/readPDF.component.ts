import { AfterViewInit, Component, ViewChild, ElementRef, ViewEncapsulation , ViewContainerRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

//import { PdfView } from './PdfView.component';
@Component({
  selector: 'app-readPDF',
  templateUrl: './readPDF.component.html',
   encapsulation: ViewEncapsulation.None,
  styleUrls: ['./readPDF.component.scss']
})
export class ReadPDFComponent {
 closeResult: string;
 pdfSrc: SafeResourceUrl;
constructor(
    private modalService: NgbModal,
    private viewContainerRef: ViewContainerRef,
    public sanitizer: DomSanitizer) {
  }

  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  files: any[] = [];

  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }


  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log("Upload in progress.");
      return;
    }
    this.files.splice(index, 1);
  }


  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }


  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.fileDropEl.nativeElement.value = "";
    this.uploadFilesSimulator(0);
  }


  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  openScrollableContent(file, longContent) {

    const UrlFile : any = file;
    const reader = new FileReader();
    reader.readAsDataURL(UrlFile);
    reader.onload = () => {
      if(reader.result !== null) {
        let  data : any = reader.result  // base 64
        this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(data);
        this.modalService.open(longContent, { scrollable: true , backdropClass: 'light-blue-backdrop' , size: 'xl' });
      } 
    };
  }
}
