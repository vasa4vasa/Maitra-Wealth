import { Component, AfterViewInit, ElementRef, ViewChild, PLATFORM_ID, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Chart } from 'chart.js';
import moment from 'moment';

@Component({
  selector: 'app-revenue-chart',
  templateUrl: './revenue-chart.component.html',
  styleUrls: ['./revenue-chart.component.css']
})
export class RevenueChartComponent implements AfterViewInit {
  public chart: any;

  @ViewChild('Revenues') Revenues!: ElementRef;
  UsersDownloadArray: any;
  isResultLoaded = false;

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
        console.log(resultData.data);
        this.UsersDownloadArray = resultData.data;
        this.createChart();
      });
  }

  createChart(): void {
    if (!this.UsersDownloadArray) return;

    if (this.chart) {
      this.chart.destroy();
    }

    const months = moment.months();

    let filteredDownloads = this.UsersDownloadArray;

    if (this.selectedYear) {
      // Filter downloads by selected year
      filteredDownloads = this.UsersDownloadArray.filter((entry: any) =>
        moment(entry.AppInstalledDate).year() === this.selectedYear
      );
    }

    const groupedDownloads = this.groupDownloadsByMonth(filteredDownloads);
    
    const monthLabels = months;
    const downloadCounts = monthLabels.map((month) => groupedDownloads[month] || 0);

    const ctx = this.Revenues.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: monthLabels,
        datasets: [{
          label: "Downloads",
          data: downloadCounts,
          backgroundColor: 'red',
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }

  groupDownloadsByMonth(downloads: any[]): { [key: string]: number } {
    const groupedData: { [key: string]: number } = {};

    for (const download of downloads) {
      const month = moment(download.AppInstalledDate).format('MMMM');
      groupedData[month] = (groupedData[month] || 0) + 1;
    }

    return groupedData;
  }

  applyFilter(): void {
    // Update the chart when a filter is applied
    this.createChart();
  }
}