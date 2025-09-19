import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RoseCustomInputsComponent } from "./rose-custom-inputs.component";

describe("RoseCustomInputsComponent", () => {
  let component: RoseCustomInputsComponent;
  let fixture: ComponentFixture<RoseCustomInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoseCustomInputsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RoseCustomInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
