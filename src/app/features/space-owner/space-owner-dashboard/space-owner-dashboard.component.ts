import { Component } from '@angular/core';
import { DashboardBaseComponent } from '../../dashboard-base/dashboard-base.component';
import { AuthService, User } from '../../../core/auth/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-space-owner-dashboard',
  imports: [CommonModule,NgIf],
  templateUrl: './space-owner-dashboard.component.html',
  styleUrl: './space-owner-dashboard.component.css'
})
export class SpaceOwnerDashboardComponent extends DashboardBaseComponent {
  coworkingspaceId: number | null = null;

  constructor(
    protected override authService: AuthService,
    protected override router: Router
  ) {
    super(authService, router);
  }
  
  override onUserLoaded(user: User): void {
    // Check if user has the SPACE_OWNER role
    if (!user.roles.includes('SPACE_OWNER')) {
      this.authService.logout();
      this.router.navigate(['/auth/login']);
    }
    this.coworkingspaceId=user.coworkingSpaceId || null;
    console.log(this.coworkingspaceId);

    if (!this.coworkingspaceId) {
      console.error('Company admin user has no associated company ID');
    }
  }
}