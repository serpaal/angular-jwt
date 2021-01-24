import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JwtStorageService } from '../services/jwt-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private router: Router, private authService: AuthService, private jwtStorage: JwtStorageService) { }

  ngOnInit(): void {
    const token: string = this.jwtStorage.getToken();
    if (token) {
      this.isLoggedIn = true;
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {       
        this.jwtStorage.saveToken(data.token);
        this.jwtStorage.saveUser(data.user);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['/']);
      },
      err => {       
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
  
}
