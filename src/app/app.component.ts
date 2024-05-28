import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { TokenService } from './service/auth.tokenservice';
import { StorageService } from './service/auth.storageservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private storageEventListener!: (event: StorageEvent) => void;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Initialize storageEventListener
    this.storageEventListener = (event: StorageEvent) => {
      if (event.storageArea === localStorage && event.key === 'token') {
        if (!event.newValue) {
          this.router.navigate(['/']);
        }
      }
    };
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Check initial token
      const initialToken = localStorage.getItem('token');
      if (!initialToken) {
        this.router.navigate(['/']);
      }

      // Subscribe to token changes
      this.tokenService.token$.subscribe(token => {
        if (!token) {
          this.router.navigate(['/']);
          localStorage.removeItem('token');
          localStorage.removeItem('UserEmail');
        }
      });

      // Listen for changes in localStorage
      window.addEventListener('storage', this.storageEventListener);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('storage', this.storageEventListener);
    }
  }
}
