import { PaymentSettings } from "./PaymentSettings";
import { UserDto } from "./UserDto";

export interface ProfileDto{
    user: UserDto,
    payments: PaymentSettings
}
