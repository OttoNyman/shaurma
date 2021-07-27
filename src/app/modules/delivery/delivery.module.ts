import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import {DeliveryRoutingModule} from './delivery-routing.module';
import {DeliveryComponent} from './pages/delivery/delivery.component';
import {AdminLayoutModule} from 'src/app/shared/components/admin-layout/admin-layout.module';
import {PanelModule} from 'src/app/shared/components/panel/panel.module';
import {TranslateModule} from '@ngx-translate/core';
import {DeliveryFacadeService} from './services/delivery-facade.service';
import {DeliveryMapperService} from './services/delivery-mapper.service';
import {DeliveryApiInterface} from './services/api/delivery-api.interface';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {DeliveryApiService} from './services/api/delivery-api.service';
import {DeliveryApiMockService} from './services/api/delivery-api-mock.service';
import {SimpleGridModule} from 'src/app/shared/components/simple-grid/simple-grid.module';
import {GridModule} from '@progress/kendo-angular-grid';
import {DirectivesModule} from 'src/app/core/directives/directives.module';
import {FormElementsModule} from 'src/app/shared/modules/form-elements/form-elements.module';
import {PipesModule} from 'src/app/core/pipes/pipes.module';
import {ButtonsModule} from '@progress/kendo-angular-buttons';
import {PDFExportModule} from '@progress/kendo-angular-pdf-export';

@NgModule({
    declarations: [DeliveryComponent],
    imports: [
        CommonModule,
        TranslateModule,
        GridModule,
        ButtonsModule,
        PDFExportModule,

        AdminLayoutModule,
        PanelModule,
        DeliveryRoutingModule,
        SimpleGridModule,
        DirectivesModule,
        PipesModule,
        FormElementsModule
    ],
    providers: [
        DeliveryFacadeService,
        DeliveryMapperService,
        DatePipe,
        {
            provide: DeliveryApiInterface,
            useFactory: (http: HttpClient) => {
                return !environment.useMocks
                    ? new DeliveryApiService(http)
                    : new DeliveryApiMockService();
            },
            deps: [HttpClient],
        },
    ],
})
export class DeliveryModule {
}
