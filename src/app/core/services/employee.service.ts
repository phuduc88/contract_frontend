import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import uuid from 'uuid';

import { ApplicationHttpClient } from '@app/core/http';
import { AuthenticationService } from '@app/core/services/authentication.service';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(
    private http: ApplicationHttpClient,
    private authService: AuthenticationService
  ) {
  }

  public getEmployeeTrees(filters = {}) {
    return this.http.get('/employees/tree', {
      params: {
        ...filters
      }
    }).pipe(
      map(employees => {
        return employees;
      })
    );
  }

  public upload(body, options: any = {}) {
    options.displayLoading = true;
    return this.http.post('/employees/upload', body, options);
  }

  public getEmployees(filters = {}) {
    return this.http.getList('/employees', {
      params: {
        ...filters
      }
    });
  }

  public getEmployeeById(id) {
    return this.http.get(`/employees/${ id }`);
  }

  public getPressCreate() {
    return this.http.get('/employees/press-create');
  }

  public create(body, options = {}) {
    return this.http.post('/employees', body, options);
  }

  public update(id, body, options = {}) {
    return this.http.post(`/employees/${ id }`, body, options);
  }

  public delete(id) {
    return this.http.delete(`/employees/${ id }`);
  }

  public download(employeeId: string ) {
    return this.http.getFile(`/employees/download/${ employeeId }`, {
      headers: {
        token: this.authService.getCredentialToken()
      }
    });
  }
}
