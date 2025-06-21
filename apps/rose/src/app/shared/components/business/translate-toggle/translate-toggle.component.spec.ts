import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateToggleComponent } from './translate-toggle.component';

describe('TranslateToggleComponent', () => {
  let component: TranslateToggleComponent;
  let fixture: ComponentFixture<TranslateToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateToggleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TranslateToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
