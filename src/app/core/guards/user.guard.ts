import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate, Router, UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/modules/general/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate{
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id: number = route.params.id;
    const user = this.userService.getUserValue().id;

    if (user == id)
      return this.router.navigate(['/profile']); 

    return true;
  }
}
