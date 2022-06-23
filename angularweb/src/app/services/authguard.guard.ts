import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthguardGuard implements CanActivate {
  constructor(private login: AuthService, private router: Router) {}
  canActivate():boolean {
    if (this.login.isLogin()){  
    return true;
    }else{
      alert("Unauthorized Access!");
      this.router.navigate([''])
      return false;
    }
  }
}
