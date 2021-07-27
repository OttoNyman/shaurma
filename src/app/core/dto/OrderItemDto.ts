import { ISimpleItem } from "../interfaces/ISimpleItem";
import { ISimplePriceItem } from "../interfaces/ISimplePriceItem";

export interface OrderItemDto{
    orderId: number,
    userID: number,
    dish: ISimplePriceItem,
    additions: Array<ISimplePriceItem>,
    drink?: ISimplePriceItem,
    remark?: ISimpleItem,
    cut: boolean,
    amount: number,
    quantity: number,
    orderDate: string
}
