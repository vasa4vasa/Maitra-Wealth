import { Component, AfterViewInit, ElementRef, ViewChild, PLATFORM_ID, Inject, Input } from '@angular/core';
import Chart from 'chart.js/auto';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import moment from 'moment'; // Import moment.js for date formatting

@Component({
  selector: 'app-download-chart',
  templateUrl: './download-chart.component.html',
  styleUrls: ['./download-chart.component.css']
})
export class DownloadChartComponent implements AfterViewInit {

  public chart: any;
  @ViewChild('MyChart') MyChart!: ElementRef;
  isResultLoaded = false;
  UsersDownloadArray: any;
  months: any;
  @Input() selectedMonth!: number;
  @Input() selectedYear!: number;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getUsersInstall();
    }
  }

  getUsersInstall(): void { 
    this.http.get("http://localhost:8888/api/allusers/")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        this.UsersDownloadArray = resultData.data;
        this.createChart();
      });
  }

  createChart(): void {
    if (!this.UsersDownloadArray) return; // Return if data is not available yet

    if (this.chart) {
      this.chart.destroy(); // Destroy the previous chart instance
    }

    const currentMonthYear = moment().year(this.selectedYear).month(this.selectedMonth - 1); // Subtract 1 from month since months are zero-based in moment.js
    const currentMonth = currentMonthYear.format('YYYY-MM');
    const currentMonthDates = this.getMonthDates(currentMonth);

    // Filter the download array to include only downloads for the current month
    const currentMonthDownloads = this.UsersDownloadArray.filter((entry: any) =>
      moment(entry.AppInstalledDate).format('YYYY-MM') === currentMonth
    );

    // Group downloads by day for the current month
    const groupedDates = this.groupDatesByDay(currentMonthDownloads.map((entry: any) =>
      moment(entry.AppInstalledDate).format('YYYY-MM-DD')
    ));
    
    // Initialize arrays for labels and data
    const installDates = currentMonthDates.map((date) => moment(date).format('YYYY-MM-DD'));
    const installCounts = installDates.map((date) => groupedDates[date] || 0);

    const ctx = this.MyChart.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: installDates,
        datasets: [{
          label: "Downloads",
          data: installCounts,
          backgroundColor: 'blue',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }

  getMonthDates(month: string): string[] {
    const daysInMonth = moment(month, 'YYYY-MM').daysInMonth();
    const monthStart = moment(month + '-01');
    const dates: string[] = [];
    for (let i = 0; i < daysInMonth; i++) {
      dates.push(monthStart.clone().add(i, 'days').format('YYYY-MM-DD'));
    }
    return dates;
  }

  groupDatesByDay(dates: string[]): { [key: string]: number } {
    return dates.reduce((acc: { [key: string]: number }, date: string) => {
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
  }
  
  applyFilter(): void {
    if (this.selectedMonth && this.selectedYear) {
      this.getUsersInstall(); // Re-fetch data and recreate the chart
    } else {
      console.log('Please select both month and year.');
    }
  }
}