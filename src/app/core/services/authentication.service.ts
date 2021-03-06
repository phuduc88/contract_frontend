import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApplicationHttpClient } from '@app/core/http'
import { Credential } from '@app/core/models';
import { PERMISSIONS, ROLE } from '@app/shared/constant';

const CREDENTIAL_STORAGE = 'CREDENTIALS';
const REMEMBERME_STORAGE = 'REMEMBERME';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private credentialSubject: BehaviorSubject<Credential>;
  public credentials: Observable<Credential>;
  public hubProxy: any;
  public statusConnetionHub: boolean = false;
  constructor(private http: ApplicationHttpClient) {
    this.credentialSubject = new BehaviorSubject<Credential>(JSON.parse(localStorage.getItem(CREDENTIAL_STORAGE)));
    this.credentials = this.credentialSubject.asObservable();
  }

  public get currentCredentials(): Credential {
    return JSON.parse(localStorage.getItem(CREDENTIAL_STORAGE));
  }

  public login(userId: string, password: string): Observable<any> {
    return this.http.post('/session/login', {
      userId,
      password
    })
      .pipe(
        map(data => {
          return this.storeCredentials(data);
        })
      );
  }

  public logout() {
    this.http.delete('/session/logout').toPromise();

    localStorage.removeItem(CREDENTIAL_STORAGE);
    this.credentialSubject.next(null);
  }

  public requestResetPassword(email: string) {
    return this.http.post('/session/reset-password', { email });
  }

  public getVerificationToken(token: string) {
    return this.http.get(`/session/verification-code/${ token }`, {
    });
  }

  public getUserByToken(token: string) {
    return this.http.get('/session/account-info', {
      params: { token }
    });
  }

  public resetPassword(token: string, password: string, confirmPassword: string) {
    return this.http.post(`/session/change-password?token=${token}`, {
      password,
      confirmPassword
    });
  }

  public getCredentialToken() {
    const currentCredentials = this.currentCredentials;

    if (currentCredentials && currentCredentials.token) {
      return currentCredentials.token;
    }
  }

  public storeCredentials(data) {
    if (!data) {
      localStorage.removeItem(CREDENTIAL_STORAGE);
      return data;
    }
    const credentials: Credential = {
      id: data.id,
      token: data.token,
      username: data.username,
      email: data.email,
      currentDate: data.currentDate,
      company: data.company,
      role: data.role,
      userId: data.userId,
      signatureImage: data.signatureImage,
      systemConfig: data.systemConfig,
      permissions: this.setPermissions(data.role),
    };

    localStorage.setItem(CREDENTIAL_STORAGE, JSON.stringify(credentials));

    this.credentialSubject.next(credentials);
    return credentials;
  }

  setPermissions(roles) {
    let permissions = {};
    if (roles) {
      const userPermissions = roles.permission;
      userPermissions.forEach((screenName) => {
          permissions[screenName] = true;
      });

      if (roles.level === ROLE.CUSTOMER || roles.level === ROLE.USER_CUSTOMER) {
        permissions[PERMISSIONS.dashboard] = true;
      }
    }

    return permissions;
  }

  public updateCompanyInStorage(company) {
    const credentials = JSON.parse(localStorage.getItem(CREDENTIAL_STORAGE));
    credentials.company = company;
    localStorage.setItem(CREDENTIAL_STORAGE, JSON.stringify(credentials));
    this.credentialSubject.next(credentials);
  }

  public updateSystemConfigInStorage(systemConfig) {
    const credentials = JSON.parse(localStorage.getItem(CREDENTIAL_STORAGE));
    credentials.systemConfig = systemConfig;
    localStorage.setItem(CREDENTIAL_STORAGE, JSON.stringify(credentials));
    this.credentialSubject.next(credentials);
  }

  public saveRememberMe(objectLoginFrom) {
    if (objectLoginFrom.remember) {
      localStorage.setItem(REMEMBERME_STORAGE, JSON.stringify(objectLoginFrom));
    } else {
      localStorage.removeItem(REMEMBERME_STORAGE);
    }    
  }

  public getAutoLogin() {
    return JSON.parse(localStorage.getItem(REMEMBERME_STORAGE));
  } 
}
