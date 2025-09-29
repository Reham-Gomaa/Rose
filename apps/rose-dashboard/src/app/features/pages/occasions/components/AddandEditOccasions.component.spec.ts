import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AddandEditOccasionsComponent } from "./AddandEditOccasions.component";

describe("AddandEditOccasionsComponent", () => {
  let component: AddandEditOccasionsComponent;
  let fixture: ComponentFixture<AddandEditOccasionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddandEditOccasionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddandEditOccasionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
