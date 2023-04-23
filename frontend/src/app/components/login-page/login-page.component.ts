import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  loginError: boolean = false; // Declare the loginError variable

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.authService.isLoggedin = true;
      this.router.navigate([this.authService.redirectUrl]);
    }
  }

  onSubmit() {
    const { username, password } = this.form;

    this.http
      .post<LoginPostData>('https://localhost:7027/api/Login/login', { username, password })
      .subscribe(
        (data) => {
          console.log(data);
          this.tokenStorage.saveToken(data.id_token);

         this.router.navigate(["/posts"], {queryParams: {username}});
        },
        (error) => {
          console.error(error);
          this.loginError = true; 
        }
      );
  }
}

export interface LoginPostData {
  id_token: string;
}