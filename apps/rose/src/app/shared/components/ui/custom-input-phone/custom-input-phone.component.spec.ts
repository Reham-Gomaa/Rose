import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInputPhoneComponent } from './custom-input-phone.component';

describe('CustomInputPhoneComponent', () => {
  let component: CustomInputPhoneComponent;
  let fixture: ComponentFixture<CustomInputPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomInputPhoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomInputPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
