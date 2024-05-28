import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastComponent } from '../../component/maitra/toast/toast.component';
import { ToasterComponent } from '../../component/maitra/toaster/toaster.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'forgot-password',
  templateUrl:'./forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = "";
  emailError: string | null= null;
  serverError: string | null = null;

  constructor(private http: HttpClient, private router: Router,private dialog : MatDialog) {}

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


  sendOTP() {
    this.emailError = null;
    this.serverError = null;

    if(!this.email){
      this.emailError = 'Please enter email';
      return;
    }
    console.log('Sending OTP for email:', this.email);

    this.http.post<any>('http://localhost:8888/api/forgot-password', { email: this.email }).subscribe({
      next: (response) => {
        console.log('Response from server:',response);
        this.showNoti("OTP sent successfully", 1000); 
        console.log('otp successfully sent');
        this.router.navigate(['/verify-otp',{ email: this.email }]);
      },
      error: (error) => {
        console.error(error);
        if(error.status === 404){
          this.emailError = 'Email not found';
        }else{
          this.serverError = 'Server unreached';
        }
      }
      
    });
  }
}
