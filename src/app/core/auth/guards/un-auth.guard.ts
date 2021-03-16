import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "../services/auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class UnAuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authService.isTokenValid()) {
      return true;
    } else {
      this.router.navigate(["/"]);
      return false;
    }
  }
}
