import { OrderStatus } from "../constants/OrderStatus";

export interface OrderStatusDto{
    status: OrderStatus,
    endTime?: string
}
