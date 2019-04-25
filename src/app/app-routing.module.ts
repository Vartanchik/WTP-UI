import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { RegistrationComponent } from './account/registration/registration.component';
import { LoginComponent } from './account/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthdetailsComponent } from './authdetails/authdetails.component';
import { UserprofileComponent } from './account/userprofile/userprofile.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch:'full'},
  { path: 'home', component: HomeComponent },
  {
    path: 'account', component: AccountComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'userprofile', component: UserprofileComponent }
    ]
  },
  { path: 'authdetails', component: AuthdetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
