import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, share } from 'rxjs/operators';
import { ResponseStatus } from 'src/app/core/constants/ResponseStatus';
import { ProfileDto } from 'src/app/core/dto/ProfileDto';
import { IResponse } from 'src/app/core/interfaces/IResponse';
import { environment } from 'src/environments/environment';
import { ProfileApi } from './profile-api.interface';

@Injectable()
export class ProfileApiService extends ProfileApi {
  constructor(private http: HttpClient) {
    super();
  }

  getProfile(userID: number){
    return this.http.get<IResponse<ProfileDto>>(environment.APP_URL + `/profile/${userID}`).pipe(share());
  }

  updateProfile(userID: number, profileDto: ProfileDto){
    return this.http.put<IResponse<ProfileDto>>(environment.APP_URL + `/profile/${userID}`, profileDto).pipe(share());
  }
}
