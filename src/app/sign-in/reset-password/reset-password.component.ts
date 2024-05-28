import { HttpClient } from '@angular/common/http';
import { core } from '@angular/compiler';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { Router } from '@angular/router';
import { ToastComponent } from '../../component/maitra/toast/toast.component';
import { ToasterComponent } from '../../component/maitra/toaster/toaster.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';



@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  email: string = '';
  new_password: string = '';
  confirm_password: string = '';
  passwordError: string | null = null;
  successMessage: string | null = null;

  constructor(private http: HttpClient, private router: ActivatedRoute, private routers: Router,private dialog : MatDialog){
    this.router.paramMap.subscribe(params => {
      this.email = params.get('email') || '';
    });
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


  resetPassword(): void{
    this.passwordError = null;
    this.successMessage = null;
    if(!this.new_password || !this.confirm_password || this.new_password !== this.confirm_password) {
      this.passwordError = 'Please enter valid password and make sure password match';
      return;
    }

    this.http.post<any>('http://localhost:8888/api/reset-password',{
      email: this.email,
      new_password: this.new_password
    }).subscribe({
      next: () => {
        this.showNoti('Password reset successfully',1000);
        localStorage.setItem('otpVerified', 'false');
        this.routers.navigate(['/']);
      },
      error: (error) =>{
        console.error(error);
        this.passwordError = error.error.message || 'A error occured while resetting password';

      }
    });
  }
}
