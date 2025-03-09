import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationServiceService } from '../../service/authorization-service.service';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [RouterLink,TitleCasePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  role: string = '';
  email: string = '';  
  password: string = '';  
  name: string = '';  
  contact: string = '';  

  constructor(private route: ActivatedRoute, private authService: AuthorizationServiceService, private router: Router) {}

  ngOnInit() {
    this.role = this.route.snapshot.paramMap.get('role') || '';
  }

  register() {
    this.authService.register(this.role, this.email, this.password, this.name, this.contact);
  }
}
