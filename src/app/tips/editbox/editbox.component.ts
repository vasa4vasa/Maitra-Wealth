import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editbox',
  templateUrl: './editbox.component.html',
  styleUrl: './editbox.component.css'
})
export class EditboxComponent implements OnInit{
  months: string[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  SNOptions: any;
  isResultLoaded = false;
  


  callform: FormGroup;

  getCurrentTime(): string {
    const currentTime = new Date();
    return this.datePipe.transform(currentTime, 'hh:mm a') || '';
  }

  constructor(private formBuilder : FormBuilder, private http: HttpClient, private dialogRef: MatDialogRef<EditboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private snackBar: MatSnackBar,private datePipe: DatePipe){ 
      this.callform = this.formBuilder.group({
        datetime: [this.data.created_on || null, Validators.required],
        callType: [this.data.call_type || '', Validators.required],
        type: [this.data.type || '', Validators.required],
        equity: [this.data.commodity || '', Validators.required],
        contract: [this.data.expiry_date || '', Validators.required],
        add_word: [this.data.add_word || 'FUTURE', Validators.required],
        priceType: [this.data.price_type || '', Validators.required],
        atPrice: [this.data.at_price || 0.00, Validators.required],
        target1: [this.data.target1 || 0.00, Validators.required],
        target2: [this.data.target2 || 0.00, Validators.required],
        target3: [this.data.target3 || 0.00, Validators.required],
        stopLoss: [this.data.stop_loss || 0.00, Validators.required],
        lastSMS: [this.data.last_sms || '']
      });
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
    this.subscribeToFormChanges();
    
  }
  getAllTips() {
    this.http.get("http://localhost:8888/api/calls")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData.data);
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
    // Log form values for debugging
    console.log(this.callform.value);
  
    // Prepare the request body data
    let body = {
      "id" :this.data.id,
      "createdon": this.callform.value.datetime,
      "calltype": this.callform.value.callType,
      "type": this.callform.value.type,
      "com": this.callform.value.equity,
      "expirydate": this.callform.value.contract,
      "pricetype": this.callform.value.priceType,
      "atprice": this.callform.value.atPrice,
      "target1": this.callform.value.target1,
      "target2": this.callform.value.target2,
      "target3": this.callform.value.target3,
      "stoploss": this.callform.value.stopLoss,
      "lastsms": this.callform.value.lastSMS
    };
  
    // Send HTTP POST request to update the data
    this.http.put("http://localhost:8888/api/calls/update/" + this.data.id, body).subscribe((resultData: any) => {
      // Log the result data
      console.log(resultData);
      console.log(this.data.id);
      this.dialogRef.close(true);
    });
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

  cancel(): void {
    // Reset the form or any other cancel logic here
    this.callform.reset();
  
    this.snackBar.open('fields are reseted', 'Dismiss', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'],
    });
  }

}
