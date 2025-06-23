import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterOccasionsComponent } from './filter-occasions.component';

describe('FilterBrandsComponent', () => {
  let component: FilterOccasionsComponent;
  let fixture: ComponentFixture<FilterOccasionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterOccasionsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FilterOccasionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
