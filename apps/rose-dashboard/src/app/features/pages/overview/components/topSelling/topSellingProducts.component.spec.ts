import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TopSellingProductsComponent } from "./topSellingProducts.component";

describe("TopSellingProductsComponent", () => {
  let component: TopSellingProductsComponent;
  let fixture: ComponentFixture<TopSellingProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopSellingProductsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopSellingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
