import { Observable } from "rxjs";
import { OrderStatusDto } from "src/app/core/dto/OrderStatusDto";
import { OrderSummaryDto } from "src/app/core/dto/OrderSummaryDto";
import { OrderSummaryInfoDto } from "src/app/core/dto/OrderSummaryInfoDto";
import { ProfileDto } from "src/app/core/dto/ProfileDto";
import { UserDto } from "src/app/core/dto/UserDto";
import { IPaginator } from "src/app/core/interfaces/IPaginator";
import { IResponse } from "src/app/core/interfaces/IResponse";

export abstract class SummaryApiInterface{
    abstract getCurrentCashier(): Observable<IResponse<ProfileDto>>;
    abstract getCashiers(): Observable<IResponse<UserDto[]>>;
    abstract getOrderSummaryInfo(date: string): Observable<IResponse<OrderSummaryInfoDto>>;
    abstract setCurrentCashier(userID: number): Observable<IResponse<ProfileDto>>;
    abstract getOrderStatus(): Observable<IResponse<OrderStatusDto>>;
    abstract orderStart(dateTime: string, userID: number): Observable<IResponse<boolean>>;
    abstract orderStop(): Observable<IResponse<boolean>>;

    abstract getSummaryOrder(date: string, page: number, pageSize: number): Observable<IResponse<IPaginator<OrderSummaryDto>>>;
    abstract payFor(userID: number, orderDate: string, paid: number): Observable<IResponse<OrderSummaryDto>>;
}
