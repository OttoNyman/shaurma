import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { GridModule } from '@progress/kendo-angular-grid';
import { DirectivesModule } from 'src/app/core/directives/directives.module';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { AdminLayoutModule } from 'src/app/shared/components/admin-layout/admin-layout.module';
import { PanelModule } from 'src/app/shared/components/panel/panel.module';
import { SimpleGridModule } from 'src/app/shared/components/simple-grid/simple-grid.module';
import { FormElementsModule } from 'src/app/shared/modules/form-elements/form-elements.module';
import { environment } from 'src/environments/environment';
import { SummaryComponent } from './pages/summary/summary.component';
import { SummaryApiMockService } from './services/api/summary-api-mock.service';
import { SummaryApiInterface } from './services/api/summary-api.interface';
import { SummaryApiService } from './services/api/summary-api.service';
import { SummaryFacadeService } from './services/summary-facade.service';
import { SummaryMapperService } from './services/summary-mapper.service';
import { SummaryRoutingModule } from './summary-routing.module';
import { InputWithBtnComponent } from './components/input-with-btn/input-with-btn.component';



@NgModule({
  declarations: [
    SummaryComponent,
    InputWithBtnComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    GridModule,

    AdminLayoutModule,
    PanelModule,
    FormElementsModule,
    DirectivesModule,
    SummaryRoutingModule,
    SimpleGridModule,
    PipesModule
  ],
  providers: [
    DatePipe,
    SummaryMapperService,
    SummaryFacadeService,
    {
      provide: SummaryApiInterface,
      useFactory: (http: HttpClient) => {
        return environment.useMocks ? new SummaryApiMockService() : new SummaryApiService(http);
      },
      deps: [HttpClient]
    }
  ]
})
export class SummaryModule { }
