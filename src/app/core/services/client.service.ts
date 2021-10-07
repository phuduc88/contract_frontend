import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { eventEmitter } from '@app/shared/utils/event-emitter';
import { ApplicationHttpClient } from '@app/core/http';
import { AuthenticationService } from '@app/core/services/authentication.service';

@Injectable({ providedIn: 'root' })
export class ClientService {

    constructor(private http: ApplicationHttpClient,
    private authService: AuthenticationService,) {
    }

    public filter(filters = {}) {
        return this.http.getList('/clients', {
            params: {
                ...filters
            }
        });
    }

    public clientSuggestion(filters = {}) {
        return this.http.getList('/clients/research', {
          params: {
            ...filters
          }
        }).pipe(
          map(categories => {
            return categories.data
          })
        );
      }

    public getDetailById(id: string) {
        return this.http.get(`/clients/${id}`, {
        });
    }

    public create(body, options = {}) {
        return this.http.post('/clients', body, options);
    }

    public update(id, body, options = {}) {
        return this.http.post(`/clients/${id}`, body, options);
    }

    public delete(id) {
        return this.http.delete(`/clients/${id}`);
    }

    public uploadFile(documents) {
        const formdata = this.getFormData(documents);
        return this.http.post(`/clients/upload`, formdata);
    }

    public downloadExcelTemplate() {
        return this.http.getFile(`/clients/download-template`, {
          headers: {
            token: this.authService.getCredentialToken()
          }
        });
      }

    public getOrganizationByTax(id?: any) {
        return new Promise((resolve, reject) => {
            try {
                // eventEmitter.emit('saveData:loading', true);
                const xhr = new XMLHttpRequest();
                xhr.open('GET',  'https://hoadon.newinvoice.vn/tracuu/companies/' + id);
                xhr.responseType = 'json';
                xhr.setRequestHeader('X-Authorization-Token', 'NewInvoice');
                xhr.onload = function() {
                    if (xhr.status === 200 && xhr.response && xhr.response.data) {
                        resolve(xhr.response.data);
                        eventEmitter.emit('saveData:loading', false);
                    } else {
                        reject();
                        eventEmitter.emit('saveData:loading', false);
                    }
                };
                xhr.send();
                
            } catch (error) {
                reject(error);
                // eventEmitter.emit('saveData:loading', false);
            }
        });
    }

    private getFormData(documents) {
        const formdata = new FormData();
        if(!documents) {
          return formdata;
        }
    
        for (let i = 0; i < documents.length; i++) {
          formdata.append(documents[i].name, documents[i]);
        }
        return formdata;
      }

}
