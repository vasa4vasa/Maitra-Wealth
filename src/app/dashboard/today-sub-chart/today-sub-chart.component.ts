import { Component, AfterViewInit, ElementRef, ViewChild, PLATFORM_ID, Inject, Input } from '@angular/core';
import Chart from 'chart.js/auto';
import { isPlatformBrowser } from '@angular/common';
import moment from 'moment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-today-sub-chart',
  templateUrl: './today-sub-chart.component.html',
  styleUrls: ['./today-sub-chart.component.css']
})
export class TodaySubChartComponent implements AfterViewInit {

  public chart: any;
  @ViewChild('TodaySubscribers') TodaySubscribers!: ElementRef;
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
        this.createChart();
      });
  }

  createChart(): void {
    if (!this.UsersDownloadArray) return;

    if (this.chart) {
      this.chart.destroy();
    }

    const currentMonthYear = moment().year(this.selectedYear).month(this.selectedMonth - 1);
    const currentMonth = currentMonthYear.format('YYYY-MM');
    const currentMonthDates = this.getMonthDates(currentMonth);

    const currentMonthSubscribers = this.UsersDownloadArray.filter((entry: any) =>
      moment(entry.AppInstalledDate).format('YYYY-MM') === currentMonth && entry.IsSubscribedUser === '1'
    );

    const groupedDates = this.groupDatesByDay(currentMonthSubscribers.map((entry: any) =>
      moment(entry.AppInstalledDate).format('YYYY-MM-DD')
    ));

    const installDates = currentMonthDates.map((date) => moment(date).format('YYYY-MM-DD'));
    const installCounts = installDates.map((date) => groupedDates[date] || 0);

    const ctx = this.TodaySubscribers.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: installDates,
        datasets: [{
          label: "Today Subscribers",
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