import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DataTableDirective} from 'angular-datatables';
import { Observable, Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogModule } from '@angular/cdk/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogcompComponent } from './dialogcomp/dialogcomp.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { UsersServiceService } from './users.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { ToastComponent } from '../toast/toast.component';
import { ToasterComponent } from '../toaster/toaster.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})


export class UsersComponent implements AfterViewInit, OnDestroy, OnInit{

  UsersArray : any[] = [];
  totalusers : any[] =[];
  tosubscribers : any[] =[];
  totasubscribers : any;
  toexpirers : any;
  totalexpirers : any;

  totalUsersCount: number = 0;
  toSubscribersCount: number = 0;
  totalSubscribersCount: number = 0;
  todayExpiredUsersCount: number = 0;
  totalExpiredUsersCount: number = 0;

  currentDate: Date = new Date();

  isResultLoaded = false;
  isDialogOpen: boolean = false; 

  UserNameUpdate: any;
  UserEmailUpdate: any;
  UserMobileNoUpdate: any;
  AppInstalledUpdate : any;
  AppExpiredUpdate : any;

  dialogRef: MatDialogRef<ToastComponent> | null | undefined;

  currentUserID : any ;
  currentUserName : any ;
  currentMobileNo : any ;
  currentEmail : any ;
  currentAppInstalled:any;
  currentAppExpired:any;

  idToShow : any;
  isTextboxVisible: boolean = false;

  dtOptions : any= {} ;
  dtTrigger: Subject<any> = new Subject<any>();

  userform : FormGroup;

  isEditClicked: { [key: number]: boolean } = {};


  isRowInEditMode: { [key: number]: boolean } = {};


  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective | undefined;
  constructor(private http: HttpClient, 
    private dialog : MatDialog,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private user : UsersServiceService,
    private fbuild : FormBuilder
    ) 
  {
   

    this.userform = this.fbuild.group({
      UserNameUpdate : [""],
      UserMobileNoUpdate : ['',Validators.pattern(/^\d{10}$/)],
      UserEmailUpdate : ['',Validators.email],
      AppInstalledUpdate : [''],
      AppExpiredUpdate : [''],
    });


    this.getallusers();
    
  }

  getUserCount(): number {
    return this.totalusers.length;
  }

  gettosubscribers():any{
    return this.tosubscribers.length;
  }


  ngOnInit(): void {
   
    this.dtTrigger.next(null);// Trigger DataTable initialization
    this.dtOptions={

      lengthChange:true,
      "lengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
      // dom: 'Bfrltip',
      pagingType:"full_numbers",
      processing: true, 
      autoWidth: false,
      scrollCollapse: true,
      dom: '<lf<Btr>ip>',
        order: [[0, "asc"]],  
        scrollX: false,
      buttons: [
        'colvis','pdf','copy', 'csv', 'excel', 'print'
      ]
    };
    this.fetchUsersCount();
    this.getallusers();
    
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  fetchUpdatedData() {
    this.user.getAllusers().subscribe((resultData :any)=>{
      console.log("Get all Users",resultData);
      this.isResultLoaded = true;
        this.totalusers = resultData.data;
        this.UsersArray = resultData.data;
        
    // Reload the page
    window.location.reload();

    })
  }


  fetchUsersCount() {
    this.http.get<any>('http://localhost:8888/api/alluserscount/').subscribe(
      response => {
        if (response.status) {
          this.totalUsersCount = response.data[0]['count(*)'];
        } else {
          console.error('Error fetching users count');
        }
      },
      error => {
        console.error('Error connecting to the server', error);
      }
    );

    this.http.get<any>('http://localhost:8888/api/todaysubscribeduserscount/').subscribe(
      response => {
        if (response.status) {
          this.toSubscribersCount = response.data[0]['count(*)'];
        } else {
          console.error('Error fetching users count');
        }
      },
      error => {
        console.error('Error connecting to the server', error);
      }
    );

    this.http.get<any>('http://localhost:8888/api/totalsubscriberscount/').subscribe(
      response => {
        if (response.status) {
          this.totalSubscribersCount = response.data[0]['count(*)'];
        } else {
          console.error('Error fetching users count');
        }
      },
      error => {
        console.error('Error connecting to the server', error);
      }
    );
    

    this.http.get<any>('http://localhost:8888/api/totalexpireduserscount/').subscribe(
      response => {
        if (response.status) {
          this.totalExpiredUsersCount = response.data[0]['count(*)'];
        } else {
          console.error('Error fetching users count');
        }
      },
      error => {
        console.error('Error connecting to the server', error);
      }
    );
  }
  





  onDropdownChange(event: any) {
    const selectedOption = event.target.value;

    switch (selectedOption) {
      case 'todaySubscribers':
        this.todaysubscribers();
        break;
      case 'totalSubscribers':
        this.totalsubscribers();
        break;
      case 'todayExpiredUsers':
        this.todayexpiredusers();
        break;
      case 'totalExpiredUsers':
        this.totalexpiredusers();
        break;
      default:
        this.getallusers();
        break;
    }
  }


  
  getallusers()
  { 
    this.user.getAllusers().subscribe((resultData :any)=>{
      console.log("Get all Users",resultData);
      this.isResultLoaded = true;
        this.totalusers = resultData.data;
        this.UsersArray = resultData.data;
// this.dtTrigger.next(this.UsersArray);
this.rerender();
    })
  }

  rerender(): void {
    if (this.datatableElement) {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next(null);
      });
    }
  }
  
  todaysubscribers() {
    this.http.get("http://localhost:8888/api/todaysubscribedusers")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        this.tosubscribers = resultData.data;
        this.UsersArray = resultData.data;
        this.rerender();
      });
  }
  

  totalsubscribers()
  { 
    this.http.get("http://localhost:8888/api/totalsubscribers/")
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        this.totasubscribers = resultData.data;
        this.UsersArray = resultData.data;
        this.rerender();
    });
  }


  todayexpiredusers()
  { 
    this.http.get("http://localhost:8888/api/todayexpiredusers/")
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        this.toexpirers = resultData.data;
        this.UsersArray = resultData.data;
        this.rerender();
    });
  }
  
  totalexpiredusers()
  { 
    this.http.get("http://localhost:8888/api/totalexpiredusers/")
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        this.totalexpirers = resultData.data;
        this.UsersArray = resultData.data;
        this.rerender();
    });
  }



  showTableData(ID: any): void {
    // Close the currently open edit field if any
    if (this.idToShow !== undefined && this.idToShow !== ID) {
      this.isEditClicked[this.idToShow] = false;
    } 
  
    // Toggle the edit field for the current ID
    this.isEditClicked[ID] = !this.isEditClicked[ID];
    this.idToShow = ID;
  }


  shows(ID: any): void{
    this.isEditClicked[ID] = !this.isEditClicked[ID];
    this.idToShow = ID;


  }
  
  showNotification(message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ToastComponent, {
      data: { message },
      width: '20%',
      height: '20%',
      disableClose: true
    });
    return dialogRef.afterClosed();
  }

  showNoti(message: string, delayMs: number): void {
    const dialogRef = this.dialog.open(ToasterComponent, {
      data: { message },
      width: '20%',
      height: '20%',
      disableClose: true // Allow closing dialog by clicking on the background
    });
  
    // Close the dialog after the specified delay
    setTimeout(() => {
      dialogRef.close();
    }, delayMs);
  
  }

  UpdateRecords(useritem : any)
  {
    this.showNotification("Do you want to update these fields").subscribe(confirmed => {
      if (confirmed) {
  this.currentUserID = useritem.ID;
  this.currentUserName = useritem.UserName;
  this.currentEmail = useritem.UserEmail;
  this.currentMobileNo = useritem.UserMobileNo;
  this.currentAppInstalled = useritem.AppInstalledDate;
  this.currentAppExpired = useritem.AppExipiredDate;


   // Check if the update values are null or undefined
   this.UserNameUpdate = this.UserNameUpdate === null || this.UserNameUpdate === undefined ? this.currentUserName : this.UserNameUpdate;
   this.UserEmailUpdate = this.UserEmailUpdate === null || this.UserEmailUpdate === undefined ? this.currentEmail : this.UserEmailUpdate;
   this.UserMobileNoUpdate = this.UserMobileNoUpdate === null || this.UserMobileNoUpdate === undefined ? this.currentMobileNo : this.UserMobileNoUpdate;
   this.AppInstalledUpdate = this.AppInstalledUpdate === null || this.AppInstalledUpdate === undefined ? this.currentAppInstalled : this.AppInstalledUpdate;
   this.AppExpiredUpdate = this.AppExpiredUpdate === null || this.AppExpiredUpdate === undefined ? this.currentAppExpired : this.AppExpiredUpdate;
  
   if (this.userform.valid) {
   let bodyData = 
    {
      "UserName" : this.UserNameUpdate,
      "UserEmail" : this.UserEmailUpdate,
      "UserMobileNo" : this.UserMobileNoUpdate,
      "LastUpdatedDate":this.datePipe.transform(this.currentDate, 'yyyy-MM-dd'),
      "AppInstalledDate":this.datePipe.transform(this.AppInstalledUpdate, 'yyyy-MM-dd'),
      "AppExipiredDate":this.datePipe.transform(this.AppExpiredUpdate, 'yyyy-MM-dd')  
    };
    this.http.put("http://localhost:8888/api/user/update"+ "/"+ this.currentUserID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        this.showNoti("Successfully Updated", 3000);
        setTimeout(() => {
          window.location.reload();
        }, 3000); // Reload the window after successful update
    });
  } 
  } 
  }
    )}
  


 
  setDelete(useritem: any)
  {
    this.showNotification("Do you want to Delete these fields").subscribe(confirmed => {
      if (confirmed) {
    this.http.delete("http://localhost:8888/api/user/delete/"+ useritem.ID).subscribe((resultData: any)=>
    {
        console.log(resultData);
        this.showNoti("Successfully Deleted", 3000);
        setTimeout(() => {
          window.location.reload();
        }, 3000); // Reload the window after successful update
    });
  }
    })}
  addusers() {
    if (!this.isDialogOpen) {
      // Set the flag to indicate that the dialog is now open
      this.isDialogOpen = true;
  
      // Disable body scroll
      document.body.style.overflow = 'hidden';
  
      // Open the dialog
      const _popup = this.dialog.open(DialogcompComponent, {
        width: '60%',
        height : '35%',
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '1000ms',
      });
  
      // Subscribe to the dialog's close event to re-enable body scroll
      _popup.afterClosed().subscribe(() => {
        document.body.style.overflow = 'auto';
  
        // Reset the flag when the dialog is closed
        this.isDialogOpen = false;
      });
    }
  }
  

}