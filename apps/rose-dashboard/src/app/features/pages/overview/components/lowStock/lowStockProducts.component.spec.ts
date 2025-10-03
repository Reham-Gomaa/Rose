import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LowStockProductsComponent } from "./lowStockProducts.component";

describe("LowStockProductsComponent", () => {
  let component: LowStockProductsComponent;
  let fixture: ComponentFixture<LowStockProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LowStockProductsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LowStockProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
