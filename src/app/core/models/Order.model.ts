import { Addition } from "./Addition.model";
import { Dish } from "./Dish.model";
import { Drink } from "./Drink.model";
import { Remark } from "./Remark.model";
import { User } from "./User.model"

export class Order{
    id: number;
    user: User;
    dish: Dish;
    addition: Addition;
    drink: Drink;
    remark: Remark;
    halfable: boolean;
    amount: number;
    quantity: number;
    date: string;
}
