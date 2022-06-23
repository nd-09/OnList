import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient, private auth: AuthService, private router:Router) {}
  form: any = {
    Email: null,
    Password: null,
  };
  ngOnInit(): void {}
  
  onLogin() {
    // const login = this.form;
    this.auth.login(
      this.form.Email,
      this.form.Password
    ).subscribe({
      next:(data)=>{
        window.localStorage.setItem("token",data.token);
         window.localStorage.setItem("Name",data.user.firstName);
         window.localStorage.setItem("user",data.user._id);
        // window.localStorage.setItem("user",JSON.stringify(data));
       if(window.localStorage.getItem("token")){
        this.router.navigate(['/dashboard']); 
        Swal.fire('Login Successfull','','success')
       }else{
          this.router.navigate(['/login'])
       }
      },
      error:(error)=>{
         console.log(error);
         Swal.fire('oops','Something went wrong','warning')
      }
    })


  }
}
