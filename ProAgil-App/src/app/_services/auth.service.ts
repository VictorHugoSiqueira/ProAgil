import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();
  baseURL = 'http://localhost:5000/api/user';
  
  constructor(private http: HttpClient) { }

  login(){

  }
  register(){

  }

  loggedIn() {

  }
}
