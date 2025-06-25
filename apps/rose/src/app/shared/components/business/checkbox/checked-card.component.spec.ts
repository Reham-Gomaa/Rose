import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CheckedCardComponent } from "./checked-card.component";

describe("CheckedCardComponent", () => {
  let component: CheckedCardComponent;
  let fixture: ComponentFixture<CheckedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckedCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
