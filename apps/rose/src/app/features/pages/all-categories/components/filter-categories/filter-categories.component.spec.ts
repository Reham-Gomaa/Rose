import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FilterCategoriesComponent } from "./filter-categories.component";

describe("FilterCategoriesComponent", () => {
  let component: FilterCategoriesComponent;
  let fixture: ComponentFixture<FilterCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterCategoriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
