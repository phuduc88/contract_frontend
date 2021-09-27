import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApplicationHttpClient } from '@app/core/http';
import { AuthenticationService } from '@app/core/services/authentication.service';

@Injectable({ providedIn: 'root' })
export class DocumentTemplateDataService {

  constructor(
    private http: ApplicationHttpClient,
    private authService: AuthenticationService
  ) {
  }

  public filter(filters = {}) {
    return this.http.getList('/document-template-data', {
      params: {
        ...filters
      }
    });
  }

  public quickViewDocument(documentTemplateId: string, recordUpload: string) {
    return this.http.get(`/document-template-data/quick-view-document/${ documentTemplateId }/${ documentTemplateId }`);
  }

  public downloadDocument(documentTemplateId: string, recordUpload: string) {
    return this.http.getFile(`/document-template-data/download-document/${ documentTemplateId }/${ recordUpload }`, {
      headers: {
        token: this.authService.getCredentialToken()
      }
    });
  }

  public delete(documentTemplateId, recordUpload) {
    return this.http.delete(`/document-template-data/${ documentTemplateId }/${ recordUpload }`);
  }

}
