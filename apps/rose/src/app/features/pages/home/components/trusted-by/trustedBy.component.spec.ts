import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrustedByComponent } from './trustedBy.component';

describe('TrustedByComponent', () => {
  let component: TrustedByComponent;
  let fixture: ComponentFixture<TrustedByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustedByComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrustedByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
