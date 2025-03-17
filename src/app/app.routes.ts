import { Routes } from '@angular/router';
// import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LandingComponent } from './landing/landing/landing.component';
import { AuthSelectComponent } from './auth/auth-select/auth-select.component';
import { LoginComponent } from './auth/login/login.component';
import { EmployeeDashboardComponent } from './features/employee/employee-dashboard/employee-dashboard.component';
import { CompanyDashboardComponent } from './features/company/company-dashboard/company-dashboard.component';
import { SpaceOwnerDashboardComponent } from './features/space-owner/space-owner-dashboard/space-owner-dashboard.component';
import { RegisterCompanyComponent } from './auth/register/register.component';
import { RegisterSpaceOwnerComponent } from './auth/register-owner/register-owner.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { RoleGuard } from './core/auth/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'auth',
    children: [
      { path: 'select', component: AuthSelectComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register-space-owner', component: RegisterSpaceOwnerComponent },
      { path: 'register-company', component: RegisterCompanyComponent }
    ]
  },
  {
    path: 'space-owner',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['SPACE_OWNER'] },
    children: [
      { path: 'dashboard', component: SpaceOwnerDashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'company',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['COMPANY_ADMIN'] },
    children: [
      { path: 'dashboard', component: CompanyDashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'employee',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['EMPLOYEE'] },
    children: [
      { path: 'dashboard', component: EmployeeDashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];

// export const routes: Routes = [
//     // { path: 'dashboard', component: DashboardComponent },
//     // { path:'',redirectTo:'/dashboard',pathMatch:'full'}.
//     {
//         path: '',
//         component: LandingComponent
//       },
//       {
//         path: 'auth',
//         children: [
//           { path: 'select', component: AuthSelectComponent },
//           { path: 'login', component: LoginComponent },
//           { path: 'register-space-owner', component: RegisterSpaceOwnerComponent },
//         { path: 'register-company', component: RegisterCompanyComponent }
//         ]
//       },
//       {
//         path: 'space-owner',
//         children: [
//           { 
//             path: 'dashboard', 
//             component: SpaceOwnerDashboardComponent,
//             // canActivate: [AuthGuard, RoleGuard],
//             // data: { roles: ['SPACE_OWNER'] }
//           }
//         ]
//       },
//       {
//         path: 'company',
//         children: [
//           { 
//             path: 'dashboard', 
//             component: CompanyDashboardComponent,
//             // canActivate: [AuthGuard, RoleGuard],
//             // data: { roles: ['COMPANY_ADMIN'] }
//           }
//         ]
//       },
//       {
//         path: 'employee',
//         children: [
//           { 
//             path: 'dashboard', 
//             component: EmployeeDashboardComponent,
//             // canActivate: [AuthGuard, RoleGuard],
//             // data: { roles: ['EMPLOYEE'] }
//           }
//         ]
//       },
//       { path: '**', redirectTo: '' }
// ];
