import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthenticationService, SignFlowService, DocumentTypeService } from '@app/core/services';
import orderBy from 'lodash/orderBy';
@Component({
  selector: "app-document-detail",
  templateUrl: "./document-detail.component.html",
  styleUrls: ["./document-detail.component.less"],
})
export class DocumentDetailComponent implements OnInit {
  documentId: any;
  document: any;
  verifyCode: any;
  privateKey: any;
  dateCreate: any;
  filesSign: any;
  employeesSign: any;
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private signFlowService: SignFlowService,
  ) { }
  ngOnInit() {
    this.documentId = this.route.snapshot.params.id;
    this.loadDocumentDetail(this.documentId);
  }

  back() {
    this.router.navigate(['/manage-documents/']);
  }


  private loadDocumentDetail(documentId) {
    this.signFlowService.getDetail(documentId).subscribe((data) => {
      this.document = data;
      this.verifyCode = this.document.id;
      this.privateKey = this.document.private;
      this.dateCreate = this.document.dateCreate;
      this.employeesSign = data.employeesSign;
      this.filesSign = this.mergeFileSign(data.filesSign);
      console.log(this.filesSign);
    });
  }


  private mergeFileSign(filesSign) {
    const filesSignCopy = [...filesSign];
    filesSignCopy.forEach(item => {
        item.employeesSignDetail = [];
        this.employeesSign.forEach(empSign => {
          const employeeSignFile = empSign.employeesSignDetail.filter(p => p.fileSignId === item.id);
          if (!employeeSignFile || employeeSignFile.length === 0) {
            return;
          }
          const empSignCopy = {...empSign};
          empSignCopy.employeesSignDetail = orderBy(employeeSignFile, 'page', 'asc');
          item.employeesSignDetail.push(empSignCopy);
        });
    });

    return filesSignCopy;
  }

   
}
