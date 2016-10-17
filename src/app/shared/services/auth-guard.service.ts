import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    return localStorage.getItem('id_token') && tokenNotExpired() ? true : this.router.navigateByUrl('/login');
  }
}
