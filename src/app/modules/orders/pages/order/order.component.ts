import { DatePipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from '@progress/kendo-angular-dialog';
import { Subject, Subscription, timer } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
import { OrderStatus } from 'src/app/core/constants/OrderStatus';
import { ResponseStatus } from 'src/app/core/constants/ResponseStatus';
import { OrderItemDto } from 'src/app/core/dto/OrderItemDto';
import { OrderStatusDto } from 'src/app/core/dto/OrderStatusDto';
import { PriceListItemDto } from 'src/app/core/dto/PriceListItemDto';
import { CanLeave } from 'src/app/core/guards/confirm.guard';
import { AppNotificationService } from 'src/app/shared/modules/general/notification.service';
import { environment } from 'src/environments/environment';
import { LanguageService } from '../../../../shared/modules/general/language.service';
import { NewOrderData } from '../../components/new-order-form/new-order-form.component';
import { OrderMapperService } from '../../services/order-mapper.service';
import { OrderFacade } from '../../services/order.facade';


@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.scss']
})
export class OrderComponent extends CanLeave implements OnDestroy {
	lang: string | undefined = undefined;

	newOrder = {
		pricelist: {
			loading: false,
			prices: [] as Array<PriceListItemDto>
		},
		form: { loading: false }
	};

	orderStatus: { data: OrderStatusDto, loading: boolean } = { data: { status: OrderStatus.OPEN, endTime: null }, loading: false };

	history = {
		size: 5,
		page: 1,
		pageSizes: [5, 10, 20],
		loading: false,
		items: {
			total: 0,
			data: [] as Array<OrderItemDto>
		}
	};

	current = {
		loading: false,
		items: [] as Array<OrderItemDto>
	};

	deleting: number[] = [];
	restore = new Subject<NewOrderData>();

	pollStatusSubscription: Subscription = null;

	get currentTotalPrice() {
		return this.current.items.reduce((acc, order) => acc + order.amount, 0);
	}

	get isOrderOpen() {
		return this.orderStatus.data?.status == OrderStatus.OPEN;
	}

	get endData() {
		return { date: this.datePipe.transform(this.orderStatus.data?.endTime, 'shortTime', undefined, this.lang) };
	}

	get isOpen() {
		return this.orderStatus.data?.status == OrderStatus.OPEN;
	}

	get historyItems() {
		return { total: this.history.items.total, data: this.history.items.data.slice(0, this.history.size) };
	}

	constructor(
		private orderMapper: OrderMapperService,
		private orderFacade: OrderFacade,
		private langSvc: LanguageService,
		private notSvc: AppNotificationService,
		private translateSvc: TranslateService,
		private datePipe: DatePipe,
		private dialogSvc: DialogService,
		private titleSvc: Title
	) {
		super();
	}

	ngOnInit() {
		//subscribe on language change
		this.langSvc.getLanguage().subscribe(newLang => this.lang = newLang);
		this.pollOrderStatus();

		this.newOrder.pricelist.loading = true;
		this.orderFacade.getPricelist().subscribe(
			res => {
				if (res.status == ResponseStatus.OK)
					this.newOrder.pricelist = { prices: res.data, loading: false };
				else
					this.notSvc.showHttpErrors(res.errors);

				this.newOrder.pricelist.loading = false;
			}
		);

		this.onLoadHistory(1, 5);
		this.loadCurrent();

		this.translateSvc.get('MY_ORDER').subscribe(res => this.titleSvc.setTitle(res));
	}

	ngOnDestroy() {
		this.pollStatusSubscription?.unsubscribe();
		super.onDestroy();
	}

	loadCurrent() {
		this.current.loading = true;
		this.orderFacade.getCurrent().subscribe(
			res => {
				if (res.status == ResponseStatus.OK)
					this.current = { loading: false, items: res.data };
				else
					this.notSvc.showHttpErrors(res.errors);

				this.current.loading = false;
			}
		);
	}

	pollOrderStatus() {
		//load initial data
		this.orderStatus.loading = true;
		this.pollStatusSubscription = timer(0, environment.pollInterval)
			.pipe(exhaustMap(() => this.orderFacade.getOrderStatus()))
			.subscribe(resp => {
				if (resp.status == ResponseStatus.OK)
					this.orderStatus.data = resp.data;
				else if (this.orderStatus.loading)
					this.notSvc.showHttpErrors(resp.errors);

				this.orderStatus.loading = false;
			});
	}

	onLoadDishes = () => {
		return this.orderFacade.getDishesList();
	}

	onLoadAdditions = (dishID: number) => {
		return this.orderFacade.getAdditionsList(dishID);
	}

	onLoadDrinks = () => {
		return this.orderFacade.getDrinksList();
	}

	onLoadRemarks = () => {
		return this.orderFacade.getRemarksList();
	}

	onNewOrder = (data: NewOrderData) => {
		this.newOrder.form.loading = true;
		const stream$ = this.orderFacade.makeNewOrder(this.orderMapper.toMakeOrderRequest(data));
		stream$.subscribe(res => {
			this.newOrder.form.loading = false;

			if (res.status == ResponseStatus.OK) {
				this.notSvc.showSuccess(this.translateSvc.instant('ORDER_CREATED'));

				this.current.items.unshift(res.data);

				if (this.history.page == 1)
					this.history.items.data.unshift(res.data);
			}
			else
				this.notSvc.showHttpErrors(res.errors);
		});

		return stream$;
	}

	onHistoryPageChange({ page, pageSize }: { page: number, pageSize: number }) {
		this.history.size = pageSize;
		this.onLoadHistory(page, pageSize);
	}

	onLoadHistory(page: number, pageSize: number) {
		this.history.loading = true;
		this.orderFacade.getHistory(page, pageSize).subscribe(
			resp => {
				if (resp.status == ResponseStatus.OK) {
					this.history.items.data = resp.data.responseList;
					this.history.items.total = resp.data.totalElements;
					this.history.size = resp.data.pageSize;
					this.history.page = resp.data.page;
				}
				else
					this.notSvc.showHttpErrors(resp.errors);

				this.history.loading = false;
			}
		);
	}

	restoreOrder(data: OrderItemDto) {
		this.restore.next(this.orderMapper.toRestoreForm(data));
	}

	deleteOrder(id: number) {
		const dlgRef = this.dialogSvc.open({
			title: this.translateSvc.instant('CONFIRM_DELETE'),
			content: this.translateSvc.instant('SURE'),
			actions: [{ text: this.translateSvc.instant('NO') }, { text: this.translateSvc.instant('YES'), primary: true, success: true }],
			minWidth: 250,
			width: 250,
			height: 200
		});

		dlgRef.result.subscribe((res: any) => {
			if(!res.success)
				return;

			this.deleting.push(id);
			this.orderFacade.deleteOrder(id).subscribe(
				res => {
					if (res.status == ResponseStatus.OK) {
						this.onLoadHistory(this.history.page, this.history.size);
						this.current.items = this.current.items.filter(order => order.orderId != id);
					}
					else {
						this.notSvc.showHttpErrors(res.errors);
					}
				},
				null,
				() => this.deleting = this.deleting.filter(deleteID => deleteID != id)
			)
		});
	}

	isDeleting(orderID: number) {
		return this.deleting.includes(orderID);
	}
}
