import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmGuard } from 'src/app/core/guards/confirm.guard';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canDeactivate: [ConfirmGuard],
    data: { authRequired: true, title: 'MY_PROFILE' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
