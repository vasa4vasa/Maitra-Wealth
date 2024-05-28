import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaySubChartComponent } from './today-sub-chart.component';

describe('TodaySubChartComponent', () => {
  let component: TodaySubChartComponent;
  let fixture: ComponentFixture<TodaySubChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodaySubChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodaySubChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
