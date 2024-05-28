import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule} from './app-routing.module';
import { ForgotPasswordComponent } from './sign-in/forgot-password/forgot-password.component';
import { LoginComponent } from './sign-in/login/login.component';
import { VerifyOtpComponent } from './sign-in/verify-otp/verify-otp.component';
import { ResetPasswordComponent } from './sign-in/reset-password/reset-password.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { StorageService } from './service/auth.storageservice';



@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ForgotPasswordComponent,
        VerifyOtpComponent,
        ResetPasswordComponent,
    ],
    providers: [
        StorageService,
        provideClientHydration(),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
          }
      ],
    
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ]
})
export class AppModule { }
