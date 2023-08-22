import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { IdentityService } from "../services/IdentityService";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly _identityService: IdentityService,
    private readonly _router: Router
  ) {
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this._identityService.isAuthenticated) {
      this._router.navigateByUrl('/auth');

      return false;
    } else {
      return true;
    }
  }
}
