import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { ToastComponent } from '../../component/maitra/toast/toast.component';
import { ToasterComponent } from '../../component/maitra/toaster/toaster.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css'
})
export class VerifyOtpComponent {
  email: string = '';
  otp: string ='';
  otpError: string | null= null;
  

  constructor(private http: HttpClient,private router: ActivatedRoute, private routers: Router,private dialog : MatDialog){
    this.router.paramMap.subscribe(params => {
      this.email = params.get('email') || '';
    });
  }

  showNotification(message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ToastComponent, {
      data: { message },
      width: 'auto',
      height: 'auto',
      disableClose: true
    });
    return dialogRef.afterClosed();
  }

  showNoti(message: string, delayMs: number): void {
    const dialogRef = this.dialog.open(ToasterComponent, {
      data: { message },
      width: 'auto',
      height: 'auto',
      disableClose: true // Allow closing dialog by clicking on the background
    });
  
    // Close the dialog after the specified delay
    setTimeout(() => {
      dialogRef.close();
    }, delayMs);
  
  }

  verifyOTP() {
    this.otpError = null;

    if(!this.otp){
      this.otpError = 'Please enter valid OTP';
      return;
    }

    this.http.post<any>('http://localhost:8888/api/verify-otp', {email: this.email , otp: this.otp}).subscribe({
      next: (response) => {
        console.log(response);
        this.showNoti("OTP Verfication successfully", 1000); 
        localStorage.setItem('otpVerified', 'true');
        this.routers.navigate(['/reset-password',{ email: this.email }]);
      },
      error: (error) => {
        console.error(error);
        if(error.status === 400){
          this.showNoti("Invalid OTP", 3000);
          this.otpError = 'Invalid OTP';
        }
      }
    });
  }
  resendOTP(): void {
    this.http.post<any>('http://localhost:8888/api/forgot-password', { email: this.email }).subscribe({
      next: (response) => {
        console.log('Response from server:',response);
        this.showNoti("OTP Verfication successfully", 3000); 
        console.log('otp successfully sent');
      },
      error: (error) => {
        console.error(error);
        this.showNoti("something went wrong", 3000); 
      }
      
    });
  }

}
