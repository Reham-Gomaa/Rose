import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HeadAddressComponent } from "./head-address.component";

describe("HeadAddressComponent", () => {
  let component: HeadAddressComponent;
  let fixture: ComponentFixture<HeadAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadAddressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeadAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
