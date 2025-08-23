import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InputErrorHandlingComponent } from "./input-error-handling.component";

describe("InputErrorHandlingComponent", () => {
  let component: InputErrorHandlingComponent;
  let fixture: ComponentFixture<InputErrorHandlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputErrorHandlingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputErrorHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
