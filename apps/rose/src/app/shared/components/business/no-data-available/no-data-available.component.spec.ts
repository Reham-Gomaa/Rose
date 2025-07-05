import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDataAvailableComponent } from './no-data-available.component';

describe('NoProductAvailableComponent', () => {
  let component: NoDataAvailableComponent;
  let fixture: ComponentFixture<NoDataAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoDataAvailableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoDataAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
