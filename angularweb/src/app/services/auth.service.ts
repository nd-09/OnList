import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  singup(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Observable<any> {
    return this.http.post('http://localhost:8000/user/Signup', {
      firstName,
      lastName,
      email,
      password,
    });
  }
  login(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:8000/user/Signin', {
      email,
      password,
    });
  }
  logout() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
  }
isLogin(){
  return !!localStorage.getItem("token");
}
}
