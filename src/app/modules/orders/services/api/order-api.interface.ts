import { Observable } from "rxjs";
import { DishDropdownDto } from "src/app/core/dto/DishDropdownDto";
import { OrderItemDto } from "src/app/core/dto/OrderItemDto";
import { OrderStatusDto } from "src/app/core/dto/OrderStatusDto";
import { PriceListItemDto } from "src/app/core/dto/PriceListItemDto";
import { RequestOrderAddDto } from "src/app/core/dto/RequestOrderAddDto";
import { IPaginator } from "src/app/core/interfaces/IPaginator";
import { IResponse } from "src/app/core/interfaces/IResponse";
import { ISimpleItem } from "src/app/core/interfaces/ISimpleItem";
import { ISimplePriceItem } from "src/app/core/interfaces/ISimplePriceItem";

export abstract class OrderApiInterface {
    abstract getDishesList(): Observable<IResponse<DishDropdownDto[]>>;
    abstract getDrinksList(): Observable<IResponse<ISimplePriceItem[]>>;
    abstract getRemarksList(): Observable<IResponse<ISimpleItem[]>>;
    abstract getAdditionsList(dishID: number): Observable<IResponse<ISimplePriceItem[]>>;
    abstract getPricelist(): Observable<IResponse<PriceListItemDto[]>>;

    abstract makeNewOrder(data: RequestOrderAddDto): Observable<IResponse<OrderItemDto>>;
    abstract getHistory(page: number, pageSize: number): Observable<IResponse<IPaginator<OrderItemDto>>>;

    abstract getCurrent(): Observable<IResponse<OrderItemDto[]>>;
    abstract deleteOrder(id: number): Observable<IResponse<OrderItemDto>>;
    abstract getOrderStatus(): Observable<IResponse<OrderStatusDto>>;
}
