import { ISimpleItem } from "../interfaces/ISimpleItem";
import { ISimplePriceItem } from "../interfaces/ISimplePriceItem";
import { DishDropdownDto } from "./DishDropdownDto";

export interface ResponseOrderDto{
    additions: ISimplePriceItem[],
    cut: boolean,
    dish: DishDropdownDto,
    drink: ISimplePriceItem | null,
    quantity: number,
    remark: ISimpleItem | null
}
