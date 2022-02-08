import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApplicationHttpClient } from '@app/core/http'; 


@Injectable({ providedIn: 'root' })
export class DocumentEmailService {

  constructor(private http: ApplicationHttpClient) {
  }

  public filter(filters = {}) {
    return this.http.getList('/document-email', {
      params: {
        ...filters
      }
    });
  }

  public sendEmail(body, options = {}) {
    return this.http.post('/document-email/send', body, options);
  }

  public sendEmailVerifiedCode(body, options = {}) {
    return this.http.post('/document-email/send-verified-code', body, options);
  } 

  public delete(id) {
    return this.http.delete(`/document-email/${ id }`);
  }

  public signSim(body, options = {}) {
    return this.http.post('/document-email/sign-sim', body, options);
  }

  public signHSM(body, options = {}) {
    return this.http.post('/document-email/sign-hsm', body, options);
  }
   
}
