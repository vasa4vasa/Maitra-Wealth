import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';



@Component({
  selector: 'app-popup',
  templateUrl:'./popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnInit {
  SNOptions: any;

  

  callform: FormGroup;
  isResultLoaded = false;
  
  commodity: any;
  type: any;
  callType: any;
  equity: any;
  contract: any;
  priceType: any;
  atPrice: any;
  target1: any;
  target2: any;
  stopLoss: any;
  target3: any;
  months: string[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  getCurrentTime(): string {
    const currentTime = new Date();
    return this.datePipe.transform(currentTime, 'hh:mm a') || '';
  }

  getDateCurrentTime(): string {
    const currentTime = new Date();
    return this.datePipe.transform(currentTime, 'dd-MM-yyyy hh:mm a') || '';
  }



  constructor(private fbuild : FormBuilder, private http: HttpClient, private dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private snackBar: MatSnackBar,private datePipe: DatePipe){
      this.callform = this.fbuild.group({
        datetime: [new Date(),Validators.required],
        callType: ['', Validators.required],
        type: ['', Validators.required],
        equity: ['', Validators.required],
        contract: ['', Validators.required],
        add_word: ['FUTURE',Validators.required],
        priceType: ['', Validators.required],
        atPrice: ['', Validators.required],
        target1: ['', Validators.required],
        target2: ['', Validators.required],
        target3: ['', Validators.required],
        stopLoss: ['', Validators.required],
        lastSMS: ['']
      })

      
    }


    ngOnInit(): void {
   

      this.callform.get('atPrice')?.valueChanges.subscribe((value) => {
        console.log('AT Price changed:', value);
        const incrementBy = 10;
        this.callform.patchValue({
          target1: value - incrementBy * 2,
          target2: value - incrementBy * 4,
          target3: value - incrementBy * 6,
          stopLoss: value + incrementBy * 2 
        });
        console.log('Form values:', this.callform.value);
      });
      this.getAllLevels();
      this.subscribeToFormChanges();
      
    }

    onInputBlur() {
      if (!this.callform.controls['Date'].value) {
        this.callform.controls['Date'].setValue('DATE');
      }
    }



    
    getAllTips() {
      this.http.get("http://localhost:8888/api/calls")
        .subscribe((resultData: any) => {
          this.isResultLoaded = true;
          console.log(resultData.data);
        });
    } 

    getAllLevels() {
      this.http.get<any>("http://localhost:8888/api/commoditie")
        .subscribe((resultData: any) => {
          this.isResultLoaded = true;
          console.log(resultData.data);
          this.SNOptions = resultData.data;
        });
    }


    subscribeToFormChanges() {
      this.callform.valueChanges.subscribe((value) => {
        const lastSmsValue = `
          ${this.getCurrentTime()} ${value.equity} ${value.contract} ${value.callType} SL HIT ${value.priceType} ${value.atPrice}`;
        
        this.callform.patchValue({ lastSMS: lastSmsValue });
      });
    }


    submitData(): void {
      console.log(this.callform.value)
  
      let bodyData = {
      "createdon" : this.callform.value.datetime,
      "calltype" : this.callform.value.callType,
      "type" : this.callform.value.type,
      "com" : this.callform.value.equity,
      "expirydate" : this.callform.value.contract,
      "pricetype" : this.callform.value.priceType,
      "atprice" :this.callform.value.atPrice,
      "target1" : this.callform.value.target1,
      "target2" : this.callform.value.target2,
      "target3" : this.callform.value.target3,
      "stoploss" : this.callform.value.stopLoss,
      "lastsms" : this.callform.value.lastSMS
     };
     this.http.post("http://localhost:8888/api/calls/add/",bodyData).subscribe((resultData :any) => {
      console.log(resultData);
      if (resultData.status) {
        alert("click conform");
        this.dialogRef.close();
      } else {
        alert("call creation failed: ");
      }
     },
     );
  };






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
  
}
