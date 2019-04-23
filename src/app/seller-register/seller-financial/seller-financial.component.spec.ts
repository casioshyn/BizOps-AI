import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerFinancialComponent } from './seller-financial.component';

describe('SellerFinancialComponent', () => {
  let component: SellerFinancialComponent;
  let fixture: ComponentFixture<SellerFinancialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerFinancialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerFinancialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
