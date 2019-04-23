import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerBuildingComponent } from './seller-building.component';

describe('SellerBuildingComponent', () => {
  let component: SellerBuildingComponent;
  let fixture: ComponentFixture<SellerBuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerBuildingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
