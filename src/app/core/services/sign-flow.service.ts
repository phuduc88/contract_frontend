
import { Injectable } from '@angular/core';
import { GetIcon } from '@app/shared/constant';
import { ApplicationHttpClient } from '@app/core/http';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '@app/core/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class SignFlowService {
  constructor(private http: ApplicationHttpClient,
    private authService: AuthenticationService) {
  }

  uploadFiles(documents, documentType) {
    const formdata = this.getFormData(documents);
    return this.http.post(`/document-sign/upload/${ documentType }`, formdata).pipe(
      map(detail => {
        const documentSign = detail;
        documentSign.filesSign = this.setIconFilesSign(detail.filesSign);
        if (!detail.employeesSign) {
          documentSign.employeesSign = [];
        }
        return documentSign;
      })
    );
  }

  uploadAppenFiles(documents, documentId) {
    const formdata = this.getFormData(documents);
    return this.http.post(`/document-sign/upload-appen/${ documentId }`, formdata).pipe(
      map(detail => {
        const documentSign = detail;
        documentSign.filesSign = this.setIconFilesSign(detail.filesSign);
        if (! detail.employeesSign) {
          documentSign.employeesSign = [];
        }

        return documentSign;
      })
    );
  }

  private getFormData(documents) {
    const formdata = new FormData();
    if(!documents) {
      return formdata;
    }

    for (let i = 0; i < documents.length; i++) {
      formdata.append(documents[i].name, documents[i]);
    }
    return formdata;
  }

  employeeSign(request) {
    return this.http.post('/document-sign/employee-sing/' + request.id, request).pipe(
      map(detail => {
        const documentSign = detail;
        documentSign.filesSign = this.setIconFilesSign(detail.filesSign);
        return documentSign;
      })
    );
  }

  signaturePosition(request) {
    return this.http.post('/document-sign/signature-position/' + request.id, request).pipe(
      map(detail => {
        const documentSign = detail;
        documentSign.filesSign = this.setIconFilesSign(detail.filesSign);
        return documentSign;
      })
    );
  }

  signDocument(documentId) {
    return this.http.post(`/document-sign/sign/${ documentId }`, {});
  }

  public downloadFileSign(documentId: string ) {
    return this.http.getFile(`/document-sign/dowload-sign-temp/${ documentId }`, {
      headers: {
        token: this.authService.getCredentialToken()
      }
    });
  }

  public downloadDocumentSign(documentId: string ) {
    return this.http.getFile(`/document-sign/download-file/${ documentId }`, {
      headers: {
        token: this.authService.getCredentialToken()
      }
    });
  }

  public filter(filters = {}) {
    return this.http.getList('/document-sign', {
      params: {
        ...filters
      }
    });
  }

  public getDetail(id: string) {
    return this.http.get(`/document-sign/${ id }`).pipe(
      map(detail => {
      const documentSign = detail;
      documentSign.filesSign = this.setIconFilesSign(detail.filesSign);
      return documentSign;
    })
    );
  }

  private setIconFilesSign(filesSign) {
    const filesFomat = [];
    if (!filesSign) {
      return filesFomat;
    }
    filesSign.forEach((item) => {
      filesFomat.push({
        ...item,
        icon: GetIcon(item.fileSourceType),
        fileSize: Math.ceil(item.fileSize / 1024),
      });
    });
    return filesFomat;
  }

}
