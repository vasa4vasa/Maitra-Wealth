import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogServiceService {
  private isDialogOpenSubject = new Subject<boolean>();
  isDialogOpen$ = this.isDialogOpenSubject.asObservable();

  constructor() {}

  setIsDialogOpen(isOpen: boolean) {
    this.isDialogOpenSubject.next(isOpen);
  }
}
