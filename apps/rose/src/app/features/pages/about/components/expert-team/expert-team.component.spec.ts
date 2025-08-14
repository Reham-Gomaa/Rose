import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertTeamComponent } from './expert-team.component';

describe('ExpertTeamComponent', () => {
  let component: ExpertTeamComponent;
  let fixture: ComponentFixture<ExpertTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
