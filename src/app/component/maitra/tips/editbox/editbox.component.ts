import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../../toast/toast.component';
import { ToasterComponent } from '../../toaster/toaster.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editbox',
  templateUrl: './editbox.component.html',
  styleUrl: './editbox.component.css'
})
export class EditboxComponent implements OnInit{
  months: string[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  SNOptions: any[] = [];
  isResultLoaded = false;
  period: string[] = ['1','2','3','4','5'];
  


  callform: FormGroup;
  originalData: any;

  getCurrentTime(): string {
    const currentTime = new Date();
    return this.datePipe.transform(currentTime, 'hh:mm a') || '';
  }

  constructor(private formBuilder : FormBuilder, private http: HttpClient, private dialogRef: MatDialogRef<EditboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private snackBar: MatSnackBar,private datePipe: DatePipe,private dialog : MatDialog,){ 
      this.originalData = {...data}
      console.log(this.originalData);

      this.callform = this.formBuilder.group({
        datetime: [this.originalData.created_on || null, Validators.required],
        callType: [this.originalData.call_type || '', Validators.required],
        type: [this.originalData.type || '', Validators.required],
        equity: [this.originalData.commodity || '', Validators.required], // Use getItemName method
        contract: [this.originalData.expiry_date || '', Validators.required],
        add_word: [this.originalData.add_word || 'FUTURE', Validators.required],
        priceType: [this.originalData.price_type || '', Validators.required],
        atPrice: [this.originalData.at_price || 0.00, Validators.required],
        target1: [this.originalData.target1 || 0.00, Validators.required],
        target2: [this.originalData.target2 || 0.00, Validators.required],
        target3: [this.originalData.target3 || 0.00, Validators.required],
        stopLoss: [this.originalData.stop_loss || 0.00, Validators.required],
        quantity: [this.originalData.quantity || '', Validators.required],
        margin: [''],
        indicator: [this.originalData.indicator || '', Validators.required],
        holdPeriod: [this.originalData.holding_period || '', Validators.required],
        strike: [this.originalData.strike_price || '', Validators.required],
        expiry: [this.originalData.expiry_date || '', Validators.required],
        lastSMS: [this.originalData.last_sms || '']
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

  showNoti(message: string, delayMs: number): void {
    const dialogRef = this.dialog.open(ToasterComponent, {
      data: { message },
      width: 'auto',
      height: 'auto',
      disableClose: true // Allow closing dialog by clicking on the background
    });
  
    // Close the dialog after the specified delay
    setTimeout(() => {
      dialogRef.close();
    }, delayMs);
  
  }

    
  updateValue(atPrice: number, Type: string): void {
    console.log('Type:', Type);
    const commodityId = this.callform.get('equity')?.value;
    if (!commodityId) {
      console.log('Commodity ID is not selected.');
      return;
    }
  
    const apiUrl = `http://localhost:8888/api/comvalue/${commodityId}`;
    this.http.get(apiUrl)
      .subscribe(
        (response: any) => {
          const commodityData = response.data.find((commodity: any) => commodity.id === commodityId);
          if (!commodityData) {
            console.log(`Commodity data not found for ID: ${commodityId}`);
            return;
          }
  
          console.log('Commodity data:', commodityData);
  
          let target1: number;
          let target2: number;
          let target3: number;
          let stopLoss: number;
  
          if (Type === 'sell') {
            console.log('Calculating sell values');
            target1 = atPrice - commodityData.R1;
            target2 = target1 - commodityData.R2;
            target3 = target2 - commodityData.R3;
            stopLoss = atPrice + commodityData.SL;
          } else {
            console.log('Calculating buy values');
            target1 = atPrice + commodityData.R1;
            target2 = target1 + commodityData.R2;
            target3 = target2 + commodityData.R3;
            stopLoss = atPrice - commodityData.SL;
          }
  
          console.log('Target 1:', target1);
          console.log('Target 2:', target2);
          console.log('Target 3:', target3);
          console.log('Stop Loss:', stopLoss);
  
          this.callform.patchValue({
            target1: target1,
            target2: target2,
            target3: target3,
            stopLoss: stopLoss
          });
        },
        (error) => {
          console.error('Error fetching commodity data:', error);
        }
      );
  }
  ngOnInit(): void {
    // Subscribe to changes in 'atPrice' field
    this.callform.get('atPrice')?.valueChanges.subscribe((value) => {
      console.log('AT Price changed:', value);
      const type = this.callform.get('type')?.value;
      this.updateValue(value, type);
    });
  
    // Subscribe to changes in 'equity' field
    this.callform.get('equity')?.valueChanges.subscribe((value) => {
      console.log('Commodity ID changed:', value);
      const atPrice = this.callform.get('atPrice')?.value;
      const type = this.callform.get('type')?.value;
      this.updateValue(atPrice, type);
    });
  
    // Subscribe to changes in 'type' field
    this.callform.get('type')?.valueChanges.subscribe((value) => {
      console.log('Type changed:', value);
      const atPrice = this.callform.get('atPrice')?.value;
      this.updateValue(atPrice, value);
    });
  
    this.getAllLevels();
    this.subscribeToFormChanges();
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



getItemName(id: number): string {
  const selectedItem = this.SNOptions.find(item => item.id === id);
  const itemName = selectedItem ? selectedItem.name : 'Unknown';
  return itemName;
}



subscribeToFormChanges() {
  this.callform.valueChanges.subscribe((value) => {
      const commodityName = this.getItemName(value.equity); // Get commodity name
      if (commodityName) { // Check if commodityName is not undefined
          const lastSmsValue = `
              ${this.getCurrentTime()} ${value.type} ${commodityName} ${value.contract} ${value.callType} ${value.priceType} ${value.atPrice} TGT  ${value.target1}/${value.target2}/${value.target3}  SL ${value.stopLoss}`;
          this.callform.patchValue({ lastSMS: lastSmsValue });
      } else {
          console.log('Commodity not found.');
      }
  });
}


  submitData(): void {
    this.showNotification("Do you want to update these fields").subscribe(confirmed => {
      if (confirmed) {
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
      this.showNoti("Updated Successfully",3000);
      console.log(this.callform.value.id);
      this.dialogRef.close(true);

    });
  }})}





  close(): void {
    // Reset the form or any other cancel logic here
    this.callform.patchValue(this.originalData);
    this.dialogRef.close(true); 
    this.showNoti("Create Panel Closed",3000);
    window.location.reload();
  }

  cancel(): void {
    // Reset the form or any other cancel logic here
    this.callform.reset();
    this.showNoti("fields are reseted",3000);
  }

}

