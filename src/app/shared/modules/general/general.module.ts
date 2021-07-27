import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { DateService } from './date.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../../core/interceptors/auth.interceptor';
import { LanguageService } from './language.service';


@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    UserService, 
    DateService,
    LanguageService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class GeneralModule { }
