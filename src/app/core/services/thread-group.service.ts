import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApplicationHttpClient } from '@app/core/http';

import { District } from '@app/core/models';


@Injectable({ providedIn: 'root' })
export class ThreadGroupService {

  constructor(private http: ApplicationHttpClient) {
  }

  public filter(filters = {}) {
    return this.http.getList('/thread-group', {
        params: {
            ...filters
        }
    });
}

public getDetailById(id: string) {
    return this.http.get(`/thread-group/${id}`, {
    });
}

public create(body, options = {}) {
    return this.http.post('/thread-group', body, options);
}

public update(id, body, options = {}) {
    return this.http.post(`/thread-group/${id}`, body, options);
}

public delete(id) {
    return this.http.delete(`/thread-group/${id}`);
}


}
