import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LoginService } from "./pages/login/login.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: LoginService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
@Injectable({
  providedIn: "root",
})
export class LoggedinGuard implements CanActivate {
  constructor(private authService: LoginService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {
    if (this.authService.userRole) {
      this.router.navigate([""]);
      return false;
    }
    return true;
  }
}
