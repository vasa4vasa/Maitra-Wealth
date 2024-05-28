import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSubChartComponent } from './total-sub-chart.component';

describe('TotalSubChartComponent', () => {
  let component: TotalSubChartComponent;
  let fixture: ComponentFixture<TotalSubChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalSubChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalSubChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
