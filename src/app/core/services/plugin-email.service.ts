import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { eventEmitter } from '@app/shared/utils/event-emitter';
import { ApplicationHttpClient } from '@app/core/http';
import { AuthenticationService } from '@app/core/services/authentication.service';

@Injectable({ providedIn: 'root' })
export class PluginEmailService {

    constructor(private http: ApplicationHttpClient,
    private authService: AuthenticationService,) {
    }

    public filter(filters = {}) {
        return this.http.getList('/plugin-email', {
            params: {
                ...filters
            }
        });
    }

    public getPluginDefaul() {
        return this.http.get(`/plugin-email/config`, {
        });
    }
    public getDetail(id: string) {
        return this.http.get(`/plugin-email/${id}`, {
        });
    }

    public create(body, options = {}) {
        return this.http.post('/plugin-email', body, options);
    }

    public update(id, body, options = {}) {
        return this.http.post(`/plugin-email/${id}`, body, options);
    }

    public delete(id) {
        return this.http.delete(`/plugin-email/${id}`);
    }
}
