import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { eventEmitter } from '@app/shared/utils/event-emitter';
import { ApplicationHttpClient } from '@app/core/http';
import { AuthenticationService } from '@app/core/services/authentication.service';

@Injectable({ providedIn: 'root' })
export class PluginSMSService {

    constructor(private http: ApplicationHttpClient,
    private authService: AuthenticationService,) {
    }

    public filter(filters = {}) {
        return this.http.getList('/plugin-sms', {
            params: {
                ...filters
            }
        });
    }


    public getDetail(id: string) {
        return this.http.get(`/plugin-sms/${id}`, {
        });
    }

    public getPluginDefaul() {
        return this.http.get(`/plugin-sms/config`, {
        });
    }

    public create(body, options = {}) {
        return this.http.post('/plugin-sms', body, options);
    }

    public update(id, body, options = {}) {
        return this.http.post(`/plugin-sms/${id}`, body, options);
    }

    public delete(id) {
        return this.http.delete(`/plugin-sms/${id}`);
    }
}
