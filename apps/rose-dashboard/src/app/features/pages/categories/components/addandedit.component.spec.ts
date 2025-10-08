import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AddandeditComponent } from "./addandedit.component";

describe("AddandeditComponent", () => {
  let component: AddandeditComponent;
  let fixture: ComponentFixture<AddandeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddandeditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddandeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
