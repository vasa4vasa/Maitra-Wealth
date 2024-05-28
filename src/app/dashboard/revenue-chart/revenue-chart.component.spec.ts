import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueChartComponent } from './revenue-chart.component';

describe('RevenueChartComponent', () => {
  let component: RevenueChartComponent;
  let fixture: ComponentFixture<RevenueChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RevenueChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RevenueChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
