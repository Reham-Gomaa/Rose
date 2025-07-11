import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BestSellerComponent } from "./bestSeller.component";

describe("BestSellerComponent", () => {
  let component: BestSellerComponent;
  let fixture: ComponentFixture<BestSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestSellerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BestSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
