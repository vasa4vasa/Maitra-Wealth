import { Component, Inject,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ToastComponent } from '../../toast/toast.component'; 
import { ToasterComponent } from '../../toaster/toaster.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialogcomp',
  templateUrl: './dialogcomp.component.html',
  styleUrl: './dialogcomp.component.css',
})
export class DialogcompComponent implements OnInit{

  currentDate: Date= new Date();
  curDate : any = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
  expireDate : any;
  newDate :any;

  userform : FormGroup;

  Name: any;
  Email: any;
  MobileNumber: any;
  SubDate: any ;
  ExpDate : any;
  sDate : any;
  eDate : any;

 

  constructor(private fbuild : FormBuilder, private http: HttpClient, private dialogRef: MatDialogRef<DialogcompComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private snackBar: MatSnackBar,private datePipe: DatePipe,private dialog : MatDialog,){
    this.userform = this.fbuild.group({
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      MobileNumber: ['',[Validators.required, Validators.pattern(/^\d{10}$/)]],
      SubDate :[this.curDate, Validators.required],
      ExpDate : [this.expireDate, Validators.required],
    });
  }


    ngOnInit(): void {
      const subDateControl = this.userform.get('SubDate');
      if (subDateControl) {
        subDateControl.valueChanges.subscribe(() => {
          this.updateExpDate();
        });
        this.updateExpDate(); // Call initially to set ExpDate based on SubDate
      }
    }

    showNotification(message: string): Observable<boolean> {
      const dialogRef = this.dialog.open(ToastComponent, {
        data: { message },
        width: 'auto',
        height: 'auto',
        disableClose: true
      });
      return dialogRef.afterClosed();
    }


  updateExpDate(): void {
    const subDateControl = this.userform.get('SubDate');
    if (subDateControl) {
      const subDateValue = subDateControl.value;
      if (subDateValue) {
        const newDate = new Date(subDateValue);
        newDate.setDate(newDate.getDate() + 7);
        this.expireDate = this.datePipe.transform(newDate, 'yyyy-MM-dd');
        const expDateControl = this.userform.get('ExpDate');
        if (expDateControl) {
          expDateControl.setValue(this.expireDate); // Update ExpDate field value
        }
      }
    }
  }
  


//   submitData():any{
//     console.log(this.userform.value);
//   this.SubDate = this.datePipe.transform(this.userform.value.SubDate, 'yyyy-MM-dd');
//   this.ExpDate = this.datePipe.transform(this.userform.value.ExpDate, 'yyyy-MM-dd');
//     if (this.userform.valid) {
//     let bodyData = {
//       "Name": this.Name,
//       "Email":this.Email,
//       "MobileNumber":this.MobileNumber,
//       "createdDate" : this.SubDate,
//       "Expiredate" : this.ExpDate
//     };
//     this.showNotification("Do you want to Add these Data").subscribe(confirmed => {
//       if (confirmed) {
//     this.http.post("http://localhost:8888/api/user/add/", bodyData).subscribe((resultData: any) => {
//       console.log(resultData);
//       if (resultData.status) {
//         this.snackBar.open('Successfully Created', 'Dismiss',{
//           duration:3000,
//           horizontalPosition:'center',
//           verticalPosition:'bottom',
//           panelClass:['custom-snackbar']
//         });
//         this.dialogRef.close();
//         setTimeout(() => {
//           window.location.reload();
//         }, 3000); // Reload the window after successful update
//       } else {
//         this.snackBar.open('Creation is not successful', 'Dismiss',{
//           duration:3000,
//           horizontalPosition:'center',
//           verticalPosition:'bottom',
//           panelClass:['custom-snackbar']
//         });
//       }
//     },
//   );
//     }
//   })}

    
// };

submitData(): any {
  console.log(this.userform.value);
  this.SubDate = this.datePipe.transform(this.userform.value.SubDate, 'yyyy-MM-dd');
  this.ExpDate = this.datePipe.transform(this.userform.value.ExpDate, 'yyyy-MM-dd');

  if (this.userform.valid) {
    let bodyData = {
      "Name": this.Name,
      "Email": this.Email,
      "MobileNumber": this.MobileNumber,
      "createdDate": this.SubDate,
      "Expiredate": this.ExpDate
    };
        this.http.post("http://localhost:8888/api/user/add/", bodyData).subscribe((resultData: any) => {
          console.log(resultData);
          if (resultData.status) {
            this.snackBar.open('Successfully Created', 'Dismiss', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['custom-snackbar']
            });
            this.dialogRef.close();
            setTimeout(() => {
              window.location.reload();
            }, 3000); // Reload the window after successful update
          } else {
            this.snackBar.open('Creation is not successful', 'Dismiss', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['custom-snackbar']
            });
          }
        },
          (error) => {
            this.snackBar.open('Error: ' + error.message, 'Dismiss', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['custom-snackbar']
            });
          }
        );
      }}


cancel(): void {
  // Reset the form or any other cancel logic here
  this.userform.reset();
  this.snackBar.open('Fields are reseted', 'Dismiss',{
    duration:3000,
    horizontalPosition:'center',
    verticalPosition:'bottom',
    panelClass:['custom-snackbar']
  });
}
close(): void {
  // Reset the form or any other cancel logic here
  this.dialogRef.close(true); 
}

  }


