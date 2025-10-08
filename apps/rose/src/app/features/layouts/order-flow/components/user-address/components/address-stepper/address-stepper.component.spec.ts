import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AddressStepperComponent } from "./address-stepper.component";

describe("AddressStepperComponent", () => {
  let component: AddressStepperComponent;
  let fixture: ComponentFixture<AddressStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressStepperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
