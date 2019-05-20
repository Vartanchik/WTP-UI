import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyDatePickerModule } from 'mydatepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { AccountService } from './services/account.service';
import { LoginComponent } from './account/login/login.component';
import { RegistrationComponent } from './account/registration/registration.component';
import { UserProfileComponent } from './userprofile/userprofile.component';
import { UserprofileService } from './services/userprofile.service';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    LoginComponent,
    RegistrationComponent,
    UserProfileComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    HeaderComponent,
    FooterComponent  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    FormsModule,
    MyDatePickerModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    AccountService,
    UserprofileService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
