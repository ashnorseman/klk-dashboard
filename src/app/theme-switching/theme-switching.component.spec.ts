import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSwitchingComponent } from './theme-switching.component';

describe('ThemeSwitchingComponent', () => {
  let component: ThemeSwitchingComponent;
  let fixture: ComponentFixture<ThemeSwitchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeSwitchingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeSwitchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
