import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredUserLevel = route.data['userLevel'];

    const storedUserLevel = sessionStorage.getItem('userLevel');
    const parsedUserLevel = storedUserLevel
      ? parseInt(storedUserLevel, 10)
      : null;

    if (
      parsedUserLevel === requiredUserLevel ||
      parsedUserLevel === 1 ||
      (route.routeConfig?.path === 'home' && parsedUserLevel)
    ) {
      return true;
    } else if (parsedUserLevel) {
      this.router.navigate(['/home']);
      return false;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
