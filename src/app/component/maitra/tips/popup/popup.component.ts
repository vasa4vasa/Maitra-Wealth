import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  MatDialogRef,MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';
import { ToastComponent } from '../../toast/toast.component';
import { ToasterComponent } from '../../toaster/toaster.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-popup',
  templateUrl:'./popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnInit{
  SNOptions: { id: number, name: string }[] = [];
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
  periods: string[] = ['1','2','3','4','5'];

  getCurrentTime(): string {
    const currentTime = new Date();
    return this.datePipe.transform(currentTime, 'hh:mm a') || '';
  }

  getDateCurrentTime(): string {
    const currentTime = new Date();
    return this.datePipe.transform(currentTime, 'dd-MM-yyyy hh:mm a') || '';
  }
  currentDate: Date= new Date();
  curDate : any = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd hh:mm:ss');


  constructor(private fbuild : FormBuilder, private http: HttpClient, private dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private snackBar: MatSnackBar,private datePipe: DatePipe,private dialog : MatDialog){
      this.callform = this.fbuild.group({
        datetime: [this.curDate,Validators.required],
        callType: ['FUTURE', Validators.required],
        indicator : ['',Validators.required],
        quantity : ['',Validators.required],
        margin : [''],
        holdPeriod : ['',Validators.required],
        strike : [''],
        expiry : [''],
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
        lastSMS: ['',Validators.required]
      })

      
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

        if (Type === 'buy') {
          console.log('Calculating sell values');
          target1 = atPrice + commodityData.R1;
          target2 = target1 + commodityData.R2;
          target3 = target2 + commodityData.R3;
          stopLoss = atPrice - commodityData.SL;
        } else {
          console.log('Calculating buy values');
          target1 = atPrice - commodityData.R1;
          target2 = target1 - commodityData.R2;
          target3 = target2 - commodityData.R3;
          stopLoss = atPrice + commodityData.SL;
        }
           // Parse the target values to numbers
           target1 = parseFloat(target1.toFixed(2));
           target2 = parseFloat(target2.toFixed(2));
           target3 = parseFloat(target3.toFixed(2));
           stopLoss = parseFloat(stopLoss.toFixed(2));


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

onInputBlur() {
      if (!this.callform.controls['Date'].value) {
        this.callform.controls['Date'].setValue('Date');
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
      this.showNotification("Do you want to add these fields").subscribe(confirmed => {
        if (confirmed) {
      console.log(this.callform.value)
      
  
      let bodyData = {
      "createdon" : this.callform.value.datetime,
      "calltype" : this.callform.value.callType,
      "type" : this.callform.value.type,
      "com" : this.callform.value.equity,
      "add_word" : this.callform.value.add_word,
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
        this.showNoti("Successfully created", 3000);  
        this.dialogRef.close();
      } else {
        this.showNoti("call creation failed", 3000); 
      }
     },
     );
     window.location.reload();
  };})}






    cancel(): void {
      // Reset the form or any other cancel logic here
      this.callform.reset();
      this.showNoti("fields are reseted", 3000); 
      // Pass false to indicate cancellation
    }


    close(): void {
      // Reset the form or any other cancel logic here
      this.dialogRef.close(true); 
      this.callform.reset();
      this.showNoti("Create Panel Closed", 3000);
      window.location.reload();
    }
  
}
