import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { AuthInterceptor, ApiPrefixInterceptor, ErrorInterceptor } from '@app/core/interceptors';
import { ApplicationHttpClient, applicationHttpClientCreator } from '@app/core/http';
import { UnsavedChangesGuard } from '@app/core/guards';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NzMessageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    LoadingBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: ApplicationHttpClient,
      useFactory: applicationHttpClientCreator,
      deps: [ HttpClient ]
    },
    { provide: NZ_I18N, useValue: en_US },
    UnsavedChangesGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, '/assets/i18n/', '.json');
}
