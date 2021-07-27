import {Observable} from 'rxjs';

import {IResponse} from '../../../../core/interfaces/IResponse';
import {ProfileDto} from '../../../../core/dto/ProfileDto';


export abstract class UserApi {
   abstract getUser(userID: number): Observable<IResponse<ProfileDto>>;
}
