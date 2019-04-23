import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerServicesComponent } from './seller-services.component';

describe('SellerServicesComponent', () => {
  let component: SellerServicesComponent;
  let fixture: ComponentFixture<SellerServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
