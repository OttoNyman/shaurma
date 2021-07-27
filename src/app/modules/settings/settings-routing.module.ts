import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmGuard } from 'src/app/core/guards/confirm.guard';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  {
    path: '', 
    component: SettingsComponent,
    canDeactivate: [ConfirmGuard],
    data: {authRequired: true, title: 'SETTINGS'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
