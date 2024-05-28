import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowboxComponent } from './followbox.component';

describe('FollowboxComponent', () => {
  let component: FollowboxComponent;
  let fixture: ComponentFixture<FollowboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FollowboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FollowboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
