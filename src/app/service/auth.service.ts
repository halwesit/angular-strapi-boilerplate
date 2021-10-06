import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NewUser } from '../interfaces/new-user';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public JWT: string = ''
  constructor(private http: HttpClient) { }

  signupUser(user: NewUser) {
    return this.http.post<{
      jwt: string
      user: User
    }>(`${environment.apiURL}/auth/local/register/`, user)
  }

  loginUser(user: { identifier: string, password: string }) {
    return this.http.post<{
      jwt: string
      user: User
    }>(`${environment.apiURL}/auth/local/`, user)
  }

  loggedinUser() {
    return !!localStorage.getItem('jwt')
  }

  getJWTtoken() {
    return localStorage.getItem('jwt')
  }

  logout() {
    localStorage.removeItem('jwt')
    return
  }
}
