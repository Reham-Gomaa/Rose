import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMainDialogComponent } from './custom-main-dialog.component';

describe('CustomMainDialogComponent', () => {
  let component: CustomMainDialogComponent;
  let fixture: ComponentFixture<CustomMainDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomMainDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomMainDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
