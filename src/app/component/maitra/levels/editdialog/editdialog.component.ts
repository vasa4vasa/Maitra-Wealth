import { Component, Inject, ViewChild,AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ToastComponent } from '../../toast/toast.component';
import { ToasterComponent } from '../../toaster/toaster.component';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-editdialog',
  templateUrl: './editdialog.component.html',
  styleUrl: './editdialog.component.css'
})
export class EditdialogComponent implements AfterViewInit,OnInit{

  
  empform : FormGroup;
  isResultLoaded = false;
  selectedSN : any;
  selectedOption : any;
  SNOptions :any[]= [];
  selectedSNOption : any[]=[];
  calculatedValues: { [key: string]: any } = {}; 
  TV: any;
  SN: any;
  MN: any;
  R1: any;
  R2: any;
  R3: any;
  S1: any;
  S2: any;
  S3: any;
  DV : any;
  GN : any;
  cal:any;

  R1a: any;
  R2a: any;
  R3a: any;
  S1a: any;
  S2a: any;
  S3a: any;

  getdata:any;

 currentDate :Date = new Date();

  @ViewChild('matSelect') matSelect: MatSelect | undefined;

  constructor(private fbuild : FormBuilder, private http: HttpClient, private dialogRef: MatDialogRef<EditdialogComponent>, private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,private datePipe: DatePipe, private dialog : MatDialog){
    this.empform = this.fbuild.group({
      TV : [this.data.TV,Validators.required],
      SN : [this.data.SN,Validators.required],
      MN : [this.data.MN, Validators.required],
      R1 : [this.R1a],
      R2 : [this.R2a],
      R3 : [this.R3a],
      S1 : [this.S1a],
      S2 : [this.S2a],
      S3 : [this.S3a],
    });
    this.getAllLevels();
  }

ngOnInit(): void {
  const subDateControl = this.empform.get('MN');
      if (subDateControl) {
        subDateControl.valueChanges.subscribe(() => {
          this.updateExpDate();
        });
        this.updateExpDate(); // Call initially to set ExpDate based on SubDate
      }
      this.geteditdata();
      alert(this.getdata.R3);
}

geteditdata() {
  this.http.get("http://localhost:8888/api/levels/edit/" + this.data.SN)
    .subscribe((resultData: any) => {
      if (resultData.status && resultData.data.length > 0) {
        this.getdata = resultData.data[0]; // Assuming there's only one object in the array
        console.log("Retrieved data:", this.getdata);
        this.updateExpDate(); // Call updateExpDate after data retrieval
      } else {
        alert("Failed to retrieve data: " + resultData.message);
      }
      this.getAllLevels(); // Refreshing data if needed
    }, error => {
      console.error("An error occurred while retrieving data:", error);
      alert("An error occurred while retrieving data. Please try again later.");
    });
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
 
  const control = this.empform.get('MN');
  if (control) {
    const value = control.value;
    if (value) {
      console.log("MN:", value);

      // Check if getdata is populated and required properties exist
      if (this.getdata &&
          typeof this.getdata.R1 !== 'undefined' && typeof this.getdata.R2 !== 'undefined' &&
          typeof this.getdata.R3 !== 'undefined' && typeof this.getdata.T1 !== 'undefined' &&
          typeof this.getdata.T2 !== 'undefined' && typeof this.getdata.T3 !== 'undefined') {

        console.log("getdata.R1:", this.getdata.R1);

        const MNValue = Number(value);
        const R1Value = Number(this.getdata.R1);
        const R2Value = Number(this.getdata.R2);
        const R3Value = Number(this.getdata.R3);
        const S1Value = Number(this.getdata.T1);
        const S2Value = Number(this.getdata.T2);
        const S3Value = Number(this.getdata.T3);

        if (!isNaN(MNValue) && !isNaN(R1Value) && !isNaN(R2Value) && !isNaN(R3Value) && !isNaN(S1Value) && !isNaN(S2Value) && !isNaN(S3Value)) {
          this.R1a = MNValue + R1Value;
          this.R2a = MNValue + R2Value;
          this.R3a = MNValue + R3Value;
          this.S1a = MNValue - S1Value;
          this.S2a = MNValue - S2Value;
          this.S3a = MNValue - S3Value;

          // Additional calculations
          // For example, let's calculate the sum of R1a, R2a, and R3a
          const sumR = this.R1a + this.R2a + this.R3a;

          // Update form control values
          this.empform.patchValue({
            R1: this.R1a,
            R2: this.R2a,
            R3: this.R3a,
            S1: this.S1a,
            S2: this.S2a,
            S3: this.S3a,
            sumR: sumR // Assuming you have a form control named 'sumR' to display the sum
          });
        } else {
          console.error('MN or some properties in getdata are not valid numbers');
        }
      } else {
        console.error('getdata is not populated or some properties in getdata are undefined');
      }
    }
  }
}


  ngAfterViewInit() {
    if (this.matSelect) {
      this.matSelect.valueChange.subscribe(value => {
        console.log(value);
      });
    }
}

  getAllLevels() {
    this.http.get("http://localhost:8888/api/commodities")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.SNOptions = resultData.data;
      });

  } 


  submitData() {
    
    console.log(this.empform.value);
    if (this.empform.valid) {
      this.showNotification("Do you want to update these fields").subscribe(confirmed => {
        if (confirmed) {
      let bodyData = {
        "TV": this.empform.value.TV,
        "SN": this.empform.value.SN,
        "MN": this.empform.value.MN,
        "R1": this.empform.value.R1,
        "R2": this.empform.value.R2,
        "R3": this.empform.value.R3,
        "S1": this.empform.value.S1,
        "S2": this.empform.value.S2,
        "S3": this.empform.value.S3,
        "updated_on": this.datePipe.transform(this.currentDate, 'yyyy-MM-dd hh:mm:ss a')
      };
      this.http.put("http://localhost:8888/api/levels/update/" + this.empform.value.SN, bodyData).subscribe((resultData: any) => {
        this.snackBar.open('Successfully Updated', 'Dismiss', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['custom-snackbar']
        }); 
        setTimeout(() => {
          window.location.reload();
        }, 3000); // Reload the window after successful update
    });
  }})}
}



cancel(): void {
  // Reset the form or any other cancel logic here
  this.empform.reset();  // Pass false to indicate cancellation
}
close(): void {
  // Reset the form or any other cancel logic here
  this.dialogRef.close(true);  // Pass false to indicate cancellation
}

}
