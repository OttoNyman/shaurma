import { Observable } from "rxjs";
import { ResponseOrderDeliveryDto } from "src/app/core/dto/ResponseOrderDeliveryDto";
import { IPaginator } from "src/app/core/interfaces/IPaginator";
import { IResponse } from "src/app/core/interfaces/IResponse";
import {DeliveryGeneralDto} from '../../../../core/dto/DeliveryGeneralDto';

export abstract class DeliveryApiInterface{
    abstract getDeliveryOrder(date: string, page: number, pageSize: number): Observable<IResponse<IPaginator<ResponseOrderDeliveryDto>>>;
    abstract getDeliveryGeneral(date: string): Observable<IResponse<DeliveryGeneralDto>>;
    abstract exportReport(date: string): Observable<IResponse<string>>;
}
