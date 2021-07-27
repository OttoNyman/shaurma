import { Component, DoCheck, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from '@progress/kendo-angular-dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseStatus } from 'src/app/core/constants/ResponseStatus';
import { AssortmentItemDto } from 'src/app/core/dto/AssortmentItemDto';
import { CanLeave } from 'src/app/core/guards/confirm.guard';
import { ISimpleItem } from 'src/app/core/interfaces/ISimpleItem';
import { ISimplePriceItem } from 'src/app/core/interfaces/ISimplePriceItem';
import { AppValidators } from 'src/app/core/validators';
import { AppNotificationService } from 'src/app/shared/modules/general/notification.service';
import { SettingsFacadeService } from '../../services/settings-facade.service';
import { SettingsMapperService } from '../../services/settings-mapper.service';


@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends CanLeave implements OnDestroy, DoCheck {
	constructor(
		private settingsFacade: SettingsFacadeService,
		private settingsMapper: SettingsMapperService,
		private notSvc: AppNotificationService,
		private translateSvc: TranslateService,
		private dialogSvc: DialogService,
		private titleSvc: Title
	) {
		super();
	}

	ngOnInit(){
		this.translateSvc.get('SETTINGS').subscribe(res => this.titleSvc.setTitle(res));
	}

	ngDoCheck(){
		this.setCanLeave(!(this.dishes.editedDish || this.additions.editedAddition || this.drinks.editedDrink 
			|| this.remarks.editedRemark || this.assortments.editedAssortment));
	}

	ngOnDestroy(){
		super.onDestroy();
	}

	//panels handlers
	onDishOpen = () => this.loadDish({ page: this.dishes.page, pageSize: this.dishes.size });
	onAdditionOpen = () => this.loadAddition({ page: this.additions.page, pageSize: this.additions.size });
	onDrinkOpen = () => this.loadDrink({ page: this.drinks.page, pageSize: this.drinks.size });
	onRemarkOpen = () => this.loadRemark({ page: this.remarks.page, pageSize: this.remarks.size });
	onAssortmentOpen = () => this.loadAssortment({ page: this.assortments.page, pageSize: this.assortments.size });

	//dish
	dishes = {
		size: 5,
		page: 1,
		loading: false,
		items: {
			total: 0,
			data: [] as Array<ISimplePriceItem>
		},
		editedDish: null as ISimplePriceItem,
		validator: AppValidators.createValidator({
			name: [AppValidators.required],
			price: [AppValidators.moreThan(0)]
		})
	};

	dishCreateStart() {
		this.dishes.validator.reset();
		this.dishes.editedDish = { id: null, name: '', price: 0 };
	}

	dishCreated = async () => {
		await this.dishes.validator.validate(this.dishes.editedDish);

		if (this.dishes.validator.errors.invalid)
			return false;

		this.dishes.loading = true;
		this.settingsFacade.createDish(this.settingsMapper.fromSimplePriceToDto(this.dishes.editedDish)).subscribe(
			resp => {
				if (resp.status == ResponseStatus.OK) {
					this.loadDish({ page: this.dishes.page, pageSize: this.dishes.size });
					this.dishes.editedDish = null;
				}
				else {
					this.dishes.validator.getErrorsFromResponse(resp);
					this.notSvc.showHttpErrors(resp.errors);
				}

				this.dishes.loading = false;
			}
		);

		return true;
	}

	dishEditStart(item: ISimplePriceItem) {
		this.dishes.validator.reset();
		this.dishes.editedDish = { ...item };
	}

	dishEdited = async (item: ISimplePriceItem) => {
		await this.dishes.validator.validate(this.dishes.editedDish);

		if (this.dishes.validator.errors.invalid)
			return false;

		this.dishes.loading = true;
		this.settingsFacade.editDish(item.id, this.settingsMapper.fromSimplePriceToDto(this.dishes.editedDish)).subscribe(
			resp => {
				if (resp.status == ResponseStatus.OK) {
					this.dishes.items.data = this.dishes.items.data.map(it => it.id == item.id ? resp.data : it);
					this.dishes.editedDish = null;
				}
				else {
					this.dishes.validator.getErrorsFromResponse(resp);
					this.notSvc.showHttpErrors(resp.errors);
				}

				this.dishes.loading = false;
			}
		);

		return true;
	}

	dishDeleted = (item: ISimplePriceItem) => {
		this.confirmDeleting().subscribe(res => {
			if (!res)
				return;

			this.dishes.loading = true;
			this.settingsFacade.deleteDish(item.id).subscribe(
				resp => {
					if (resp.status == ResponseStatus.OK) {
						this.loadDish({ page: this.dishes.page, pageSize: this.dishes.size });
					}
					else {
						this.notSvc.showHttpErrors(resp.errors);
					}
				}
			);
		});
	}

	loadDish({ page, pageSize }: { page: number, pageSize: number }) {
		this.dishes.loading = true;
		this.settingsFacade.getDishes(page, pageSize).subscribe(
			resp => {
				if (resp.status == ResponseStatus.OK) {
					this.dishes.items.data = resp.data.responseList;
					this.dishes.page = resp.data.page;
					this.dishes.size = resp.data.pageSize;
					this.dishes.items.total = resp.data.totalElements;
				}
				else {
					this.notSvc.showHttpErrors(resp.errors);
				}

				this.dishes.loading = false;
			}
		);
	}

	//drink
	drinks = {
		size: 5,
		page: 1,
		loading: false,
		items: {
			total: 0,
			data: [] as Array<ISimplePriceItem>
		},
		editedDrink: null as ISimplePriceItem,
		validator: AppValidators.createValidator({
			name: [AppValidators.required],
			price: [AppValidators.moreThan(0)]
		})
	};

	drinkCreateStart() {
		this.drinks.editedDrink = { id: null, name: '', price: 0 };
	}

	drinkCreated = async () => {
		await this.drinks.validator.validate(this.drinks.editedDrink);

		if (this.drinks.validator.errors.invalid)
			return false;

		this.drinks.loading = true;
		this.settingsFacade.createDrink(this.settingsMapper.fromSimplePriceToDto(this.drinks.editedDrink)).subscribe(
			resp => {
				if (resp.status == ResponseStatus.OK) {
					this.loadDrink({ page: this.drinks.page, pageSize: this.drinks.size });
					this.drinks.editedDrink = null;
				}
				else {
					this.drinks.validator.getErrorsFromResponse(resp);
					this.notSvc.showHttpErrors(resp.errors);
				}

				this.drinks.loading = false;
			}
		);

		return true;
	}

	drinkEditStart(item: ISimplePriceItem) {
		this.drinks.editedDrink = { ...item };
	}

	drinkEdited = async (item: ISimplePriceItem) => {
		await this.drinks.validator.validate(this.drinks.editedDrink);

		if (this.drinks.validator.errors.invalid)
			return false;

		this.drinks.loading = true;
		this.settingsFacade.editDrink(item.id, this.settingsMapper.fromSimplePriceToDto(this.drinks.editedDrink)).subscribe(
			resp => {
				if (resp.status == ResponseStatus.OK) {
					this.drinks.items.data = this.drinks.items.data.map(it => it.id == item.id ? resp.data : it);
					this.drinks.editedDrink = null;
				}
				else {
					this.drinks.validator.getErrorsFromResponse(resp);
					this.notSvc.showHttpErrors(resp.errors);
				}

				this.drinks.loading = false;
			}
		);

		return true;
	}

	drinkDeleted = (item: ISimplePriceItem) => {
		this.confirmDeleting().subscribe(res => {
			if (!res)
				return;

			this.drinks.loading = true;
			this.settingsFacade.deleteDrink(item.id).subscribe(
				resp => {
					if (resp.status == ResponseStatus.OK) {
						this.loadDrink({ page: this.drinks.page, pageSize: this.drinks.size });
					}
					else {
						this.notSvc.showHttpErrors(resp.errors);
					}
				}
			);
		});
	}

	loadDrink({ page, pageSize }: { page: number, pageSize: number }) {
		this.drinks.loading = true;
		this.settingsFacade.getDrinks(page, pageSize).subscribe(
			resp => {
				if (resp.status == ResponseStatus.OK) {
					this.drinks.items.data = resp.data.responseList;
					this.drinks.page = resp.data.page;
					this.drinks.size = resp.data.pageSize;
					this.drinks.items.total = resp.data.totalElements;
				}
				else {
					this.notSvc.showHttpErrors(resp.errors);
				}

				this.drinks.loading = false;
			}
		);
	}

	//addition
	additions = {
		size: 5,
		page: 1,
		loading: false,
		items: {
			total: 0,
			data: [] as Array<ISimplePriceItem>
		},
		editedAddition: null as ISimplePriceItem,
		validator: AppValidators.createValidator({
			name: [AppValidators.required],
			price: [AppValidators.moreThan(0)]
		})
	};

	additionCreateStart() {
		this.additions.editedAddition = { id: null, name: '', price: 0 };
	}

	additionCreated = async () => {
		await this.additions.validator.validate(this.additions.editedAddition);

		if (this.additions.validator.errors.invalid)
			return false;

		this.additions.loading = true;
		this.settingsFacade.createAddition(this.settingsMapper.fromSimplePriceToDto(this.additions.editedAddition)).subscribe(
			resp => {
				if (resp.status == ResponseStatus.OK) {
					this.loadAddition({ page: this.additions.page, pageSize: this.additions.size });
					this.additions.editedAddition = null;
				}
				else {
					this.additions.validator.getErrorsFromResponse(resp);
					this.notSvc.showHttpErrors(resp.errors);
				}

				this.dishes.loading = false;
			}
		);

		return true;
	}

	additionEditStart(item: ISimplePriceItem) {
		this.additions.editedAddition = { ...item };
	}

	additionEdited = async (item: ISimplePriceItem) => {
		await this.additions.validator.validate(this.additions.editedAddition);

		if (this.additions.validator.errors.invalid)
			return false;

		this.additions.loading = true;
		this.settingsFacade.editAddition(item.id, this.settingsMapper.fromSimplePriceToDto(this.additions.editedAddition)).subscribe(
			resp => {
				if (resp.status == ResponseStatus.OK) {
					this.additions.items.data = this.additions.items.data.map(it => it.id == item.id ? resp.data : it);
					this.additions.editedAddition = null;
				}
				else {
					this.additions.validator.getErrorsFromResponse(resp);
					this.notSvc.showHttpErrors(resp.errors);
				}

				this.additions.loading = false;
			}
		);


		return true;
	}

	additionDeleted = (item: ISimplePriceItem) => {
		this.confirmDeleting().subscribe(res => {
			if (!res)
				return;

			this.additions.loading = true;
			this.settingsFacade.deleteAddition(item.id).subscribe(
				resp => {
					if (resp.status == ResponseStatus.OK) {
						this.loadAddition({ page: this.additions.page, pageSize: this.additions.size });
					}
					else {
						this.notSvc.showHttpErrors(resp.errors);
					}
				}
			);
		});
	}

	loadAddition({ page, pageSize }: { page: number, pageSize: number }) {
		this.additions.loading = true;
		this.settingsFacade.getAdditions(page, pageSize).subscribe(
			resp => {
				if (resp.status == ResponseStatus.OK) {
					this.additions.items.data = resp.data.responseList;
					this.additions.page = resp.data.page;
					this.additions.size = resp.data.pageSize;
					this.additions.items.total = resp.data.totalElements;
				}
				else {
					this.notSvc.showHttpErrors(resp.errors);
				}

				this.additions.loading = false;
			}
		);
	}

	//remarks
	remarks = {
		size: 5,
		page: 1,
		loading: false,
		items: {
			total: 0,
			data: [] as Array<ISimpleItem>
		},
		editedRemark: null as ISimpleItem,
		validator: AppValidators.createValidator({ name: [AppValidators.required] })
	};

	remarkCreateStart() {
		this.remarks.editedRemark = { id: null, name: '' };
	}

	remarkCreated = async () => {
		await this.remarks.validator.validate(this.remarks.editedRemark);

		if (this.remarks.validator.errors.invalid)
			return false;

		this.remarks.loading = true;
		this.settingsFacade.createRemark(this.settingsMapper.fromSimpleToDto(this.remarks.editedRemark)).subscribe(
			resp => {
				if (resp.status == ResponseStatus.OK) {
					this.loadRemark({ page: this.remarks.page, pageSize: this.remarks.size });
					this.remarks.editedRemark = null;
				}
				else {
					this.remarks.validator.getErrorsFromResponse(resp);
					this.notSvc.showHttpErrors(resp.errors);
				}

				this.remarks.loading = false;
			}
		);

		return true;
	}

	remarkEditStart(item: ISimpleItem) {
		this.remarks.editedRemark = { ...item };
	}

	remarkEdited = async (item: ISimpleItem) => {
		await this.remarks.validator.validate(this.remarks.editedRemark);

		if (this.remarks.validator.errors.invalid)
			return false;

		this.remarks.loading = true;
		this.settingsFacade.editRemark(item.id, this.settingsMapper.fromSimpleToDto(this.remarks.editedRemark)).subscribe(
			resp => {
				if (resp.status == ResponseStatus.OK) {
					this.remarks.items.data = this.remarks.items.data.map(it => it.id == item.id ? resp.data : it);
					this.remarks.editedRemark = null;
				}
				else {
					this.remarks.validator.getErrorsFromResponse(resp);
					this.notSvc.showHttpErrors(resp.errors);
				}

				this.remarks.loading = false;
			}
		);

		return true;
	}

	remarkDeleted = (item: ISimplePriceItem) => {
		this.confirmDeleting().subscribe(res => {
			if (!res)
				return;

			this.remarks.loading = true;
			this.settingsFacade.deleteRemark(item.id).subscribe(
				resp => {
					if (resp.status == ResponseStatus.OK) {
						this.loadRemark({ page: this.remarks.page, pageSize: this.remarks.size });
					}
					else {
						this.notSvc.showHttpErrors(resp.errors);
					}
				}
			);
		});
	}

	loadRemark({ page, pageSize }: { page: number, pageSize: number }) {
		this.remarks.loading = true;
		this.settingsFacade.getRemarks(page, pageSize).subscribe(
			resp => {
				if (resp.status == ResponseStatus.OK) {
					this.remarks.items.data = resp.data.responseList;
					this.remarks.page = resp.data.page;
					this.remarks.size = resp.data.pageSize;
					this.remarks.items.total = resp.data.totalElements;
				}
				else {
					this.notSvc.showHttpErrors(resp.errors);
				}

				this.remarks.loading = false;
			}
		);
	}

	//assortments
	assortments = {
		size: 5,
		page: 1,
		loading: false,
		items: {
			total: 0,
			data: [] as Array<AssortmentItemDto>
		},
		editedAssortment: null as AssortmentItemDto,
		validator: AppValidators.createValidator({})
	};

	getAllAdditions = () => {
		return this.settingsFacade.getAllAdditions();
	}

	assortmentEditStart(item: AssortmentItemDto) {
		this.assortments.editedAssortment = { ...item };
	}

	assortmentAdditionsChanged(newAdditions: ISimplePriceItem[]){
		this.assortments.editedAssortment.additions = newAdditions;
	}

	assortmentEdited = (item: AssortmentItemDto) => {
		this.assortments.loading = true;
		this.settingsFacade.editAssortment(item.dish.id, this.settingsMapper.toAssortmentEditDto(this.assortments.editedAssortment)).subscribe(
			resp => {
				if (resp.status == ResponseStatus.OK) {
					this.assortments.items.data = this.assortments.items
						.data.map(it => it.dish.id == resp.data.dish.id ? this.settingsMapper.fromAssortment(resp.data) : it);

					this.assortments.editedAssortment = null;
				}
				else {
					this.assortments.validator.getErrorsFromResponse(resp);
					this.notSvc.showHttpErrors(resp.errors);
				}

				this.assortments.loading = false;
			}
		);
	}

	loadAssortment({ page, pageSize }: { page: number, pageSize: number }) {
		this.assortments.loading = true;
		this.settingsFacade.getAssortments(page, pageSize).subscribe(
			resp => {
				if (resp.status == ResponseStatus.OK) {
					this.assortments.items.data = resp.data.responseList.map(dto => this.settingsMapper.fromAssortment(dto));
					this.assortments.page = resp.data.page;
					this.assortments.size = resp.data.pageSize;
					this.assortments.items.total = resp.data.totalElements;
				}
				else {
					this.notSvc.showHttpErrors(resp.errors);
				}

				this.assortments.loading = false;
			}
		);
	}

	private confirmDeleting(): Observable<boolean> {
		const dlgRef = this.dialogSvc.open({
			title: this.translateSvc.instant('CONFIRM_DELETE'),
			content: this.translateSvc.instant('SURE'),
			actions: [{ text: this.translateSvc.instant('NO') }, { text: this.translateSvc.instant('YES'), primary: true, success: true }],
			width: 450,
			height: 200
		});

		return dlgRef.result.pipe(map((action: any) => !!action.success));
	}
}
