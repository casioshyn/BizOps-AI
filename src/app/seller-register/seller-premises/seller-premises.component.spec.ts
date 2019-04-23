import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPremisesComponent } from './seller-premises.component';

describe('SellerPremisesComponent', () => {
  let component: SellerPremisesComponent;
  let fixture: ComponentFixture<SellerPremisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerPremisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerPremisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
