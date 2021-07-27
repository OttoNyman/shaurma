import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/core/models/User.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: BehaviorSubject<User> = new BehaviorSubject(null);

  getUser(): BehaviorSubject<User>{
    return this.user;
  }

  setUser(data: User){
    this.user.next(data);
  }

  getUserValue(){
    return this.user.getValue();
  }
}
