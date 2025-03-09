import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { CompanyDashboardComponent } from './components/Dashboards/company-dashboard/company-dashboard.component';
import { SpaceOwnerDashboardComponent } from './components/Dashboards/space-owner-dashboard/space-owner-dashboard.component';
import { EmployeeDashboardComponent } from './components/Dashboards/employee-dashboard/employee-dashboard.component';
import { RegisterComponent } from './components/register/register.component';
export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'auth/:role', component: LoginRegisterComponent },
    { path: 'company/dashboard', component: CompanyDashboardComponent },
  { path: 'owner/dashboard', component: SpaceOwnerDashboardComponent },
  { path: 'user/dashboard', component: EmployeeDashboardComponent },
    // { path: 'register/:role', component: RegisterComponent },
    // { path: 'employee-dashboard', component: EmployeeDashboardComponent },
    // { path: 'company-dashboard', component: CompanyDashboardComponent },
    // { path: 'owner-dashboard', component: SpaceOwnerDashboardComponent },

    { path: '**', redirectTo: '', pathMatch: 'full' }
];
