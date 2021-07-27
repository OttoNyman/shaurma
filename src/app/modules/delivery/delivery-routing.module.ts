import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryComponent } from './pages/delivery/delivery.component';

const routes: Routes = [
  {
    path: '',
    component: DeliveryComponent,
    data: { authRequired: true, title: 'DELIVERY' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryRoutingModule {}
