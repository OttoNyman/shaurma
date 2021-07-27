import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard], data: {animation: 'login'}},
  {path: 'sign', component: SigninComponent, canActivate: [AuthGuard], data: {animation: 'sign'}},
  { path: '', redirectTo: 'order', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
