import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { PopupComponent } from './popup/popup.component';
import { EditboxComponent } from './editbox/editbox.component';
import { FollowboxComponent } from './followbox/followbox.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { DataTableDirective } from 'angular-datatables';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { ToastComponent } from '../toast/toast.component';
import { ToasterComponent } from '../toaster/toaster.component';


@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css']
})
export class TipsComponent implements AfterViewInit, OnDestroy, OnInit {


  TipsItems: any[] = [];
  dtOptions : any= {} ;
  dtTrigger: Subject<any> = new Subject<any>();
  isEditClicked: { [key: number]: boolean } = {};
  idToShow : any;
  isTextboxVisible: boolean = false;
  SNOptions: any[] = [];


  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective | undefined;
  isResultLoaded = false;

  constructor(private http: HttpClient,private dialog : MatDialog,private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.dtTrigger.next(null);
    
    // Initialize DataTable options
    this.dtOptions={
      lengthChange:true,
      "lengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
      // dom: 'Bfrltip',
      pagingType:"full_numbers",
      processing: true, 
      autoWidth: false,
      scrollCollapse: true,
      dom: '<lf<Btr>ip>',
        order: [[0, "desc"]],  
        scrollX: false,
      buttons: [
        'colvis','pdf','copy', 'csv', 'excel', 'print'
      ],
      
    };
    this.getAllTips();
    this.getAllLevels();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  rerender(): void {
    if (this.datatableElement) {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next(null);
      });
    }
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


  getAllTips(): void {
    this.http.get<any>("http://localhost:8888/api/calls").subscribe((resultData: any) => {
        this.TipsItems = resultData.data;
        console.log(resultData);
        this.rerender();
      },
      (error: any) => {
        console.error('Error fetching tips data:', error);
      }
    );
  }

  getAllLevels(): void {
    this.http.get<any>("http://localhost:8888/api/commoditie")
      .subscribe((resultData: any) => {
        this.SNOptions = resultData.data;
        console.log(this.SNOptions); 
      });
  }
  
  getItemName(id: number): string {
    // console.log('SNOptions:', this.SNOptions);
    const selectedItem = this.SNOptions.find(item => item.id === id);
    const itemName = selectedItem ? selectedItem.name : 'Unknown';
    return itemName;
  }
  
  
  
  
  
  
  openPopup() {
    this.Openpopup(PopupComponent);
    }


    showTableData(id: any): void {
      this.isEditClicked[id] = !this.isEditClicked[id];
      this.idToShow = id;
    }
  
    shows(id: any): void{
      this.isEditClicked[id] = !this.isEditClicked[id];
      this.idToShow = id;
  
  
    }

    setDelete(data: any) {
      this.showNotification("Do you want to delete these fields").subscribe(confirmed => {
        if (confirmed) {
          this.http.delete("http://localhost:8888/api/calls/delete/" + data.id)
            .subscribe((resultData: any) => {
              this.showNoti("Deleted Successfully!",3000);
              window.location.reload();
            });
        }
      });
    }
    

    
    
    edit(data: any) {
      const dialogRef = this.dialog.open(EditboxComponent, {
        data,
        width: '',
        height: '',
        enterAnimationDuration: '1s',
        exitAnimationDuration: '1s',
      });
  
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getAllTips();
          }
        },
      });
    }

    follow(data: any) {
      const dialogRef = this.dialog.open(FollowboxComponent, {
        data,
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '1000ms',
      });
  
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getAllTips();
          }
        },
      });
    }


    Openpopup(component:any) {
      var _popup = this.dialog.open(component, {
        enterAnimationDuration: '1s',
        exitAnimationDuration: '1s',
      });      
      // Add the blurred background class to the body when the dialog is open
      document.body.classList.add('blurred-background');
  
      // Subscribe to the dialog's close event to remove the blurred background class
      _popup.afterClosed().subscribe(() => {
        document.body.classList.remove('blurred-background');
      });
    }



}
