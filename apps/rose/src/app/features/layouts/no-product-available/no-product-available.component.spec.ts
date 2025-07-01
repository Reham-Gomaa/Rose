import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoProductAvailableComponent } from './no-product-available.component';

describe('NoProductAvailableComponent', () => {
  let component: NoProductAvailableComponent;
  let fixture: ComponentFixture<NoProductAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoProductAvailableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoProductAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
