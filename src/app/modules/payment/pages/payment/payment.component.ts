import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ResponseStatus } from 'src/app/core/constants/ResponseStatus';
import { OrderItemDto } from 'src/app/core/dto/OrderItemDto';
import { PaymentDto } from 'src/app/core/dto/PaymentDto';
import { AppNotificationService } from 'src/app/shared/modules/general/notification.service';
import { LanguageService } from './../../../../shared/modules/general/language.service';
import { PaymentFacade } from './../../services/payment.facade';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  lang: string | undefined = undefined;

  current = {
    loading: false,
    items: [] as Array<OrderItemDto>,
  };

  loading = false;
  payment: PaymentDto = null;

  constructor(
    private paymentFacade: PaymentFacade,
    private langSvc: LanguageService,
    private notSvc: AppNotificationService,
    private translateSvc: TranslateService,
    private titleSvc: Title
  ) { }

  get currentTotalPrice() {
    return this.current.items.reduce((acc, order) => acc + order.amount, 0);
  }

  ngOnInit(): void {
    this.langSvc.getLanguage().subscribe((newLang) => (this.lang = newLang));

    this.current.loading = true;
    this.paymentFacade.getCurrent().subscribe(resp => {
      if(resp.status == ResponseStatus.OK)
        this.current = { loading: false, items: resp.data }
      else
        this.notSvc.showHttpErrors(resp.errors);

      this.current.loading = false;
    });

    this.loading = true;
    this.paymentFacade.getPayment().subscribe(
      resp => {
        if(resp.status == ResponseStatus.OK)
					this.payment = resp.data;
				else
					this.notSvc.showHttpErrors(resp.errors);

        this.loading = false;
      }
    );

    this.translateSvc.get('PAYMENT').subscribe(res => this.titleSvc.setTitle(res));
  }
}
