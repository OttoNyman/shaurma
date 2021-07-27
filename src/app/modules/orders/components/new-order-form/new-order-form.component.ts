import {Component, DoCheck, EventEmitter, Input, KeyValueDiffer, KeyValueDiffers, OnInit, Output} from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseStatus } from 'src/app/core/constants/ResponseStatus';
import { DishDropdownDto } from 'src/app/core/dto/DishDropdownDto';
import { IResponse } from 'src/app/core/interfaces/IResponse';
import { ISimpleItem } from 'src/app/core/interfaces/ISimpleItem';
import { ISimplePriceItem } from 'src/app/core/interfaces/ISimplePriceItem';
import { AppValidators } from 'src/app/core/validators';
import { ISelectLoadItems } from 'src/app/shared/modules/form-elements/select/select.component';


export class NewOrderData {
	dish: DishDropdownDto = null;
	cut = false;
	additions: Array<ISimplePriceItem | null> = [null];
	drink?: ISimplePriceItem = null;
	remark?: ISimpleItem = null;
	quantity: number = 1;
}

@Component({
	selector: 'app-new-order-form',
	templateUrl: './new-order-form.component.html',
	styleUrls: ['./new-order-form.component.scss']
})
export class NewOrderFormComponent implements DoCheck, OnInit {
	@Input() loadDishes: ISelectLoadItems;
	@Input() loadDrinks: ISelectLoadItems;
	@Input() loadRemarks: ISelectLoadItems;
	@Input() loadAdditions: ISelectLoadItems;

	@Input() onNewOrder: (data: NewOrderData) => Observable<IResponse<any>>;
	@Input() restore: Observable<NewOrderData>;

	@Output() formFilled: EventEmitter<boolean> = new EventEmitter;

	newOrderFormData = new NewOrderData;
	newOrderFormValidator = AppValidators.createValidator({
		quantity: [AppValidators.range(1, 10)]
	});

	totalPrice = 0;
	differ: KeyValueDiffer<any, any>;

	constructor(differs: KeyValueDiffers){
		this.differ = differs.find(this.newOrderFormData).create();
	}

	ngOnInit(){
		this.restore?.subscribe(newFormValue => {
			this.newOrderFormData = newFormValue;
		});
	}

	ngDoCheck(){
		this.calculateNewPrice();
		this.updateAdditions();

		const changes = this.differ.diff(this.newOrderFormData);
		if(changes)
			this.newOrderFormValidator.validate(this.newOrderFormData);

		this.formFilled.emit(!(this.newOrderFormData.dish?.id || this.newOrderFormData.drink?.id));
	}

	private calculateNewPrice() {
		// calculate new price on value changes
		let newPrice = 0;

		newPrice += this.newOrderFormData.dish?.price || 0;
		newPrice += this.newOrderFormData.drink?.price || 0;

		//add price of all additions
		newPrice += (this.newOrderFormData.additions || []).reduce((acc: number, addition) => {
			return acc + (addition?.price || 0);
		}, 0);

		this.totalPrice = newPrice * this.newOrderFormData.quantity;
	}

	private updateAdditions() {
		if(!this.newOrderFormData.additions)
			this.newOrderFormData.additions = [];

		const additions = this.newOrderFormData.additions;

		//find quantity of empty selects
		const emptyCount = additions.reduce((acc, addVal) => acc + (addVal?.id == null ? 1 : 0), 0) || 0;

		if (emptyCount == 0 && additions.length < 5)
			additions.push(null);

		if (emptyCount == 2) {
			const deleteIndex = additions.findIndex(add => add?.id == null);
			additions.splice(deleteIndex, 1);
		}
	}

	get additionsArray() {
		return this.newOrderFormData.additions;
	}

	get hasDish() {
		return !!this.newOrderFormData.dish?.id;
	}

	get isHalfable(){
		return this.newOrderFormData.dish?.halfAble;
	}

	trackAdditionFn(index: number, el: ISimplePriceItem){
		return index + ':' + el?.id;
	}

	async makeOrder(event: Event){
		event.preventDefault();

		await this.newOrderFormValidator.validate(this.newOrderFormData);
		if(!this.newOrderFormValidator.errors.invalid && !this.newOrderFormData.dish?.id && !this.newOrderFormData.drink?.id)
			this.newOrderFormValidator.setErrors({dish: [{msg: 'CHOOSE_DISH_OR_DRINK'}]});

		if(this.newOrderFormValidator.errors.invalid)
			return;

		this.onNewOrder(this.newOrderFormData).subscribe(res => {
			if(res.status != ResponseStatus.OK){
				this.newOrderFormValidator.getErrorsFromResponse(res);
			}
			else{
				this.newOrderFormData = new NewOrderData;
			}
		});
	}

	onDishChange(newDish: DishDropdownDto){
		this.newOrderFormData.dish = newDish;
		this.newOrderFormData.cut = false;
		this.newOrderFormData.additions = [null];
	}
}
