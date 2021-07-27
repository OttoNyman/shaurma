import { ISimpleItem } from "../interfaces/ISimpleItem";

export interface ResponseOrderDeliveryDto{
    order: {
        dish: ISimpleItem,
        drink?: ISimpleItem,
        addition: ISimpleItem[],
        cut: boolean,
        remark?: ISimpleItem
    },
    orderDate: string,
    quantity: number
}
