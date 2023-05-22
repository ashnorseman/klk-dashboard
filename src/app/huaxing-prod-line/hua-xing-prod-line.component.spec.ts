import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuaXingProdLineComponent } from './hua-xing-prod-line.component';

describe('HuaxingProdLineComponent', () => {
  let component: HuaXingProdLineComponent;
  let fixture: ComponentFixture<HuaXingProdLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HuaXingProdLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuaXingProdLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
