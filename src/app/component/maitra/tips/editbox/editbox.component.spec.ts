import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditboxComponent } from './editbox.component';

describe('EditboxComponent', () => {
  let component: EditboxComponent;
  let fixture: ComponentFixture<EditboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
