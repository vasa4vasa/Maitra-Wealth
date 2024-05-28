import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './auth.storageservice';


@Injectable({
  providedIn: 'root'
})
export class TokenService {
    private _tokenSubject = new BehaviorSubject<string | null>(this.getInitialToken());
    token$ = this._tokenSubject.asObservable();
  
    constructor(private storageService: StorageService) {}
  
    private getInitialToken(): string | null {
      return this.storageService.getItem('token');
    }
  
    updateToken(newToken: string | null) {
      this.storageService.setItem('token', newToken || '');
      this._tokenSubject.next(newToken);
    }
  }