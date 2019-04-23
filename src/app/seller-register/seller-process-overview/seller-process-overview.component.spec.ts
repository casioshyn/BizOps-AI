import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProcessOverviewComponent } from './seller-process-overview.component';

describe('SellerProcessOverviewComponent', () => {
  let component: SellerProcessOverviewComponent;
  let fixture: ComponentFixture<SellerProcessOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerProcessOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerProcessOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
