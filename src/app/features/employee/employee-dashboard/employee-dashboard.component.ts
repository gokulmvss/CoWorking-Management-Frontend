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
export class EmployeeDashboardComponent extends DashboardBaseComponent{
  companyId: number | null = null;
  
  constructor(
    protected override authService: AuthService,
    protected override router: Router
  ) {
    super(authService, router);
  }
  
  override onUserLoaded(user: User): void {
    // Check if user has the COMPANY_ADMIN role
    if (!user.roles.includes('COMPANY_ADMIN')) {
      this.authService.logout();
      this.router.navigate(['/auth/login']);
      return;
    }
    
    // Set companyId from user data
    this.companyId = user.companyId || null;
    
    // If no companyId is available, something's wrong
    if (!this.companyId) {
      console.error('Company admin user has no associated company ID');
    }
  }
  
  addEmployee(): void {
    // In a real implementation, navigate to employee form or open modal
    console.log('Add employee clicked');
  }
}
