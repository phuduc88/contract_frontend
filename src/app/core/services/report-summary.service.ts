import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { eventEmitter } from '@app/shared/utils/event-emitter';
import { ApplicationHttpClient } from '@app/core/http';


@Injectable({ providedIn: 'root' })
export class ReportSummaryService {

  constructor(private http: ApplicationHttpClient) {
  }

  public getList(filters = {}) {
    return this.http.getList('/report-summary', {
      params: {
        ...filters
      }
    });
  }

  public getContractProcess() {
    return this.http.get('/report-summary/contract-process', {
    });
  }

  public getConuserCreated() {
    return this.http.get('/report-summary/user-created', {
    });
  }

  public getContractVendor() {
    return this.http.get('/report-summary/contract-vendor', {
    });
  }
   
}
