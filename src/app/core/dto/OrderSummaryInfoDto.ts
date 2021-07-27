import { UserDto } from "./UserDto";

export interface OrderSummaryInfoDto {
    totalCost: number,
    totalPayed: number,
    totalDebt: number,
    cashier: UserDto
}