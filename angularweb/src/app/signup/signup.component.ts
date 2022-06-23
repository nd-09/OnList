import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(private authservice: AuthService, private router: Router) {}

  ngOnInit(): void {}
  form: any = {
    Firstname: null,
    Lastname: null,
    Email: null,
    Password: null,
    Confirm_password: null,
  };

  onSubmit(): void {
    const signup_val = this.form;
    // console.log('is it working?', signup_val);

    if (signup_val.Confirm_password === signup_val.Password) {
      this.authservice
        .singup(
          this.form.Firstname,
          this.form.Lastname,
          this.form.Email,
          this.form.Password
        )
        .subscribe({
          next: (data) => {
            // console.log(data);
            this.router.navigate([''])
          },
          error: (error) => {
            console.log(error);
          },
        });
    } else {
      // error  password does not match
    }
  }
}
