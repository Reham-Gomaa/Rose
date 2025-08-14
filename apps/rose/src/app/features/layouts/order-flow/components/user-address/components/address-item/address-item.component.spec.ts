import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressItemComponent } from './address-item.component';

describe('AddressItemComponent', () => {
  let component: AddressItemComponent;
  let fixture: ComponentFixture<AddressItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
