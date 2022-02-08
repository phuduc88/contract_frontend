import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { eventEmitter } from '@app/shared/utils/event-emitter';
import { ApplicationHttpClient } from '@app/core/http';
import { AuthenticationService } from '@app/core/services/authentication.service';

@Injectable({ providedIn: 'root' })
export class CancelDocumentService {

    constructor(private http: ApplicationHttpClient,
    private authService: AuthenticationService,) {
    }

    public filter(filters = {}) {
        return this.http.getList('/cancel-document', {
            params: {
                ...filters
            }
        });
    }
    public getDetail(id: string) {
        return this.http.get(`/cancel-document/${id}`, {
        });
    }
    
    public create(documentId, formdata) {
        return this.http.post(`/cancel-document/${ documentId }`, formdata).pipe(
            map(detail => {
              return detail;
            })
          );
    }

    public restore(documentId: string) {
        return this.http.get(`/cancel-document/restore/${documentId}`, {
        });
    }
    public update(id, body, options = {}) {
        return this.http.post(`/cancel-document/${id}`, body, options);
    }

    public delete(id) {
        return this.http.delete(`/cancel-document/${id}`);
    }

    public downloadDocumentCancel(documentId: string ) {
        return this.http.getFile(`/cancel-document/download/${ documentId }`, {
          headers: {
            token: this.authService.getCredentialToken()
          }
        });
    }

    public quickViewDocument(documentId: string) {
        return this.http.get(`/cancel-document/quick-view-document/${ documentId }`);
    }
}
