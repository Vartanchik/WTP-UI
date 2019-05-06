import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './account/login/login.component';
import { RegistrationComponent } from './account/registration/registration.component';
import { UserProfileComponent } from './userprofile/userprofile.component';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import { ChangePasswordComponent } from './account/changepassword/changepassword.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  {
    path: 'account', //component: AccountComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full'},
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'changepassword', component: ChangePasswordComponent}
    ]
  },
  { path: 'userprofile', component: UserProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
