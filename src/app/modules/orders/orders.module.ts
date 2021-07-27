import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { DirectivesModule } from 'src/app/core/directives/directives.module';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { AdminLayoutModule } from 'src/app/shared/components/admin-layout/admin-layout.module';
import { PanelModule } from 'src/app/shared/components/panel/panel.module';
import { SimpleGridModule } from 'src/app/shared/components/simple-grid/simple-grid.module';
import { FormElementsModule } from 'src/app/shared/modules/form-elements/form-elements.module';
import { UserService } from 'src/app/shared/modules/general/user.service';
import { environment } from 'src/environments/environment';
import { NewOrderFormComponent } from './components/new-order-form/new-order-form.component';
import { PriceBlockComponent } from './components/pricelist/price-block/price-block.component';
import { PricelistComponent } from './components/pricelist/pricelist.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderComponent } from './pages/order/order.component';
import { OrderApiMockService } from './services/api/order-api-mock.service';
import { OrderApiInterface } from './services/api/order-api.interface';
import { OrderApiService } from './services/api/order-api.service';
import { OrderFacade } from './services/order.facade';


@NgModule({
  declarations: [
    OrderComponent,
    PriceBlockComponent,
    PricelistComponent,
    NewOrderFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ListViewModule,
    GridModule,
    InputsModule,
    TranslateModule,
    DialogModule,

    OrdersRoutingModule,
    AdminLayoutModule,
    PanelModule,
    FormElementsModule,
    SimpleGridModule,
    DirectivesModule,
    PipesModule
  ],
  providers: [
    OrderFacade,
    DatePipe,
    {
      provide: OrderApiInterface, 
      deps: [HttpClient, UserService, DatePipe],
      useFactory: (http: HttpClient, userService: UserService, datePipe: DatePipe) => {
        return !environment.useMocks ? new OrderApiService(http, userService, datePipe) : new OrderApiMockService()
      }
    }
  ],
})
export class OrdersModule { }
