import { Injectable } from '@angular/core';
import { UserApi } from './api/user-api.interface';

@Injectable({
  providedIn: 'root'
})
export class UserFacadeService {
  constructor(private userApi: UserApi) { }

  getUser(userID: number){
    return this.userApi.getUser(userID);
  }

}
