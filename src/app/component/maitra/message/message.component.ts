
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Observable,Subject } from 'rxjs';
import { FormsModule, NgModel } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {ElementRef, ViewChild}from '@angular/core';
import { Injectable } from '@angular/core';
import { ToastComponent } from '../toast/toast.component';
import { ToasterComponent } from '../toaster/toaster.component';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit {

  OneSignal : any;

  selectedOption: string = ''; 


  
  selectedMessageId: number | null = null;
  messageArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  content: any; 
  dtOption : any={};
  // dtTrigger : Subject<any> = new Subject<any>(); 
  idToShow:any;
  messageUpdate:any;
  dtOptions:any={};
  dtTrigger: Subject<any>=new Subject<any>();
  currentmessage:any;
  currentmessageID:any;
  isTextboxVisible:boolean =false;
  isEditClicked: { [key: number]: boolean } = {};
  isRowInEditMode: { [key: number]: boolean } = {};
  currentDate: Date=new Date();
  messageform:FormGroup;
  selectedNotificationType: string = 'notification';
  selectedNotificationStyle: string = '';
  smsChecked: boolean = false;
  notificationChecked: boolean = false;
 

 

@ViewChild(DataTableDirective,{static:false})
datatableElement: any= DataTableDirective; 
  constructor(
    private dialog : MatDialog,
    private http: HttpClient,
    private datePipe:DatePipe,
    private snackBar: MatSnackBar,
    private fbuild : FormBuilder
   
  ) {
    this.messageform=this.fbuild.group({
      messageUpdate:[" "],

    });
    this.smsChecked = false;
    this.notificationChecked = false;

this.getmessage();

  }

  transformDate(date: any): string {
    return this.datePipe.transform(date, 'dd-MM-yyyy hh:mm a') || '';
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

  


    ngOnInit(): void{
      console.log('Initial selectedNotificationType:', this.selectedNotificationType);
      this.dtTrigger.next(null);
      this.dtOption = {
   
      // dom:'Bfrltip',
      lengthChange:true,
      "lengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
      pagingType: 'full_numbers',
      // processing:true,
      searching:true ,
      scrollCollapse:true,
      autoWidth:false,
      order:[[0,"dsc"]],
      ordering: true,
      scrollX:false,
      dom:'<lf<Btr>ip>',
      buttons:[
        'colvis','pdf', 'copy', 'csv', 'excel', 'print'
      ]
    
    };
    }

 ngAfterViewInit(): void{
  this.dtTrigger.next(null);
 }
  

  getmessage() {
    this.http.get("http://localhost:8888/api/message/")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.messageArray = resultData.data.map((message:any) => {
          message.date = this.datePipe.transform(message.date, 'yyyy-MM-dd hh:mm a','en-US');
          return message;
         
        });
       
        this.rerender();
       });
     
      }

      rerender():void{
        if (this.datatableElement){
          this.datatableElement.dtInstance.then((dtInstance:DataTables.Api)=>{
          dtInstance.destroy();
          this.dtTrigger.next(null);
          
        });
        }
      }
      
      onSubmit(): void {
        const formattedDateTime = this.datePipe.transform(this.currentDate,'yyyy-MM-dd HH:mm:ss','en-US');
        let bodyData = {
          notificationType: this.smsChecked && this.notificationChecked ? 'both' : this.smsChecked ? 'sms' : this.notificationChecked ? 'notification' : '',
          notificationStyle: this.selectedNotificationStyle,
          "date": formattedDateTime,
          "content": this.content
        };
      
        this.http.post("http://localhost:8888/api/message/add/", bodyData).subscribe((resultData: any) => {
          console.log(resultData);
          this.snackBar.open('Sent Successfully', 'Dismiss', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['custom-snackbar']
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000); 
        });
      }
      setDelete(data: any) {
        this.showNotification("Do you want to delete this message?").subscribe(confirmed => {
          if (confirmed) {
            this.http.delete("http://localhost:8888/api/message/delete/" + data.content).subscribe((resultData: any) => {
              console.log(resultData);
              if (resultData.status) {
                this.snackBar.open('Deleted Successfully', 'Dismiss', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom',
                  panelClass: ['custom-snackbar']
                });
                //  setTimeout(() => {
                //   window.location.reload();
                //  }, 3000); 
                // Optionally, you can refresh the message list here
              } else {
                this.snackBar.open('Failed to delete message', 'Dismiss', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom',
                  panelClass: ['custom-snackbar']
                });
              }
            });
          }
        });
      }
      

  showTableData(id: any):void{
    if(this.idToShow!== undefined && this.idToShow !== id){ 
    this.isEditClicked[this.idToShow]= false;
   }
   this.isEditClicked[id]=!this.isEditClicked[id];
   this.idToShow=id;
  }
  shows(id: any): void{
    this.isEditClicked[id] = !this.isEditClicked[id];
    this.idToShow = id;


  }

  UpdateRecords(messageitem : any)
  {
    this.showNotification("Do you want to update these fields").subscribe(confirmed => {
      if (confirmed) {
    this.currentmessageID =messageitem.id;
  this.currentmessage = messageitem.content;

  this.messageUpdate = this.messageUpdate === null || this.messageUpdate === undefined ? this.currentmessage: this.messageUpdate;
  if (this.messageform.valid){

  
  let bodyData = 
  {
    "content" : this.messageUpdate
   
  };
  this.http.put("http://localhost:8888/api/message/update"+ "/"+ this.currentmessageID,bodyData).subscribe((resultData: any)=>
  {
      this.snackBar.open('Updated Successfully', 'Dismiss', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['custom-snackbar']
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000); 
  });

  
} else{
  this.snackBar.open('Please enter the valid details', 'Dismiss', {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
    panelClass: ['custom-snackbar']
  });
  setTimeout(() => {
    window.location.reload();
  }, 3000); 
}
  
} 
    })}
}
  
   