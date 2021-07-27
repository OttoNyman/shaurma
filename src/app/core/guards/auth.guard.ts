import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router, UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/modules/general/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.check(route);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.check(route);
  }

  check(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user = this.userService.getUser().value;

    if (!user && route.data.authRequired){
      return this.router.navigate(['/login'], {
        queryParams: { from: route.url.join('/') },
      });
    }

      if(user && !route.data.authRequired){
        const from = route.queryParams.from || '/';
        return this.router.navigate([from]);
      }
      
      return true;
  }
}
