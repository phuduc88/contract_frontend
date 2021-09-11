import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApplicationHttpClient } from '@app/core/http';
import { District } from '@app/core/models';

@Injectable({ providedIn: 'root' })
export class ThreadedSignTemplateService {

  constructor(private http: ApplicationHttpClient) {
  }

  public filter(filters = {}) {
    return this.http.getList('/threaded-sign-template', {
        params: {
            ...filters
        }
    });
}

public getDetailById(id: string) {
    return this.http.get(`/threaded-sign-template/${id}`, {
    });
}

public create(body, options = {}) {
    return this.http.post('/threaded-sign-template', body, options);
}

public update(id, body, options = {}) {
    return this.http.post(`/threaded-sign-template/${id}`, body, options);
}

public delete(id) {
    return this.http.delete(`/threaded-sign-template/${id}`);
}


}
