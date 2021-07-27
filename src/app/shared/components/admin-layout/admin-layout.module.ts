import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { DrawerModule } from '@progress/kendo-angular-layout';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { PopupModule } from '@progress/kendo-angular-popup';
import { AuthApiMockService } from 'src/app/modules/auth/services/api/auth-api-mock.service';
import { AuthApiServiceInteface } from 'src/app/modules/auth/services/api/auth-api.interface';
import { AuthApiRealService } from 'src/app/modules/auth/services/api/auth-api.service';
import { AuthFacadeService } from 'src/app/modules/auth/services/auth-facade.service';
import { environment } from 'src/environments/environment';
import { LanguageSelectorModule } from '../language-selector/language-selector.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [AdminLayoutComponent, HeaderComponent, SidebarComponent],
  imports: [
    CommonModule,
    DrawerModule,
    PopupModule,
    ButtonsModule,
    IndicatorsModule,
    ListViewModule,
    RouterModule.forChild([]),
    LanguageSelectorModule,
    TranslateModule
  ],
  exports: [AdminLayoutComponent],
  providers: [AuthFacadeService, {provide: AuthApiServiceInteface, useFactory: (http: HttpClient) => {
    return environment.production ? new AuthApiRealService(http) : new AuthApiMockService()
  }, deps: [HttpClient]}]
})
export class AdminLayoutModule { }
