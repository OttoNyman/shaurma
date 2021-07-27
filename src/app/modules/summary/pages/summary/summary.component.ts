import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { merge, Subject, Subscription, timer } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { OrderStatus } from 'src/app/core/constants/OrderStatus';
import { ResponseStatus } from 'src/app/core/constants/ResponseStatus';
import { OrderStatusDto } from 'src/app/core/dto/OrderStatusDto';
import { OrderSummaryDto } from 'src/app/core/dto/OrderSummaryDto';
import { OrderSummaryInfoDto } from 'src/app/core/dto/OrderSummaryInfoDto';
import { ProfileDto } from 'src/app/core/dto/ProfileDto';
import { ISelectItem } from 'src/app/shared/modules/form-elements/select/select.component';
import { LanguageService } from 'src/app/shared/modules/general/language.service';
import { AppNotificationService } from 'src/app/shared/modules/general/notification.service';
import { UserService } from 'src/app/shared/modules/general/user.service';
import { environment } from 'src/environments/environment';
import { SummaryFacadeService } from '../../services/summary-facade.service';
import { SummaryMapperService } from '../../services/summary-mapper.service';


type Info<T> = {
  loading: boolean,
  data: T
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  //data
  currentCashierInfo: Info<ProfileDto> = { loading: false, data: null };
  orderStatusInfo: Info<OrderStatusDto> = { loading: false, data: null };
  orderSummaryInfo: Info<OrderSummaryInfoDto> = { loading: false, data: null };
  selectedDate: Date = new Date();
  isStateChanged = false;
  endTime: Date = null;
  lang: string | undefined = undefined;

  //subjects and subs for observables
  orderSummaryInfoSubj: Subject<void> = new Subject;
  summaryOrderSubj: Subject<{ page: number, pageSize: number }> = new Subject;
  currentCashierSubj: Subject<void> = new Subject;

  orderSummaryInfoSubscription: Subscription;
  summaryOrderSubscription: Subscription;
  currentCashierSubscription: Subscription;
  orderStatusSubscription: Subscription;

  dialog = {
    opened: false,
    order: null as OrderSummaryDto
  };

  summaryOrder = {
    size: 5,
    page: 1,
    pageSizes: [5, 10, 20],
    loading: false,
    items: {
      total: 0,
      data: [] as Array<OrderSummaryDto>
    }
  };

  get cashierSelect() {
    return this.currentCashierInfo.data ? this.summaryMapper.fromCashierToSelect(this.currentCashierInfo.data.user) : null;
  }

  get currentOrderCashier() {
    return this.orderSummaryInfo.data?.cashier;
  }

  get paymentMethods(): string {
    const payments = this.currentCashierInfo.data?.payments;
    let paymentMethods = [] as string[];

    if (payments?.cash)
      paymentMethods.push('Cash');

    if (payments?.card)
      paymentMethods.push('Credit card');

    return paymentMethods.join(', ');
  }

  get isCashier() {
    return this.userService.getUser().value.isCashier;
  }

  get isCurrentOrderCashier() {
    return this.currentOrderCashier?.id == this.userService.getUser().value.id;
  }

  get isClosed() {
    return this.orderStatusInfo.data?.status == OrderStatus.CLOSED;
  }

  get endData() {
    return { date: this.datePipe.transform(this.orderStatusInfo.data?.endTime, 'shortTime', undefined, this.lang) };
  }

  get selectedToday() {
    const currentDate = new Date();

    return currentDate.getDate() == this.selectedDate.getDate() &&
      currentDate.getMonth() == this.selectedDate.getMonth() &&
      currentDate.getFullYear() == this.selectedDate.getFullYear()
  }

  get totalRest() {
    return Math.max(this.orderSummaryInfo.data?.totalPayed - (this.orderSummaryInfo.data?.totalCost - this.orderSummaryInfo.data?.totalDebt), 0);
  }

  constructor(
    private summaryFacade: SummaryFacadeService,
    private summaryMapper: SummaryMapperService,
    private datePipe: DatePipe,
    private userService: UserService,
    private notSvc: AppNotificationService,
    private translateSvc: TranslateService,
    private langSvc: LanguageService,
    private titleSvc: Title
  ) { }


  ngOnInit() {
    //subscribe on language change
    this.langSvc.getLanguage().subscribe(newLang => this.lang = newLang);

    //start data short polling
    this.pollOrderStatus();
    this.pollOrderInfo();
    this.pollSummaryOrders();
    this.pollCurrentCashier();

    this.translateSvc.get('SUMMARY').subscribe(res => this.titleSvc.setTitle(res));
  }

  ngOnDestroy() {
    //delete all subscriptions to pollings
    this.summaryOrderSubscription?.unsubscribe();
    this.currentCashierSubscription?.unsubscribe();
    this.orderSummaryInfoSubscription?.unsubscribe();
    this.orderStatusSubscription?.unsubscribe();
  }

  pollOrderStatus() {
    this.orderStatusInfo.loading = true;

    this.orderStatusSubscription = timer(0, environment.pollInterval)
      .pipe(exhaustMap(() => this.summaryFacade.getOrderStatus()))
      .subscribe(resp => {
        if (resp.status == ResponseStatus.OK)
          this.orderStatusInfo.data = resp.data;
        else if (this.orderStatusInfo.loading)
          this.notSvc.showHttpErrors(resp.errors);

        this.orderStatusInfo.loading = false;
      });
  }

  pollOrderInfo() {
    this.orderSummaryInfo.loading = true;

    this.orderSummaryInfoSubscription = merge(timer(0, environment.pollInterval), this.orderSummaryInfoSubj)
      .pipe(exhaustMap(() => this.summaryFacade.getOrderSummaryInfo(this.toDateString(this.selectedDate))))
      .subscribe(resp => {
        if (resp.status == ResponseStatus.OK)
          this.orderSummaryInfo.data = resp.data;
        else if (this.orderSummaryInfo.loading)
          this.notSvc.showHttpErrors(resp.errors);

        this.orderSummaryInfo.loading = false;
      });
  }

  pollSummaryOrders() {
    this.summaryOrder.loading = true;

    const timer$ = timer(0, environment.pollInterval)
      .pipe(map(() => ({
        page: this.summaryOrder.page,
        pageSize: this.summaryOrder.size
      }))
      );

    this.summaryOrderSubscription = merge(timer$, this.summaryOrderSubj)
      .pipe(exhaustMap((paging) => this.summaryFacade.getSummaryOrder(this.selectedDate, paging.page, paging.pageSize)))
      .subscribe(resp => {
        if (resp.status == ResponseStatus.OK) {
          this.summaryOrder.page = resp.data.page;
          this.summaryOrder.size = resp.data.pageSize;
          this.summaryOrder.items = { total: resp.data.totalElements, data: resp.data.responseList };
        } else if (this.summaryOrder.loading)
          this.notSvc.showHttpErrors(resp.errors);

        this.summaryOrder.loading = false;
      });
  }

  pollCurrentCashier() {
    this.currentCashierInfo.loading = true;

    this.currentCashierSubscription = merge(timer(0, environment.pollInterval), this.currentCashierSubj)
      .pipe(exhaustMap(() => this.summaryFacade.getCurrentCashier()))
      .subscribe(resp => {
        if (resp.status == ResponseStatus.OK)
          this.currentCashierInfo.data = resp.data;
        else if (this.currentCashierInfo.loading)
          this.notSvc.showHttpErrors(resp.errors);

        this.currentCashierInfo.loading = false;
      });
  }

  getOrderInfo() {
    this.orderSummaryInfo.loading = true;
    this.orderSummaryInfoSubj.next(null);
  }

  loadCurrentCashier() {
    this.currentCashierInfo.loading = true;
    this.currentCashierSubj.next();
  }

  closeDialog() {
    this.dialog.opened = false;
  }

  openDialog(order: OrderSummaryDto) {
    this.dialog = { opened: true, order };
  }

  onLoadCashiers = () => {
    return this.summaryFacade.getCashiers().pipe(map(resp => ({ ...resp, data: this.summaryMapper.fromCashiersToSelect(resp.data) })));
  }

  onCashierChange(data: ISelectItem) {
    if (!data.id) {
      this.notSvc.showSuccess(this.translateSvc.instant('CASHIER_REQUIRED'));
      return;
    }

    this.currentCashierInfo.loading = true;
    this.summaryFacade.setCurrentCashier(data.id).subscribe(resp => {
      if (resp.status == ResponseStatus.OK) {
        this.currentCashierInfo.data = resp.data;
        this.loadSummary(this.summaryOrder.page, this.summaryOrder.size);
        this.getOrderInfo();
      }
      else
        this.notSvc.showHttpErrors(resp.errors);

      this.currentCashierInfo.loading = false;
    });
  }

  onDateChange(newDate: Date) {
    this.selectedDate = newDate;
    this.getOrderInfo();
    this.loadSummary(1, this.summaryOrder.size);
  }

  onStop() {
    this.isStateChanged = true;
    this.summaryFacade.orderStop().subscribe(resp => {
      if (resp.status == ResponseStatus.OK && resp.data)
        this.orderStatusInfo.data.status = OrderStatus.CLOSED;
      else
        this.notSvc.showHttpErrors(resp.errors);

      this.isStateChanged = false;
    });
  }

  onStart() {
    this.isStateChanged = true;
    this.summaryFacade.orderStart(this.endTime).subscribe(resp => {
      if (resp.status == ResponseStatus.OK && resp.data) {
        this.orderStatusInfo.data = { status: OrderStatus.OPEN, endTime: this.endTime?.toISOString() };
        this.endTime = null;

        this.loadCurrentCashier();
      }
      else
        this.notSvc.showHttpErrors(resp.errors, false);

      this.isStateChanged = false;
    });
  }

  onEndDateChange(newDate: Date) {
    this.endTime = newDate;
  }

  onPageChange({ page, pageSize }: { page: number, pageSize: number }) {
    this.loadSummary(page, pageSize);
  }

  loadSummary(page: number, pageSize: number) {
    this.summaryOrder.loading = true;
    this.summaryOrderSubj.next({ page, pageSize });
  }

  payFor = (paid: number, summary: OrderSummaryDto) => {
    const stream$ = this.summaryFacade.payFor(summary.user.id, summary.orderDate, paid);

    stream$.subscribe(
      resp => {
        if (resp.status == ResponseStatus.OK) {
          this.summaryOrder.items.data = this.summaryOrder.items.data.map(it => {
            //replace order only if user and order date is equal
            if (it.user?.id == summary.user?.id && it.orderDate == summary.orderDate)
              return resp.data;

            return it;
          });

          //refetch order info
          this.getOrderInfo();
        }
        else
          this.notSvc.showHttpErrors(resp.errors);
      }
    );

    return stream$;
  }

  refresh(){
    this.summaryOrder.loading = true;
    this.summaryOrderSubj.next({page: this.summaryOrder.page, pageSize: this.summaryOrder.size});

    this.orderSummaryInfo.loading = true;
    this.orderSummaryInfoSubj.next();
  }

  private toDateString(date: Date) {
    return this.datePipe.transform(date, 'yyyy-LL-dd');
  }
}
