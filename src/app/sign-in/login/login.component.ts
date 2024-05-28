import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { ToastComponent } from '../../component/maitra/toast/toast.component';
import { ToasterComponent } from '../../component/maitra/toaster/toaster.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  title = 'sample';
  UserEmail: string = '';
  Password: string = '';
  emailError: string | null= null;
  passwordError: string | null = null;
  serverError: string | null = null;


  constructor(private loginService: LoginService, private router: Router,private dialog : MatDialog){}

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


  onSubmit(): void {
    this.emailError = null;
    this.passwordError = null;
    this.serverError = null;

    if(!this.UserEmail){
      this.emailError = 'Please enter username';
      return;
    }

    if(!this.Password){
      this.passwordError = 'Please enter password';
      return;
    }

    this.loginService.login(this.UserEmail,this.Password).subscribe({
      next:(response: any) => {
        localStorage.setItem ('token', response.token);
        localStorage.setItem('UserEmail', this.UserEmail);
        this.router.navigate(['/navbar/dash']);
      },
      error: (error) => {
        if (error.status === 401) {
          if (error.error === 'Unauthorized: Invalid token' || error.error === 'Unauthorized: No token provided') {
            // Clear token from local storage
            localStorage.removeItem('token');
            // Redirect to login page
            this.router.navigate(['/']);
          } else if (error.error === 'Invalid username') {
            this.emailError = error.error;
          } else {
            this.passwordError = 'Wrong password';
          }
        } else if (error.status === 400) {
          this.serverError = error.error;
        } else {
          this.showNoti("An error occured. please try again later.",3000);
        }
      }
    });
  }
}
