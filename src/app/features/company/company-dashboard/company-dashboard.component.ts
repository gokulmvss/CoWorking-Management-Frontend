import { Component } from '@angular/core';
import { DashboardBaseComponent } from '../../dashboard-base/dashboard-base.component';
import { AuthService, EmployeeCredentials, User } from '../../../core/auth/services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-company-dashboard',
  imports: [NgIf,AddEmployeeComponent],
  templateUrl: './company-dashboard.component.html',
  styleUrl: './company-dashboard.component.css'
})
export class CompanyDashboardComponent extends DashboardBaseComponent {
  companyId: number | null = null;
  showAddEmployeeModal = false;
  
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

  openAddEmployeeModal(): void {
    this.showAddEmployeeModal = true;
  }
  
  closeAddEmployeeModal(): void {
    this.showAddEmployeeModal = false;
  }
  
  handleEmployeeAdded(credentials: EmployeeCredentials): void {
    console.log('Employee added successfully:', credentials);
    // In a real implementation, you might refresh the employees list
  }
}
