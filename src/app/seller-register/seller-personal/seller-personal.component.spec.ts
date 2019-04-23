import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPersonalComponent } from './seller-personal.component';

describe('SellerPersonalComponent', () => {
  let component: SellerPersonalComponent;
  let fixture: ComponentFixture<SellerPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
