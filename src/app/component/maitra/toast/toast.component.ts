import { Component, Inject, HostListener,ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  @ViewChild('dialogContainer') dialogContainer: ElementRef | undefined;
  @ViewChild('focusElement') focusElement: ElementRef | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<ToastComponent> ) {}

  ngAfterViewInit(): void {
    if (this.focusElement) {
      this.focusElement.nativeElement.focus();
    }
  }
  
  get message(): string {
    return this.data ? this.data.message : '';
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmitClick(): void {
    // Add your form submission logic here
    // For example, you can emit an event or perform HTTP request
    // Then close the dialog
    this.dialogRef.close();
  }

  
  @HostListener('document:keydown.enter', ['$event'])
  onDialogEnter(event: KeyboardEvent): void {
    // Close the dialog when Enter key is pressed
    this.dialogRef.close(true);
  }


}
