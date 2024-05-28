import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import { Observable, Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogModule } from '@angular/cdk/dialog';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { LevelsdialogComponent } from './levelsdialog/levelsdialog.component';
import { EditdialogComponent } from './editdialog/editdialog.component';
import { ToastComponent } from '../toast/toast.component';
import { ToasterComponent } from '../toaster/toaster.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { DialogServiceService } from '../dialog-service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrl: './levels.component.css'
})
export class LevelsComponent implements OnInit {

  LevelsArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  currentTime = Date();

  SNUpdate:any;
  MNUpdate:any;
  R1Update:any;
  R2Update:any;
  R3Update:any;
  S1Update:any;
  S2Update:any;
  S3Update:any;
  DVUpdate:any;
  GNUpdate:any;
  created_byUpdate:any;
  Levels_idUpdate:any;
  dtOptions : any= {} ;
  dtTrigger: Subject<any> = new Subject<any>;

  isDialogOpen: boolean = false; 

  @ViewChild(DataTableDirective, {static: false})
datatableElement: any = DataTableDirective;


  ID = '';
  TV = '';
  SN = '';
  MN = '';
  R1 = '';
  R2 = '';
  R3 = '';
  S1 = '';
  S2 = ''
  S3 = '';
  DV = '';
  GN = '';
  created_by = '';
  Levels_id = '';


  isEditClicked: { [key: number]: boolean } = {};
  idToShow : any;
  isTextboxVisible: boolean = false;


  constructor(private http: HttpClient,private dialog : MatDialog, private snackBar: MatSnackBar, private dialogService: DialogServiceService,
    private datePipe: DatePipe) {
    this.getAllLevels();
  }

  ngOnInit(): void {

    this.LevelsArray.forEach(item => {
      this.isEditClicked[item.ID] = false;
    });
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
        order: [[2, "asc"]],  
        scrollX: false,
      buttons: [
        'colvis','pdf','copy', 'csv', 'excel', 'print'
      ]
    };
  }

  
  


  transformDate(date: any): string {
    return this.datePipe.transform(date, 'dd-MM-yyyy hh:mm a') || '';
  }
  


  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    if (this.datatableElement) {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next(null);
      });
    }
  }

  getAllLevels() {
    this.http.get("http://localhost:8888/api/levels")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.LevelsArray = resultData.data;
        this.rerender();
      });
  }




  isFormValid(): boolean {
    return  !!this.SN && !!this.MN && !!this.R1 && !!this.R2 && !!this.R3 &&
      !!this.S1 && !!this.S2 && !!this.S3 && !!this.DV && !!this.GN && !!this.created_by && !!this.Levels_id;
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


  showTableData(ID: any): void {
    this.isEditClicked[ID] = !this.isEditClicked[ID];
    this.idToShow = ID;
  }

  shows(ID: any): void{
    this.isEditClicked[ID] = !this.isEditClicked[ID];
    this.idToShow = ID;


  }


  edit(data: any) {
    const dialogRef = this.dialog.open(EditdialogComponent, {
      data,
      width: '60%',
      height: 'auto',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllLevels();
        }
      },
    });
  }

  Editpopup(TipsItem: any) {
    if (!this.isDialogOpen) {
      // Set the flag to indicate that the dialog is now open
      this.isDialogOpen = true;
  
      // Disable body scroll
      document.body.style.overflow = 'hidden';
  
      // Open the dialog
    const _popup = this.dialog.open(EditdialogComponent, {
      data: TipsItem, // Use data instead of directly passing TipsItem
      width: '40%',
    });
    // Subscribe to the dialog's close event to re-enable body scroll
    _popup.afterClosed().subscribe(() => {
      document.body.style.overflow = 'auto';

      // Reset the flag when the dialog is closed
      this.isDialogOpen = false;
    });
  }
  }



    

  setDelete(data: any) {
    
    this.showNotification("Do you want to Delete these fields").subscribe(confirmed => {
      if (confirmed) {
    this.http.delete("http://localhost:8888/api/levels/delete/" + data.ID)
      .subscribe((_resultData: any) => {
        this.snackBar.open('Successfully Deleted', 'Dismiss', {
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

 addLevels(){
    this.Openpopup(LevelsdialogComponent);
  }


  Openpopup(component:any) {
    var _popup = this.dialog.open(component, {
      width: '60%',
      height: 'auto',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    }
    );

    
    // Add the blurred background class to the body when the dialog is open
    document.body.classList.add('blurred-background');

    // Subscribe to the dialog's close event to remove the blurred background class
    _popup.afterClosed().subscribe(() => {
      document.body.classList.remove('blurred-background');
    });
  }
}
