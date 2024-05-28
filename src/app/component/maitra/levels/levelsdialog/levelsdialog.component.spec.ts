import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelsdialogComponent } from './levelsdialog.component';

describe('LevelsdialogComponent', () => {
  let component: LevelsdialogComponent;
  let fixture: ComponentFixture<LevelsdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LevelsdialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LevelsdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
