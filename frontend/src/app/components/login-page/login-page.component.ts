import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import the FormsModule

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})


export class LoginPageComponent implements OnInit {

  form:any = {
    username:null,
    password:null
  }


  constructor(
    private authService:AuthService,
    private tokenStorage: TokenStorageService,
    private http:HttpClient,
    private router: Router) {}
  
    ngOnInit(): void{
      if (this.tokenStorage.getToken()) {
        this.authService.isLoggedin = true;
        this.router.navigate([this.authService.redirectUrl]);
      }
    }


    onSubmit(){
      const {username,password} = this.form;

    
      this.http.post<LoginPostData>("https://localhost:7027/api/Login/login", {username,password}).subscribe(data=>{
    
      console.log(data);

      
      
      this.tokenStorage.saveToken(data.id_token);
      //  this.tokenStorage.saveUser(data.id);
        

        this.router.navigate([this.authService.redirectUrl]);
       // window.location.reload();


      
      })
    }
}

export interface LoginPostData{
  id_token:string;
 // id:number;
}
