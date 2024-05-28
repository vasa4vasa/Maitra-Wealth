import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class noAuthGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(): boolean {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
          this.router.navigate(['/navbar/dash']);
          return false;
        } else {
          return true;
      }
      } else {
          return false;
      }
  }
}
