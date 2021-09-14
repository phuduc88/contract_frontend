import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApplicationHttpClient } from '@app/core/http';

import { District } from '@app/core/models';


@Injectable({ providedIn: 'root' })
export class SystemConfigService {

  constructor(private http: ApplicationHttpClient) {
  }

  public filter(filters = {}) {
    return this.http.getList('/system-config', {
        params: {
            ...filters
        }
    });
}

public GetDetail(id: string) {
    return this.http.get(`/system-config/${id}`, {
    });
}

public ConfigSendEmail(body, options = {}) {
    return this.http.post('/system-config/config-email-send', body, options);
}

public ConfigLanguage(body, options = {}) {
    return this.http.post('/system-config/config-language', body, options);
}

public ConfigLogin(body, options = {}) {
    return this.http.post('/system-config/config-login', body, options);
}

}
