import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-followbox',
  templateUrl: './followbox.component.html',
  styleUrl: './followbox.component.css'
})
export class FollowboxComponent {
  callform : FormGroup;




constructor(private fbuild : FormBuilder, private http: HttpClient, private dialogRef: MatDialogRef<FollowboxComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,private snackBar: MatSnackBar,private datePipe: DatePipe){
  this.callform = this.fbuild.group({
   })
  }


  cancel(): void {
    // Reset the form or any other cancel logic here
    this.callform.reset();
  
    this.snackBar.open('fields are reseted', 'Dismiss', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'],
    });
    // Pass false to indicate cancellation
  }


  close(): void {
    // Reset the form or any other cancel logic here
    this.dialogRef.close(true); 
    this.snackBar.open('Create Panel Closed', 'Dismiss', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'],
    }); // Pass false to indicate cancellation
    window.location.reload();
  }


  submitData(): void {
    console.log(this.callform.value)
  }

}
