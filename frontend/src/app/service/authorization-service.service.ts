import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationServiceService {
  // private userRole: string | null = null;
  constructor(private router: Router) { }

  login(role: string, email: string, password: string) {
    console.log(`${role} logged in with ${email}`);
    this.router.navigate([`/${role}/dashboard`]);
  }

  register(role: string, email: string, password: string, name: string, contact: string) {
    console.log(`${role} registered with ${email}`);
    this.router.navigate([`/${role}/dashboard`]);
  }

  // login(role: string) {
  //   this.userRole = role;
  //   switch (role) {
  //     case 'user':
  //       this.router.navigate(['/employee-dashboard']);
  //       break;
  //     case 'company':
  //       this.router.navigate(['/company-dashboard']);
  //       break;
  //     case 'owner':
  //       this.router.navigate(['/owner-dashboard']);
  //       break;
  //     default:
  //       this.router.navigate(['/']);
  //   }
  // }

  // register(role: string) {
  //   alert(`${role} registered successfully! Redirecting to login.`);
  //   this.router.navigate(['/login', role]);
  // }

  
  // logout() {
  //   this.userRole = null;
  //   this.router.navigate(['/']);
  // }

  // getRole(): string | null {
  //   return this.userRole;
  // }
}
