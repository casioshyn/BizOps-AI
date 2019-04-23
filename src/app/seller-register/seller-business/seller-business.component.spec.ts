import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerBusinessComponent } from './seller-business.component';

describe('SellerBusinessComponent', () => {
  let component: SellerBusinessComponent;
  let fixture: ComponentFixture<SellerBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
