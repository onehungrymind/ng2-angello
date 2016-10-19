import { Injectable, ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
import { EndpointConfigService } from './endpoint-config.service';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class LoginService {
  // Configure Auth0
  lock = new Auth0Lock('Fq8hKAkghu45WpnqrYTc6dbvXhBUdP7l', 'angello.auth0.com', {
    closable: true
  });

  constructor(
    private router: Router,
    private ref: ApplicationRef,
    private endpointConfigService: EndpointConfigService
  ) {}

  public login() {
    // Call the show method to display the widget.
    this.lock.show((error, profile, id_token) => {
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', id_token);
      this.endpointConfigService.setUser(profile.user_id);
      this.router.navigateByUrl('/');
      this.ref.tick();
    });
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  };
}
