import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthguardGuard } from './services/authguard.guard';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [

  {
    path:'',component:LoginComponent
  },
  {
    path:'signup',component:SignupComponent
  },
  {

    path:'dashboard',component:DashboardComponent,canActivate:[AuthguardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
