import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent,HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { TokenService } from '../service/auth.tokenservice';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private tokenService: TokenService, private router: Router) {} 
  intercept(req: HttpRequest<any>, next: HttpHandler){
    const token = localStorage.getItem('token');
    const UserEmail = localStorage.getItem('UserEmail');

    console.log('Token:', token);
    console.log('UserEmail:', UserEmail);
    
  if (token && UserEmail) {
    const userEmailString = UserEmail.toString();
    console.log('Headers before clone:', req.headers.keys());
    // Clone the request and add the token to the Authorization header
    const headers = new HttpHeaders({
      'Authorization': `${token}`,
      'useremail': userEmailString
    });
    const authReq = req.clone({
      headers: headers
    });
    console.log('Headers after clone:', authReq.headers);
    const userEmailHeaderValue = authReq.headers.get('useremail');
  console.log('UserEmail header value:', userEmailHeaderValue);

    console.log('Headers after clone:', authReq.headers.keys());
    console.log('Headers after clone:', authReq.headers); 
    return next.handle(authReq).pipe(
      tap(
        (event) => {},
        (error) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            this.tokenService.updateToken(null); // Clear token
            // Redirect to login page
            this.router.navigate(['/']);
            localStorage.removeItem('token');
            localStorage.removeItem('UserEmail');
            // You'll need to inject Router in this service or handle redirection another way
          }
        }
      )
    );
  } else {
    return next.handle(req);
  }
}
}