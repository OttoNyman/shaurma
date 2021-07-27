import {DatePipe} from '@angular/common';
import {Component, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {saveAs} from 'file-saver';
import {ResponseStatus} from 'src/app/core/constants/ResponseStatus';
import {ResponseOrderDeliveryDto} from 'src/app/core/dto/ResponseOrderDeliveryDto';
import {AppNotificationService} from 'src/app/shared/modules/general/notification.service';
import {DeliveryFacadeService} from '../../services/delivery-facade.service';
import {ExportType} from '../../../../core/constants/ExportType';
import {DeliveryMapperService} from '../../services/delivery-mapper.service';
import {PDFComponent} from '@progress/kendo-angular-grid';

@Component({
	selector: 'app-delivery',
	templateUrl: './delivery.component.html',
	styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
    @ViewChild('pdf')
    pdfComponent: PDFComponent;

    exportOptions = {
        exportType: ExportType.TXT,
        data: [{text: 'PDF', index: 0}, {text: 'TXT', index: 1}],
        pdfData: '',
        loading: false
    };

	generalInfo = {
		date: new Date(),
		dishCost: 0,
    drinkCost: 0,
    totalCost: 0,
		loading: false
	};

	deliveryOrder = {
		size: 5,
		page: 1,
		pageSizes: [5, 10, 20],
		loading: false,
		items: {
			total: 0,
			data: [] as Array<ResponseOrderDeliveryDto>
		}
	};

	deliveryOrderSubs: Subscription;

	constructor(
		private deliveryFacade: DeliveryFacadeService,
		private deliveryMapper: DeliveryMapperService,
		private notSvc: AppNotificationService,
		private datePipe: DatePipe,
		private translateSvc: TranslateService,
		private titleSvc: Title
	) { }

	ngOnInit(): void {
		this.loadDeliveryOrders(this.deliveryOrder.page, this.deliveryOrder.size);
		this.loadGeneralInfo();

		this.translateSvc.get('DELIVERY').subscribe(res => this.titleSvc.setTitle(res));
	}

	onDeliveryOrderPageChange({ page, pageSize }: { page: number, pageSize: number }) {
		this.loadDeliveryOrders(page, pageSize);
	}

	export(){
	    const dateStr = this.toDateString(this.generalInfo.date);

	    this.exportOptions.loading = true;
        this.deliveryFacade.exportReport(dateStr).subscribe(
            resp => {
                if (resp.status == ResponseStatus.OK) {
                    if(this.exportOptions.exportType == ExportType.TXT) {
                        let link = this.deliveryMapper.mapStringToTxt(resp.data);
                        saveAs(link, `report${dateStr}.txt`);
                    }
                    else{
                        this.exportOptions.pdfData = resp.data;
                        setTimeout(() => this.pdfComponent.saveAs(`report${dateStr}.pdf`), 0);
                    }
                }
                else
                    this.notSvc.showHttpErrors(resp.errors);

                this.exportOptions.loading = false;
            }
        );
    }

	loadDeliveryOrders(page: number, pageSize: number) {
		if(this.deliveryOrderSubs)
			this.deliveryOrderSubs.unsubscribe();

		this.deliveryOrder.loading = true;
		this.deliveryOrderSubs = this.deliveryFacade.getDeliveryOrder(this.toDateString(this.generalInfo.date), page, pageSize).subscribe(
			resp => {
				if (resp.status == ResponseStatus.OK) {
					this.deliveryOrder.items.data = resp.data.responseList;
					this.deliveryOrder.items.total = resp.data.totalElements;
					this.deliveryOrder.size = resp.data.pageSize;
					this.deliveryOrder.page = resp.data.page;
				}
				else
					this.notSvc.showHttpErrors(resp.errors);

				this.deliveryOrder.loading = false;
			}
		);
	}

	loadGeneralInfo(){
		this.generalInfo.loading = true;
		this.deliveryFacade.getDeliveryGeneral(this.toDateString(this.generalInfo.date)).subscribe(
			resp => {
				if(resp.status == ResponseStatus.OK){
					this.generalInfo.dishCost = resp.data.dishCost;
					this.generalInfo.drinkCost = resp.data.drinkCost;
					this.generalInfo.totalCost = resp.data.totalCost;
				}
				else{
					this.notSvc.showHttpErrors(resp.errors);
				}

				this.generalInfo.loading = false;
			}
		);
	}

	onDateChange(newDate: Date) {
		this.generalInfo.date = newDate;
		this.loadDeliveryOrders(1, this.deliveryOrder.size);
		this.loadGeneralInfo();
	}

	generate(){
		alert('Generate list');
	}

	private toDateString(date: Date){
		return this.datePipe.transform(date, 'yyyy-LL-dd');
	}
}
