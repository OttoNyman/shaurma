import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LoaderModule } from '@progress/kendo-angular-indicators';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { FloatingLabelModule } from '@progress/kendo-angular-label';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { FormElementsModule } from '../../shared/modules/form-elements/form-elements.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignFormComponent } from './components/sign-form/sign-form.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';



@NgModule({
  declarations: [LoginComponent, AuthLayoutComponent, SigninComponent, LoginFormComponent, SignFormComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,

    NotificationModule,
    ButtonsModule,
    InputsModule,
    FloatingLabelModule,
    LoaderModule,
    FormElementsModule,
    TranslateModule
  ]
})
export class AuthModule { }
