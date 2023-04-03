import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

 isLoggedin: boolean = false;
 public redirectUrl: string = "";

  constructor(private http:HttpClient) { }

  login(username: string, password: string){
    return this.http.post<string>("https://localhost:7027/api/Login/login", {username,password});
    
  }
}
