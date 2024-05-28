import { Component, Inject, ViewChild,AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-levelsdialog',
  templateUrl: './levelsdialog.component.html',
  styleUrl: './levelsdialog.component.css'
})
export class LevelsdialogComponent implements AfterViewInit,OnInit{

  
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

  constructor(private fbuild : FormBuilder, private http: HttpClient, private dialogRef: MatDialogRef<LevelsdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private datePipe: DatePipe){
    this.empform = this.fbuild.group({
      SN : ["",Validators.required],
      MN : ['', Validators.required],
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
                  
                  // Update form control values
                  this.empform.patchValue({
                      R1: this.R1a,
                      R2: this.R2a,
                      R3: this.R3a,
                      S1: this.S1a,
                      S2: this.S2a,
                      S3: this.S3a
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
  onSelectChange(selectedValue: any) {
    this.http.get<any[]>(`http://localhost:8888/api/commod/${selectedValue}`)
      .subscribe(
        (resultData: any) => {
          if (resultData.status && resultData.data && resultData.data.length > 0) {
            this.getdata = resultData.data[0]; // Access the first element of the data array
            console.log(this.getdata.R1); // Access R1 property
          } else {
            console.error('No data found or invalid response');
          }
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
}





  submitData():any{
    let bodyData = {
        "TV": this.currentDate.toLocaleTimeString(),
        "SN": this.empform.value.SN,
      "MN": this.empform.value.MN,
      "R1": this.R1a,
      "R2": this.R2a,
      "R3": this.R3a,
      "S1": this.S1a,
      "S2": this.S2a,
      "S3": this.S3a,
        "created_on" : this.datePipe.transform(this.currentDate, 'yyyy-MM-dd'),
        "created_by" : "1",
    };
  
    this.http.post("http://localhost:8888/api/levels/add/", bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      if (resultData.status) {
        alert("levels created successfully. Click to Confirm");
        this.dialogRef.close();
      } else {
        alert("levels creation failed: " + resultData.message+this.currentDate);
      }
    },
  );
};



cancel(): void {
  // Reset the form or any other cancel logic here
  this.empform.reset();  // Pass false to indicate cancellation
}
close(): void {
  // Reset the form or any other cancel logic here
  this.dialogRef.close(true);  // Pass false to indicate cancellation
}

}
