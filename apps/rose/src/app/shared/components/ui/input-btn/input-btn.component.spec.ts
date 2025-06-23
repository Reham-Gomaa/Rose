import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InputBtnComponent } from "./input-btn.component";

describe("InputBtnComponent", () => {
  let component: InputBtnComponent;
  let fixture: ComponentFixture<InputBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputBtnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
