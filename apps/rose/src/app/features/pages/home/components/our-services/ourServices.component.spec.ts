import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OurServicesComponent } from './ourServices.component';

describe('OurServicesComponent', () => {
  let component: OurServicesComponent;
  let fixture: ComponentFixture<OurServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurServicesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OurServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
