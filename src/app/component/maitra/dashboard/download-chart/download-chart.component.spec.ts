import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadChartComponent } from './download-chart.component';

describe('DownloadChartComponent', () => {
  let component: DownloadChartComponent;
  let fixture: ComponentFixture<DownloadChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DownloadChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
