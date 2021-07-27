import { PriceListTypes } from "../constants/PriceListTypes";

export interface PriceListItemDto{
    name: string,
    price: number,
    type: PriceListTypes
}
