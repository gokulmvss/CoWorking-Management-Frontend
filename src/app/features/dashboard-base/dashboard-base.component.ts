import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../core/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-base',
  // imports: [],
  standalone:false,
  templateUrl: '',
  styleUrl: ''
})
export class DashboardBaseComponent implements OnInit {
  currentUser: User | null = null;
  isLoading = true;
  error: string | null = null;
  
  constructor(
    protected authService: AuthService,
    protected router: Router
  ) {}
  
  ngOnInit(): void {
    this.loadCurrentUser();
  }
  
  loadCurrentUser(): void {
    this.isLoading = true;
    this.error = null;
    
    this.authService.getCurrentUserDetails()
      .subscribe({
        next: (user) => {
          this.currentUser = user;
          this.isLoading = false;
          this.onUserLoaded(user);
        },
        error: (error) => {
          this.error = 'Failed to load user data';
          this.isLoading = false;
          console.error('Error loading user data:', error);
        }
      });
  }
  
  onUserLoaded(user: User): void {
    // Override in child components
  }
  
  logout(): void {
    this.authService.logout();
  }
}
