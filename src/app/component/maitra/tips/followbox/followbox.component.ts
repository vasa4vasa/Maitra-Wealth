import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Type } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../../toast/toast.component';
import { ToasterComponent } from '../../toaster/toaster.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-followbox',
  templateUrl: './followbox.component.html',
  styleUrl: './followbox.component.css'
})
export class FollowboxComponent implements OnInit {
  callform : FormGroup;
  SNOptions: any[] = [];

  currentDate: Date= new Date();
  curDate : any = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd hh:mm:ss');
  isResultLoaded = false;
  originalData: any;
  changesSubmitted = false;
 

  getCurrentTime(): string {
    const currentTime = new Date();
    return this.datePipe.transform(currentTime, 'hh:mm a') || '';
  }

  constructor(private fbuild : FormBuilder, private http: HttpClient, private dialogRef: MatDialogRef<FollowboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private snackBar: MatSnackBar,private datePipe: DatePipe,private dialog : MatDialog,){
      this.originalData = {...data };
    this.callform = this.fbuild.group({
      datetime: [this.originalData.created_on || null, Validators.required],
      update: [this.curDate,Validators.required],
      callType: [this.originalData.call_type || '', Validators.required],
      type: [this.originalData.type || '', Validators.required],
      equity: [this.originalData.commodity || '', Validators.required],
      contract: [this.originalData.expiry_date || '', Validators.required],
      add_word: [this.originalData.add_word || 'FUTURE', Validators.required],
      priceType: [this.originalData.price_type || '', Validators.required],
      atPrice: [this.originalData.at_price || 0.00, Validators.required],
      target1: [this.originalData.target1 || 0.00, Validators.required],
      target2: [this.originalData.target2 || 0.00, Validators.required],
      target3: [this.originalData.target3 || 0.00, Validators.required],
      stopLoss: [this.originalData.stop_loss || 0.00, Validators.required],
      follow:[this.originalData.follow_up || '',Validators.required],
      returns: [this.originalData.profit_loss || 0.00, Validators.required],
      selection: ['', Validators.required],
      t1: [false],
      t2: [false],
      t3: [false],
      exit:[''],
      lastSMS: [this.originalData.last_sms || '']
    });
  }

  ngOnInit(): void {
    
    this.getAllLevels();
    this.subscribeToFormChanges();
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
      //  console.log(value);
      let lastSmsValue = `${this.getCurrentTime()}`;
      let equityName = this.getItemName(value.equity);
      let Type = value.type;
      let Returns = 0;
      let commodityId = this.callform.get('equity')?.value;
      let target1 = this.callform.get('target1')?.value;
      let target2 = this.callform.get('target2')?.value;
      let target3 = this.callform.get('target3')?.value;
      let atPrice = this.callform.get('atPrice')?.value;
      let stopLoss = this.callform.get('stopLoss')?.value;
    //  console.log(stopLoss);
  
      if (!commodityId) {
        console.log('Commodity ID is not selected.');
        return;
      }
  
      const apiUrl = `http://localhost:8888/api/comvalue/${commodityId}`;
      this.http.get(apiUrl).subscribe(
        (response: any) => {
          const commodityData = response.data.find((commodity: any) => commodity.id === commodityId);
          if (!commodityData) {
            console.log(`Commodity data not found for ID: ${commodityId}`);
            return;
          }
  
          if(Type === 'buy') {
            
            if (value.selection === 'exit') {
              lastSmsValue += ` EXIT ${equityName} ${value.contract} ${value.callType} ${value.priceType} ${value.atPrice}`;
            } else if (value.selection === 'stop_loss') {
              lastSmsValue += ` ${equityName} ${value.contract} ${value.callType} ${value.priceType} SL HIT AT ${value.stopLoss}`;
              Returns = (stopLoss - atPrice) * (commodityData.R1/ stopLoss);
              console.log(Returns)
            } else {
              lastSmsValue += ` ${equityName} ${value.contract} ${value.callType} ${value.stopLoss}`;
            }
            
            let selectedTargets = [];
  
            if (value.t1) {
              selectedTargets.push('TGT1');
            }
  
            if (value.t2) {
              selectedTargets.push('TGT2');
            }
  
            if (value.t3) {
              selectedTargets.push('TGT3');
            }
  
            if (selectedTargets.length > 0) {
              if (selectedTargets.length === 1) {
                lastSmsValue += ` ${selectedTargets[0]} ACHIEVED. BOOK PROFIT `;
                Returns = (target1 - atPrice) * commodityData.R1;
                console.log(commodityData.R1);
              } else if (selectedTargets.length === 2) {
                lastSmsValue += ` ${selectedTargets.join(' AND ')} ACHIEVED. BOOK PROFIT`;
                Returns = (target2 - atPrice) * commodityData.R2;
              } else if (selectedTargets.length > 2) {
                lastSmsValue += ` ${selectedTargets.join(', ')} ACHIEVED. BOOK PROFIT`;
                Returns = (target3 - atPrice) * commodityData.R3;
              }
            }
          } else if(Type === 'sell') {
            if (value.selection === 'exit') {
              lastSmsValue += ` EXIT ${equityName} ${value.contract} ${value.callType} ${value.priceType} ${value.atPrice}`;
              Returns = target1;
            } else if (value.selection === 'stop_loss') {
              lastSmsValue += ` ${equityName} ${value.contract} ${value.callType} ${value.priceType} SL HIT AT ${value.stopLoss}`;
              Returns = (atPrice - stopLoss)*commodityData.T1/stopLoss;
            } else {
              lastSmsValue += ` ${equityName} ${value.contract} ${value.callType} ${value.stopLoss}`;
            }
            
            let selectedTargets = [];
  
            if (value.t1) {
              selectedTargets.push('TGT1');
            }
  
            if (value.t2) {
              selectedTargets.push('TGT2');
            }
  
            if (value.t3) {
              selectedTargets.push('TGT3');
            }
  
            if (selectedTargets.length > 0) {
              if (selectedTargets.length === 1) {
                lastSmsValue += ` ${selectedTargets[0]} ACHIEVED. BOOK PROFIT `;
                Returns = (atPrice - target1) * commodityData.T1;
              } else if (selectedTargets.length === 2) {
                lastSmsValue += ` ${selectedTargets.join(' AND ')} ACHIEVED. BOOK PROFIT`;
                Returns = (atPrice - target2) * commodityData.T2;
              } else if (selectedTargets.length > 2) {
                lastSmsValue += ` ${selectedTargets.join(', ')} ACHIEVED. BOOK PROFIT`;
                Returns = (atPrice - target3) * commodityData.T3;
              }
            }
            
            
          }
          // console.log(Returns)
          // Update lastSMS field
          Returns = parseFloat(Returns.toFixed(2));
          this.callform.patchValue({ lastSMS: lastSmsValue, returns: Returns });
        },
        (error) => {
          console.error('Error fetching commodity data:', error);
        }
      );
    });
  }
  
  
  

  submitData(): void {
    this.showNotification("Do you want to change these fields").subscribe(confirmed => {
      if (confirmed) {
    let body = {
      "id": this.data.id,
      "createdon": this.callform.value.datetime,
      "updatedon": this.callform.value.update,
      "lastsms": this.callform.value.lastSMS,
      "follow": this.callform.value.selection,
      "target1_achieved": this.callform.value.t1 ? "yes" : "",
      "target2_achieved": this.callform.value.t2 ? "yes" : "",
      "target3_achieved": this.callform.value.t3 ? "yes" : "",
      "returns": this.callform.value.returns
    };

    // Send HTTP PUT request to update the data
    this.http.put("http://localhost:8888/api/calls/follows/" + this.data.id, body).subscribe(
      (resultData: any) => {
        console.log(resultData);
        this.showNoti("Successfull!",3000);
      },
      (error) => {
        console.error('Error updating resource:', error);
      }
    );
    window.location.reload();
  
  }})}


  close(): void {
    this.callform.reset();
    this.dialogRef.close(true); 
  }


  cancel(): void {
    if (!this.changesSubmitted) {
      // Only reset if changes are not submitted
      this.callform.reset(this.originalData);
    } else {
      // Close the dialog without resetting the form
      this.dialogRef.close(false);
    }

    // Display a snack bar message
    this.showNoti("Fields are reset",3000);
  }
} 