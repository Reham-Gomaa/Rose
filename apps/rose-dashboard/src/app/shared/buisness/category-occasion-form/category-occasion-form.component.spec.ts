import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CategoryOccasionFormComponent } from "./category-occasion-form.component";

describe("CategoryOccasionFormComponent", () => {
  let component: CategoryOccasionFormComponent;
  let fixture: ComponentFixture<CategoryOccasionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryOccasionFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryOccasionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
