import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AddressChoiceComponent } from "./address-choice.component";

describe("AddressChoiceComponent", () => {
  let component: AddressChoiceComponent;
  let fixture: ComponentFixture<AddressChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressChoiceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
