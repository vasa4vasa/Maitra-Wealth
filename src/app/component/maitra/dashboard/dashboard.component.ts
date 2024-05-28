import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import moment from 'moment';
import { DownloadChartComponent } from './download-chart/download-chart.component';
import { TodaySubChartComponent } from './today-sub-chart/today-sub-chart.component';
import { TotalSubChartComponent } from './total-sub-chart/total-sub-chart.component';
import { RevenueChartComponent } from './revenue-chart/revenue-chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})


export class DashboardComponent {
  

  isResultLoaded = false;
  UsersArray : any[] = [];
  tosubscribers : any[] =[];
  totalsub: any[] = [];
  todownload: any;
  
  filteredData: any;


  selectedMonth: number = moment().month() + 1; // Initialize with current month
  selectedYear: number = moment().year(); // Initialize with current year
  months: any = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];
  years: number[] = [];

  
  @ViewChild(DownloadChartComponent) downloadChartComponent!: DownloadChartComponent;
  @ViewChild(TodaySubChartComponent) todaySubChartComponent!: TodaySubChartComponent;
  @ViewChild(TotalSubChartComponent) totalSubChartComponent!: TotalSubChartComponent;
  @ViewChild(RevenueChartComponent) totalDownChartComponent!: RevenueChartComponent;

  
  


  constructor(private http: HttpClient ) 
  {
    this.getallusers();
    this.todayDownloads();
    this.todaysubscribers();
    this.totalsubscribers();
    const currentYear = moment().year();
    for (let i = currentYear; i >= 2010; i--) {
      this.years.push(i);
    }

  }

 // Total download users
  getallusers()
  { 
    this.http.get("http://localhost:8888/api/allusers/")
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        //console.log(resultData.data);
        this.UsersArray = resultData.data;
    });
  }

  //Today Download users

  todayDownloads()
  { 
    this.http.get("http://localhost:8888/api/todaydownusers/")
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        //console.log(resultData.data);
        this.todownload = resultData.data;
        
    });
  }
 
  //Total Subscribers

  totalsubscribers()
  { 
    this.http.get("http://localhost:8888/api/totalsubscribers/")
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        //console.log(resultData.data);
        this.totalsub = resultData.data;
    });
  }
  
  // Toady Subscribers

  todaysubscribers()
  { 
    this.http.get("http://localhost:8888/api/todaysubscribedusers/")
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        //console.log(resultData.data);
        this.tosubscribers = resultData.data;
        
    });
  }




  // Total download users
  getUserCount(): any {
    return this.UsersArray?.length;
  }

  // Today download users
  getTodayDownloads() : any {
    return this.todownload?.length; 
  }

  // Total Subscribers
  getTotalSubscribers(): any{
    return this.totalsub?.length;
  }
  
  // Today Subscribers
  getTodaySubscribers():any{
    return this.tosubscribers?.length;
  }


  applyFilter(): void {
    // Check if both month and year are selected
    if (this.selectedMonth && this.selectedYear) {

      //download chart in month
      this.downloadChartComponent.selectedMonth = this.selectedMonth;
      this.downloadChartComponent.selectedYear = this.selectedYear;

      //Subscriber chart in month
      this.todaySubChartComponent.selectedMonth = this.selectedMonth;
      this.todaySubChartComponent.selectedYear = this.selectedYear;

      this.totalSubChartComponent.selectedYear = this.selectedYear;

      this.totalDownChartComponent.selectedYear = this.selectedYear;

      //filter chart
      this.downloadChartComponent.applyFilter();
      this.todaySubChartComponent.applyFilter();
      this.totalSubChartComponent.applyFilter();
      this.totalDownChartComponent.applyFilter();


      console.log('Selected month:', this.selectedMonth);
      console.log('Selected year:', this.selectedYear);
      
    } else {
      // Handle case where either month or year is not selected
      console.log('Please select both month and year.');
    }
  }


}