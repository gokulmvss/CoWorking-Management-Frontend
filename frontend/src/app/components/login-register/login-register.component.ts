import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationServiceService } from '../../service/authorization-service.service';
import { TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login-register',
  imports: [FormsModule,NgIf],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css',
  standalone:true
})
export class LoginRegisterComponent{

  role: string = '';   // Company or Owner
  isLogin: boolean = true; // Toggle Login/Register

  email: string = '';
  password: string = '';
  name: string = '';
  contact: string = '';

  constructor(private route: ActivatedRoute, private router: Router,
    private authService:AuthorizationServiceService) {
    this.role = this.route.snapshot.paramMap.get('role') || 'company';
  }

  toggleMode() {
    this.isLogin = !this.isLogin;
  }

  submitForm() {
    if (this.isLogin) {
      this.authService.login(this.role, this.email, this.password);
    } else {
      this.authService.register(this.role, this.email, this.password, this.name, this.contact);
    }
  }

  // role: string = '';
  // constructor(private route: ActivatedRoute, private authService: AuthorizationServiceService
  //   ,private router:Router
  // ) {}
  // ngOnInit(): void {
  //   this.role = this.route.snapshot.paramMap.get('role') || '';
  // }

  // login() {
  //   this.authService.login(this.role);
  // }
  // goToRegister() {
  //   this.router.navigate(['/register', this.role]);
  // }
}

