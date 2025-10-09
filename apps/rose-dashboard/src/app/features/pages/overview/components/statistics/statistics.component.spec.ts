import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StatisticsComponent } from "./statistics.component";
import { LoadingComponent } from "@rose_dashboard/features_layouts/loading/loading.component";

describe("StatisticsComponent", () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatisticsComponent);

    describe("LoadingComponent", () => {
      let component: LoadingComponent;
      let fixture: ComponentFixture<LoadingComponent>;

      beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [LoadingComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LoadingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  });
});
