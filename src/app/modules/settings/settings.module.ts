import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { AdminLayoutModule } from 'src/app/shared/components/admin-layout/admin-layout.module';
import { CrudGridModule } from 'src/app/shared/components/crud-grid/crud-grid.module';
import { PanelModule } from 'src/app/shared/components/panel/panel.module';
import { FormElementsModule } from 'src/app/shared/modules/form-elements/form-elements.module';
import { environment } from 'src/environments/environment';
import { SettingsComponent } from './pages/settings/settings.component';
import { SettingsApiMockService } from './services/api/settings-api-mock.service';
import { SettingsApiInterface } from './services/api/settings-api.interface';
import { SettingsApiService } from './services/api/settings-api.service';
import { SettingsFacadeService } from './services/settings-facade.service';
import { SettingsMapperService } from './services/settings-mapper.service';
import { SettingsRoutingModule } from './settings-routing.module';


@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    GridModule,
    DialogModule,

    AdminLayoutModule,
    PanelModule,
    SettingsRoutingModule,
    CrudGridModule,
    FormElementsModule,
    PipesModule
  ],
  providers: [
    SettingsFacadeService,
    SettingsMapperService,
    {
      provide: SettingsApiInterface,
      useFactory: (http: HttpClient) => {
        return !environment.useMocks ? new SettingsApiService(http) : new SettingsApiMockService()
      },
      deps: [HttpClient]
    }
  ]
})
export class SettingsModule { }
