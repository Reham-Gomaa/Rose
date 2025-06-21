import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBrandsComponent } from './filter-brands.component';

describe('FilterBrandsComponent', () => {
  let component: FilterBrandsComponent;
  let fixture: ComponentFixture<FilterBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterBrandsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
