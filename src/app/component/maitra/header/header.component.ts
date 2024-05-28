import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = 'navbar';
  activeItem: string|null=null;
  token: string | null = null;

  constructor (private router: Router){}
  setActiveItem(item: string) {
    this.activeItem = item;
  }

  logout(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('UserEmail');
    this.router.navigate(['/']);
  } 

}
