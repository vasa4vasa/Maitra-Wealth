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

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrl: './levels.component.css'
})
export class LevelsComponent {

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

  dtOptions : DataTables.Settings= {} ;
  dtTrigger: Subject<any> = new Subject<any>;

  

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


  constructor(private http: HttpClient,private dialog : MatDialog) {
    this.getAllLevels();
  }

  ngOnInit(): void {
    this.dtOptions={

      lengthChange:true,
      dom: 'Bfrltip',
      pagingType:"full_numbers",
      order:[[2,"asc"]],
      ordering: true
    }
  }


  getAllLevels() {
    this.http.get("http://localhost:8888/api/levels")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.LevelsArray = resultData.data;
      });
  }




  isFormValid(): boolean {
    return  !!this.SN && !!this.MN && !!this.R1 && !!this.R2 && !!this.R3 &&
      !!this.S1 && !!this.S2 && !!this.S3 && !!this.DV && !!this.GN && !!this.created_by && !!this.Levels_id;
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
      width: '40%',
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
    const dialogRef = this.dialog.open(EditdialogComponent, {
      data: TipsItem, // Use data instead of directly passing TipsItem
      width: '40%',
    });
    document.body.classList.add('blurred-background');
  
    // Subscribe to the dialog's close event to remove the blurred background class
    dialogRef.afterClosed().subscribe((val) => {
      // This function will execute when the dialog is closed
      document.body.classList.remove('blurred-background');
      if (val) {
        this.getAllLevels();
      }
    });
  }



  setDelete(data: any) {
    this.http.delete("http://localhost:8888/api/levels/delete/" + data.ID)
      .subscribe((resultData: any) => {
        alert("ARE YOU WANT TO DELETE THIS ROW");
        this.getAllLevels();
      });
  }

 addLevels(){
    this.Openpopup(LevelsdialogComponent);
  }


  Openpopup(component:any) {
    var _popup = this.dialog.open(component, {
      width: '40%',
      height: '80%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });

    
    // Add the blurred background class to the body when the dialog is open
    document.body.classList.add('blurred-background');

    // Subscribe to the dialog's close event to remove the blurred background class
    _popup.afterClosed().subscribe(() => {
      document.body.classList.remove('blurred-background');
    });
  }
}
