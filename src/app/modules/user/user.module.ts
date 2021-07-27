import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './pages/user/user.component';
import { PanelModule } from 'src/app/shared/components/panel/panel.module';
import { AdminLayoutModule } from 'src/app/shared/components/admin-layout/admin-layout.module';
import { FormElementsModule } from 'src/app/shared/modules/form-elements/form-elements.module';
import { DirectivesModule } from 'src/app/core/directives/directives.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { UserFacadeService } from './services/user-facade.service';
import { UserMapperService } from './services/user-mapper.service';
import { UserApi } from './services/api/user-api.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserApiService } from './services/api/user-api.service';
import { UserApiMockService } from './services/api/user-api-mock.service';


@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    PanelModule,
	  AdminLayoutModule,
    FormElementsModule,
    DirectivesModule,
	  TranslateModule,
    FormsModule
  ],
  providers: [
    UserFacadeService,
    UserMapperService,
    {
      provide: UserApi,
      useFactory: (http: HttpClient) => {
        return !environment.useMocks ? new UserApiService(http) : new UserApiMockService()
      }, deps: [HttpClient]
    }
  ]
})
export class UserModule { }
