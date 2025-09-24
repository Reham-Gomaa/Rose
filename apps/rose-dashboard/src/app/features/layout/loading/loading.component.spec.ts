import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StatisticsComponent } from "./statistics.component";

<<<<<<<< HEAD:apps/rose-dashboard/src/app/features/pages/overview/components/statistics/statistics.component.spec.ts
describe("StatisticsComponent", () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatisticsComponent);
========
import { LoadingComponent } from "./loading.component";

describe("LoadingComponent", () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
>>>>>>>> 69bb19998bdb50d0eb5dabf4caedf4d23d404deb:apps/rose-dashboard/src/app/features/layout/loading/loading.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
