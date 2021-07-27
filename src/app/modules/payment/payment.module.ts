import { HttpClient } from '@angular/common/http';
import { PaymentFacade } from './services/payment.facade';
import { TranslateModule } from '@ngx-translate/core';
import { FormElementsModule } from 'src/app/shared/modules/form-elements/form-elements.module';
import { DirectivesModule } from './../../core/directives/directives.module';
import { SimpleGridModule } from './../../shared/components/simple-grid/simple-grid.module';
import { PanelModule } from './../../shared/components/panel/panel.module';
import { AdminLayoutModule } from './../../shared/components/admin-layout/admin-layout.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './pages/payment/payment.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { UserService } from 'src/app/shared/modules/general/user.service';
import { PaymentApiService } from './services/api/payment-api.service';
import { environment } from 'src/environments/environment';
import { PaymentApiMockService } from './services/api/payment-api-mock.service';
import { PaymentApiInterface } from './services/api/payment-api.interface';
import { PipesModule } from 'src/app/core/pipes/pipes.module';

@NgModule({
  declarations: [PaymentComponent],
  imports: [
    CommonModule,
    TranslateModule,

    AdminLayoutModule,
    GridModule,
    PaymentRoutingModule,
    PanelModule,
    SimpleGridModule,
    DirectivesModule,
    PipesModule,
    FormElementsModule
  ],

  providers: [
    PaymentFacade,
    DatePipe,
    {
      provide: PaymentApiInterface,
      deps: [HttpClient, UserService, DatePipe],
      useFactory: (http: HttpClient, userService: UserService, datePipe: DatePipe) => {
        return !environment.useMocks
          ? new PaymentApiService(http, userService, datePipe)
          : new PaymentApiMockService();
      },
    },
  ],
})
export class PaymentModule {}
