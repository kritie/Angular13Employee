import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';

import { CrudEmployeeService } from '../services/utils/crud-employee.service';
  
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

constructor(private empSvc: CrudEmployeeService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | UrlTree {
        if (this.empSvc.emp.isLoggedIn) {
            return true;
        }  
        return this.router.createUrlTree(['/login']); 
    }
}
  