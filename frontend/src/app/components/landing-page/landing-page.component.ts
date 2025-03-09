import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { NgIf } from '@angular/common';
@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  // selectedRole: string | null = null;

  // constructor(private router: Router) {}

  // showOptions(role: string) {
  //   this.selectedRole = role;
  // }

  // goToLogin(role: string) {
  //   this.router.navigate(['/login', role]);
  // }

  // goToRegister(role: string) {
  //   this.router.navigate(['/register', role]);
  // }

  constructor(private router: Router) {}

  navigateTo(role: string) {
    if (role === 'user') {
      this.router.navigate(['/auth/user']);  // Direct login for users
    } else {
      this.router.navigate(['/auth', role]); // Login/Register for company/owner
    }
  }
}
