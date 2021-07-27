import { PaymentSettings } from "./PaymentSettings";
import { UserDto } from "./UserDto";

export interface PaymentDto{
    cashier: UserDto,
    paymentMethod: PaymentSettings,
    confirmed: boolean
}
