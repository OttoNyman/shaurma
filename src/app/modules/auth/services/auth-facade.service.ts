import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs/operators';
import { ResponseStatus } from 'src/app/core/constants/ResponseStatus';
import { SignDto } from 'src/app/core/dto/SignDto';
import { IResponse } from 'src/app/core/interfaces/IResponse';
import { DateService } from 'src/app/shared/modules/general/date.service';
import { UserService } from 'src/app/shared/modules/general/user.service';
import { AuthApiServiceInteface, LoginDto } from './api/auth-api.interface';
import { AuthMapperService } from './auth-mapper.service';


@Injectable()
export class AuthFacadeService {
  constructor(
    private authService: AuthApiServiceInteface, 
    private userService: UserService, 
    private dateService: DateService,
    private authMapper: AuthMapperService
  ){}

  login(email: string){
    return this.authService.login(email).pipe(tap(res => this.extractData(res)), first());
  }

  sign(data: SignDto){
    return this.authService.sign(data).pipe(tap(res => this.extractData(res)), first());
  }

  logout(){
    return this.authService.logout().pipe(tap(res => {
      if(res.status == ResponseStatus.OK){
        localStorage.removeItem('email');
        this.userService.setUser(null);
        this.dateService.setDate(null);
      }
    }));
  }

  private extractData(res: IResponse<LoginDto>){
    if(res.status == ResponseStatus.OK){
      const user = this.authMapper.fromCurrentUserDto(res.data.user);
      localStorage.setItem('email', user.email);

      this.userService.setUser(user);
      this.dateService.setDate(res.data.currentDate);
    }
  }
}
