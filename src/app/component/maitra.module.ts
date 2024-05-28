import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaitraRoutingModule } from './maitra-routing.module';
import { NavbarComponent } from './maitra/navbar/navbar.component';
import { HeaderComponent } from './maitra/header/header.component';
import { UsersComponent } from './maitra/users/users.component';
import { DashboardComponent } from './maitra/dashboard/dashboard.component';
import { RevenueChartComponent } from './maitra/dashboard/revenue-chart/revenue-chart.component';
import { DownloadChartComponent } from './maitra/dashboard/download-chart/download-chart.component';
import { TipsComponent } from './maitra/tips/tips.component';
import { MessageComponent } from './maitra/message/message.component';
import { TodaySubChartComponent } from './maitra/dashboard/today-sub-chart/today-sub-chart.component';
import { TotalSubChartComponent } from './maitra/dashboard/total-sub-chart/total-sub-chart.component';
import { DialogcompComponent } from './maitra/users/dialogcomp/dialogcomp.component';
import { LevelsComponent } from './maitra/levels/levels.component';
import { LevelsdialogComponent } from './maitra/levels/levelsdialog/levelsdialog.component';
import { EditdialogComponent } from './maitra/levels/editdialog/editdialog.component';
import { MatDatepicker } from '@angular/material/datepicker';
import { EditboxComponent } from './maitra/tips/editbox/editbox.component';
import { FollowboxComponent } from './maitra/tips/followbox/followbox.component';
import { PopupComponent } from './maitra/tips/popup/popup.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { ToastComponent } from './maitra/toast/toast.component';
import { ToasterComponent } from './maitra/toaster/toaster.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    UsersComponent,
    DashboardComponent,
    RevenueChartComponent,
    DownloadChartComponent,
    TipsComponent,
    MessageComponent,
    TodaySubChartComponent,
    TotalSubChartComponent,
    DialogcompComponent,
    LevelsComponent,
    LevelsdialogComponent,
    EditdialogComponent,
    PopupComponent,
    EditboxComponent,
    FollowboxComponent,
    ToastComponent,
    ToasterComponent,
  ],
  providers: [
    provideAnimationsAsync(),
     DatePipe,
     { provide: MAT_DIALOG_DATA, useValue: {} },
     { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
],
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    MaitraRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatMomentDatetimeModule,
    MatDatetimepickerModule,
    MatDatepicker
  ]
})
export class MaitraModule { }
