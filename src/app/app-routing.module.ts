import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { UserGuard } from './core/guards/user.guard';
import { OrdersModule } from './modules/orders/orders.module';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'order',
    canActivate: [AuthGuard],
    data: { authRequired: true, animation: 'order' },
    loadChildren: () => OrdersModule
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    data: { authRequired: true, animation: 'profile' },
    loadChildren: () =>
      import('./modules/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'payment',
    canActivate: [AuthGuard],
    data: { authRequired: true, animation: 'payment' },
    loadChildren: () =>
      import('./modules/payment/payment.module').then((m) => m.PaymentModule),
  },
  {
    path: 'delivery',
    canActivate: [AuthGuard],
    data: { authRequired: true, animation: 'delivery' },
    loadChildren: () =>
      import('./modules/delivery/delivery.module').then((m) => m.DeliveryModule),
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    data: { authRequired: true, animation: 'settings' },
    loadChildren: () =>
      import('./modules/settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'summary',
    canActivate: [AuthGuard],
    data: { authRequired: true, animation: 'summary' },
    loadChildren: () =>
      import('./modules/summary/summary.module').then((m) => m.SummaryModule),
  },
  {
    path: 'user/:id',
    canActivate: [AuthGuard, UserGuard],
    data: { authRequired: true, animation: 'user' },
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule)
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
