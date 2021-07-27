import {Observable} from 'rxjs';

import {IResponse} from '../../../../core/interfaces/IResponse';
import {ProfileDto} from '../../../../core/dto/ProfileDto';


export abstract class ProfileApi {
   abstract getProfile(userID: number): Observable<IResponse<ProfileDto>>;
   abstract updateProfile(userID: number, profileDto: ProfileDto): Observable<IResponse<ProfileDto>>;
}
