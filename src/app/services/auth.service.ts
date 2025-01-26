import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url : string = "http://localhost:3000";

  localStorageKey:string = 'user-shop';
  constructor(private http: HttpClient) { }

  
  registerUser(user:any) {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this.http.post(this.url+"/auth/register", user, {headers: headers});
  }

  loginUser(user:any) {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this.http.post(this.url+"/auth/login", user, {headers: headers});
  }

  saveUserToLocalStorag(userObject: any){
    window.localStorage.setItem(this.localStorageKey, JSON.stringify(userObject));
    
  }

  signOutUser(){
    window.localStorage.removeItem(this.localStorageKey);
  }

  loggedInUser(){
    let userInLocalStorage =  window.localStorage.getItem(this.localStorageKey);
    if(userInLocalStorage){
      return JSON.parse(userInLocalStorage)
    }
    return null
  }
  
}



