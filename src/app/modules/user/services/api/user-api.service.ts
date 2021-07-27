import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, share } from 'rxjs/operators';
import { ResponseStatus } from 'src/app/core/constants/ResponseStatus';
import { ProfileDto } from 'src/app/core/dto/ProfileDto';
import { IResponse } from 'src/app/core/interfaces/IResponse';
import { environment } from 'src/environments/environment';
import { UserApi } from './user-api.interface';

@Injectable()
export class UserApiService extends UserApi {
  constructor(private http: HttpClient) {
    super();
  }

  getUser(userID: number){
    return this.http.get<IResponse<ProfileDto>>(environment.APP_URL + `/profile/${userID}`).pipe(share());
  }
}
