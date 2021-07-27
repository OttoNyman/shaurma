import { OrderItemDto } from "./OrderItemDto";
import { UserDto } from "./UserDto";

export interface OrderSummaryDto{
    user: UserDto,
    orders: Array<OrderItemDto>,
    amount: number,
    orderDate: string,
    paidAmount: number
}
