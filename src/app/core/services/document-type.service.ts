import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApplicationHttpClient } from '@app/core/http';


@Injectable({ providedIn: 'root' })
export class DocumentTypeService {

  constructor(private http: ApplicationHttpClient) {
  }

  public filter(filters = {}) {
    return this.http.getList('/document-type', {
      params: {
        ...filters
      }
    });
  }

  public create(body, options = {}) {
    return this.http.post('/document-type', body, options);
  }

  public update(id, body, options = {}) {
    return this.http.post(`/document-type/${ id }`, body, options);
  }

  public delete(id) {
    return this.http.delete(`/document-type/${ id }`);
  }
   
}
