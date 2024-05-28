import { Component, AfterViewInit, ElementRef, ViewChild, PLATFORM_ID, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import Chart from 'chart.js/auto';
import moment from 'moment';

@Component({
  selector: 'app-total-sub-chart',
  templateUrl: './total-sub-chart.component.html',
  styleUrls: ['./total-sub-chart.component.css']
})
export class TotalSubChartComponent implements AfterViewInit {

  public chart: any;

  @ViewChild('TotalSubscribers') TotalSubscribers!: ElementRef;
  UsersDownloadArray: any;
  isResultLoaded = false;

  @Input() selectedMonth!: number;
  @Input() selectedYear!: number;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) { }

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
        this.createChart(); // Create the chart immediately after fetching data
      });
  }

  createChart(): void {
    if (!this.UsersDownloadArray) return;

    if (this.chart) {
      this.chart.destroy();
    }

    const filteredDownloads = this.filterDownloadsByYear(this.UsersDownloadArray);

    const groupedSubscribers = this.groupSubscribersByMonth(filteredDownloads);

    const months = moment.months();
    const monthLabels = months;
    const subscriberCounts = monthLabels.map((month) => groupedSubscribers[month] || 0);

    const ctx = this.TotalSubscribers.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: monthLabels,
        datasets: [{
          label: "Total Subscribers in year",
          data: subscriberCounts,
          backgroundColor: 'red',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }

  filterDownloadsByYear(downloads: any[]): any[] {
    if (!this.selectedYear) return downloads;
    return downloads.filter((entry: any) =>
      moment(entry.AppInstalledDate).year() === this.selectedYear
    );
  }

  groupSubscribersByMonth(subscribers: any[]): { [key: string]: number } {
    const groupedData: { [key: string]: number } = {};

    for (const subscriber of subscribers) {
      const month = moment(subscriber.AppInstalledDate).format('MMMM');
      groupedData[month] = (groupedData[month] || 0) + 1;
    }

    return groupedData;
  }

  applyFilter(): void {
    this.createChart(); // Re-create the chart when a filter is applied
  }
}