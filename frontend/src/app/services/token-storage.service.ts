import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
private TOKEN_KEY = "my-app-token";
private USER_KEY = "my-user-token";
  constructor() { 
   
  }

  signOut(): void {
    window.sessionStorage.clear();
  }
 
  public saveToken(token: string): void {

    window.sessionStorage.removeItem(this.TOKEN_KEY); 
    window.sessionStorage.setItem(this.TOKEN_KEY, token);


  }
  public getToken(): string | null {
    return window.sessionStorage.getItem(this.TOKEN_KEY);
   
  }
 
  public saveUser(id: number): void {
  let strId = id.toString();
  
  window.sessionStorage.removeItem(this.USER_KEY); 
  window.sessionStorage.setItem(this.USER_KEY, strId);
}
}
