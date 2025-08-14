import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BestsellerSliderComponent } from "./bestseller-slider.component";

describe("BestsellerSliderComponent", () => {
  let component: BestsellerSliderComponent;
  let fixture: ComponentFixture<BestsellerSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestsellerSliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BestsellerSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
