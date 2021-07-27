import { Observable } from "rxjs";
import { OrderItemDto } from "src/app/core/dto/OrderItemDto";
import { PaymentDto } from "src/app/core/dto/PaymentDto";
import { IResponse } from "src/app/core/interfaces/IResponse";


export abstract class PaymentApiInterface {
    abstract getCurrent(): Observable<IResponse<OrderItemDto[]>>;
    abstract getPayment(): Observable<IResponse<PaymentDto>>;
}
