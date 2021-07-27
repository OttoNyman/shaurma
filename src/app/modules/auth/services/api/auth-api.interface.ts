import { Observable } from "rxjs";
import { SignDto } from "src/app/core/dto/SignDto";
import { UserProfileDto } from "src/app/core/dto/UserProfileDto";
import { IResponse } from "src/app/core/interfaces/IResponse";


export interface LoginDto{
    currentDate: string,
    user: UserProfileDto
}

export abstract class AuthApiServiceInteface {
    abstract login(email: string): Observable<IResponse<LoginDto>>;
    abstract sign(data: SignDto): Observable<IResponse<LoginDto>>;
    abstract logout(): Observable<IResponse<boolean>>;
}
