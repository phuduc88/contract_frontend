import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApplicationHttpClient } from '@app/core/http';

import { District } from '@app/core/models';


@Injectable({ providedIn: 'root' })
export class FileSignService {

  constructor(private http: ApplicationHttpClient) {
  }

  public update(id, body, options = {}) {
    return this.http.post(`/file-sign/${ id }`, body, options);
  }

  public delete(id) {
    return this.http.delete(`/file-sign/${ id }`);
  }

}
