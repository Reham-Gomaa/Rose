import { ComponentFixture, TestBed } from "@angular/core/testing";
import { OrderFlowComponent } from "./order-flow.component";

describe("OrderFlowComponent", () => {
  let component: OrderFlowComponent;
  let fixture: ComponentFixture<OrderFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderFlowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
