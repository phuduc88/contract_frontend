import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import uuid from 'uuid';

import { ApplicationHttpClient } from '@app/core/http';
import { AuthenticationService } from '@app/core/services/authentication.service';

@Injectable({ providedIn: 'root' })
export class SignOfUserService {
  constructor(
    private http: ApplicationHttpClient,
    private authService: AuthenticationService
  ) {
  }

  public filter(filters = {}) {
    return this.http.getList('/sign-of-user', {
      params: {
        ...filters
      }
    });
  }

  public getEmployeeById(id) {
    return this.http.get(`/sign-of-user/${ id }`);
  }

  public create(body, options = {}) {
    return this.http.post('/sign-of-user', body, options);
  }

  public update(id, body, options = {}) {
    return this.http.post(`/sign-of-user/${ id }`, body, options);
  }

  public updateUseDefault(id, body = {}, options = {}) {
    return this.http.post(`/sign-of-user/use-default/${ id }`, body, options);
  }

  public delete(id) {
    return this.http.delete(`/sign-of-user/${ id }`);
  }
   
}
