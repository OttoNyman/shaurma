import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { SignDto } from 'src/app/core/dto/SignDto';
import { IResponse } from 'src/app/core/interfaces/IResponse';
import { environment } from 'src/environments/environment';
import { AuthApiServiceInteface, LoginDto } from './auth-api.interface';


@Injectable()
export class AuthApiRealService extends AuthApiServiceInteface {

  constructor(private http: HttpClient) {
    super();
  }

  login(email: string): Observable<IResponse<LoginDto>>{
    return this.http.post<IResponse<LoginDto>>(environment.APP_URL + '/login', email).pipe(share());
  }

  sign(data: SignDto): Observable<IResponse<LoginDto>>{
    return this.http.post<IResponse<LoginDto>>(environment.APP_URL + '/sign', data).pipe(share());
  }

  logout(): Observable<IResponse<boolean>>{
    return this.http.post<IResponse<boolean>>(environment.APP_URL + '/logout', {}).pipe(share());
  }
}
