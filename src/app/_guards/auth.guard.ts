import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
          try{
            jwt.verify(JSON.parse(localStorage.getItem('currentUser').valueOf()).token,'auth_complete');
            console.log('Passed verification');
            return true;
          }catch(err){
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login']);
            console.log('Failed authentication.');
            return false;
          }
        }
    }
}