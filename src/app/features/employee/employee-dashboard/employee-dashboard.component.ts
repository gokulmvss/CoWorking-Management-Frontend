import { Component } from '@angular/core';
import { DashboardBaseComponent } from '../../dashboard-base/dashboard-base.component';
import { AuthService, User } from '../../../core/auth/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-employee-dashboard',
  imports: [CommonModule,NgIf],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent extends DashboardBaseComponent {
  companyId: number | null = null;
  employeeId: number | null = null;
  
  // Mock data for demonstration
  todayDate: Date = new Date();
  
  constructor(
    protected override authService: AuthService,
    protected override router: Router
  ) {
    super(authService, router);
  }
  
  override onUserLoaded(user: User): void {
    // Check if user has the EMPLOYEE role
    if (!user.roles.includes('EMPLOYEE')) {
      this.authService.logout();
      this.router.navigate(['/auth/login']);
      return;
    }
    
    // Set companyId from user data
    this.companyId = user.companyId || null;
    
    // In a real application, you might load employee details here
    // For now, we're just using a mock employeeId
    this.employeeId = 1; // Normally would be fetched from API
  }
  
  bookSeat(): void {
    // In a real implementation, navigate to booking form or open modal
    console.log('Book seat clicked');
  }
  
  // Format date for display
  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}
