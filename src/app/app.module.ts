import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import ru from '@angular/common/locales/ru';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoaderModule } from '@progress/kendo-angular-indicators';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { LangInterceptor } from './core/interceptors/lang.interceptor';
import { ResponseErrorInterceptor } from './core/interceptors/response-error.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { AuthApiMockService } from './modules/auth/services/api/auth-api-mock.service';
import { AuthApiServiceInteface } from './modules/auth/services/api/auth-api.interface';
import { AuthApiRealService } from './modules/auth/services/api/auth-api.service';
import { AuthFacadeService } from './modules/auth/services/auth-facade.service';
import { AuthMapperService } from './modules/auth/services/auth-mapper.service';
import { GeneralModule } from './shared/modules/general/general.module';
import { ErrorComponent } from './shared/pages/error/error.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';

import '@progress/kendo-angular-intl/locales/ru/all';


registerLocaleData(ru);

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ErrorComponent
  ],
  imports: [
    //my modules
    AuthModule,
    AppRoutingModule,
    GeneralModule,
    DialogModule,

    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoaderModule,
    TranslateModule.forRoot({
      defaultLanguage: localStorage.getItem('language') || 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, `${environment.prefix}/assets/lang/`),
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    AuthFacadeService,
    AuthMapperService,
    {
      provide: AuthApiServiceInteface, useFactory: (http: HttpClient) => {
        return environment.useMocks ? new AuthApiMockService() : new AuthApiRealService(http);
      }, deps: [HttpClient]
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LangInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
