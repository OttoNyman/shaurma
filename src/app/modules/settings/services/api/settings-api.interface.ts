import { Observable } from "rxjs";
import { AssortmentItemDto } from "src/app/core/dto/AssortmentItemDto";
import { EditAssortmentDto } from "src/app/core/dto/EditAssortmentDto";
import { SimpleDto } from "src/app/core/dto/SimpleDto";
import { SimplePriceDto } from "src/app/core/dto/SimplePriceDto";
import { IPaginator } from "src/app/core/interfaces/IPaginator";
import { IResponse } from "src/app/core/interfaces/IResponse";
import { ISimpleItem } from "src/app/core/interfaces/ISimpleItem";
import { ISimplePriceItem } from "src/app/core/interfaces/ISimplePriceItem";

export abstract class SettingsApiInterface{
    abstract getDishes(page: number, pageSize: number): Observable<IResponse<IPaginator<ISimplePriceItem>>>;
    abstract createDish(dto: SimplePriceDto): Observable<IResponse<ISimplePriceItem>>;
    abstract editDish(dishID: number, dto: SimplePriceDto): Observable<IResponse<ISimplePriceItem>>;
    abstract deleteDish(dishID: number): Observable<IResponse<ISimplePriceItem>>;

    abstract getAdditions(page: number, pageSize: number): Observable<IResponse<IPaginator<ISimplePriceItem>>>;
    abstract createAddition(dto: SimplePriceDto): Observable<IResponse<ISimplePriceItem>>;
    abstract editAddition(additionID: number, dto: SimplePriceDto): Observable<IResponse<ISimplePriceItem>>;
    abstract deleteAddition(additionID: number): Observable<IResponse<ISimplePriceItem>>;

    abstract getDrinks(page: number, pageSize: number): Observable<IResponse<IPaginator<ISimplePriceItem>>>;
    abstract createDrink(dto: SimplePriceDto): Observable<IResponse<ISimplePriceItem>>;
    abstract editDrink(drinkID: number, dto: SimplePriceDto): Observable<IResponse<ISimplePriceItem>>;
    abstract deleteDrink(drinkID: number): Observable<IResponse<ISimplePriceItem>>;

    abstract getRemarks(page: number, pageSize: number): Observable<IResponse<IPaginator<ISimpleItem>>>;
    abstract createRemark(dto: SimpleDto): Observable<IResponse<ISimpleItem>>;
    abstract editRemark(remarkID: number, dto: SimpleDto): Observable<IResponse<ISimpleItem>>;
    abstract deleteRemark(remarkID: number): Observable<IResponse<ISimpleItem>>;

    abstract getAllAdditions(): Observable<IResponse<ISimplePriceItem[]>>;
    abstract getAssortments(page: number, pageSize: number): Observable<IResponse<IPaginator<AssortmentItemDto>>>;
    abstract editAssortment(id: number, dto: EditAssortmentDto): Observable<IResponse<AssortmentItemDto>>;
}
