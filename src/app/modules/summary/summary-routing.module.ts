import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { SummaryComponent } from './pages/summary/summary.component';

const routes: Routes = [
  {
    path: '',
    component: SummaryComponent,
    canActivate: [AuthGuard],
    data: {requiredAuth: true, title: 'SUMMARY'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SummaryRoutingModule { }
