import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { PopupComponent } from './popup/popup.component';
import { EditboxComponent } from './editbox/editbox.component';
import { FollowboxComponent } from './followbox/followbox.component';



@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css']
})
export class TipsComponent implements OnInit {


  TipsItems: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

   isEditClicked: { [key: number]: boolean } = {};
  idToShow : any;
  isTextboxVisible: boolean = false;
  constructor(private http: HttpClient,private dialog : MatDialog) {}

  ngOnInit(): void {
    this.getAllTips();
    // Initialize DataTable options
    this.dtOptions = {
      lengthChange: true,
      dom: 'Bfrltip',
      pagingType: 'full_numbers'
    };
  }

  getAllTips(): void {
    this.http.get<any>("http://localhost:8888/api/calls").subscribe((resultData: any) => {
        this.TipsItems = resultData.data;
        console.log(resultData);
        this.dtTrigger.next(resultData);
      },
      (error: any) => {
        console.error('Error fetching tips data:', error);
      }
    );
  }

  openPopup() {
    this.Openpopup(PopupComponent);
    }


    showTableData(ID: any): void {
      this.isEditClicked[ID] = !this.isEditClicked[ID];
      this.idToShow = ID;
    }
  
    shows(ID: any): void{
      this.isEditClicked[ID] = !this.isEditClicked[ID];
      this.idToShow = ID;
  
  
    }

    setDelete(data: any) {
      this.http.delete("http://localhost:8888/api/calls/delete/" + data.id)
      .subscribe((resultData: any) => {
        alert("ARE YOU WANT TO DELETE THIS ROW");
        this.getAllTips();
      });
      window.location.reload();
    }

    
    
    edit(data: any) {
      const dialogRef = this.dialog.open(EditboxComponent, {
        data,
        width: '70%',
        height: '90%',
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

    follow(data: any) {
      const dialogRef = this.dialog.open(FollowboxComponent, {
        data,
        width: '70%',
        height: '90%',
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
        width: '70%',
        height: '90%',
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
