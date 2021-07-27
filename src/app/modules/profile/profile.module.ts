import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from 'src/app/core/directives/directives.module';
import { FormElementsModule } from 'src/app/shared/modules/form-elements/form-elements.module';
import { environment } from 'src/environments/environment';
import { AdminLayoutModule } from '../../shared/components/admin-layout/admin-layout.module';
import { PanelModule } from '../../shared/components/panel/panel.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileApiMockService } from './services/api/profile-api-mock.service';
import { ProfileApi } from './services/api/profile-api.interface';
import { ProfileApiService } from './services/api/profile-api.service';
import { ProfileFacadeService } from './services/profile-facade.service';
import { ProfileMapperService } from './services/profile-mapper.service';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
	  PanelModule,
	  AdminLayoutModule,
    FormElementsModule,
    DirectivesModule,

	  TranslateModule,
    FormsModule
  ],
  providers: [
    ProfileFacadeService,
    ProfileMapperService,
    {
      provide: ProfileApi,
      useFactory: (http: HttpClient) => {
        return !environment.useMocks ? new ProfileApiService(http) : new ProfileApiMockService()
      }, deps: [HttpClient]
    }
  ]
})
export class ProfileModule { }
