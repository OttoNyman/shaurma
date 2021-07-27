import { ISimpleItem } from "../interfaces/ISimpleItem";

export interface AssortmentItemDto{
    additions: ISimpleItem[],
    dish: ISimpleItem,
    halfable: boolean
}
