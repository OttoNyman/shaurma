import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmGuard } from 'src/app/core/guards/confirm.guard';
import { OrderComponent } from './pages/order/order.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    canDeactivate: [ConfirmGuard],
    data: { authRequired: true, title: 'MY_ORDER' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
