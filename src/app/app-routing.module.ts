import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LoginComponent } from './sign-in/login/login.component';
import { ForgotPasswordComponent } from './sign-in/forgot-password/forgot-password.component';
import { VerifyOtpComponent } from './sign-in/verify-otp/verify-otp.component';
import { ResetPasswordComponent } from './sign-in/reset-password/reset-password.component';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/noauth.guard';


const routes  : Routes = [  
  { path: '',
  canActivate: [noAuthGuard], component:LoginComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-otp', component: VerifyOtpComponent},
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'navbar',
  canActivate:[authGuard],
  loadChildren:() => import('./component/maitra.module').then((m) => m.MaitraModule)},
];




@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
