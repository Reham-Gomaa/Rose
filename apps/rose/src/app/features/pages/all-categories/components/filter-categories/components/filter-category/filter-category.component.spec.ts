import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCategoryComponent } from './filter-category.component';

describe('FilterCategoryComponent', () => {
  let component: FilterCategoryComponent;
  let fixture: ComponentFixture<FilterCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
