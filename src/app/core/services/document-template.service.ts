import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApplicationHttpClient } from '@app/core/http';
import { AuthenticationService } from '@app/core/services/authentication.service';

@Injectable({ providedIn: 'root' })
export class DocumentTemplateService {

  constructor(
    private http: ApplicationHttpClient,
    private authService: AuthenticationService
  ) {
  }

  public filter(filters = {}) {
    return this.http.getList('/document-template', {
      params: {
        ...filters
      }
    });
  }

  public getDetail(id) {
    return this.http.get(`/document-template/${ id }`);
  }

  public uploadContract(documents) {
    const formdata = this.getFormData(documents);
    return this.http.post('/document-template/upload-bookmark', formdata);
  }

  public updateDataImport(id, body, options = {}) {
    return this.http.post(`/document-template/update-data-import/${ id }`, body, options);
  }

  public uploadFileData(id, documents) {
    const formdata = this.getFormData(documents);
    return this.http.post(`/document-template/upload-excel/${ id }`, formdata);
  }

  public uploadReceiverData(id, documents) {
    const formdata = this.getFormData(documents);
    return this.http.post(`/document-template/upload-receiver-excel/${ id }`, formdata);
  }

  public downloadExcelBookmark(documentTemplateId: string ) {
    return this.http.getFile(`/document-template/download-excel-book-mark/${ documentTemplateId }`, {
      headers: {
        token: this.authService.getCredentialToken()
      }
    });
  }

  public downloadExcelReceiver() {
    return this.http.getFile(`/document-template/download-excel-receiver-template`, {
      headers: {
        token: this.authService.getCredentialToken()
      }
    });
  }

  public downloadTemplate(documentTemplateId: string ) {
    return this.http.getFile(`/document-template/download-template/${ documentTemplateId }`, {
      headers: {
        token: this.authService.getCredentialToken()
      }
    });
  }

  public delete(id) {
    return this.http.delete(`/document-template/${ id }`);
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
   
}
