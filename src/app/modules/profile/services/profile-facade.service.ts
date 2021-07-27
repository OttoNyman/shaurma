import { Injectable } from '@angular/core';
import { ProfileDto } from 'src/app/core/dto/ProfileDto';
import { ProfileApi } from './api/profile-api.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileFacadeService {
  constructor(private profileApi: ProfileApi) { }

  getProfile(userID: number){
    return this.profileApi.getProfile(userID);
  }

  updateProfile(userID: number, profile: ProfileDto){
    return this.profileApi.updateProfile(userID, profile);
  }
}
