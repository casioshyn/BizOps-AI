import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerOtherDocsComponent } from './seller-other-docs.component';

describe('SellerOtherDocsComponent', () => {
  let component: SellerOtherDocsComponent;
  let fixture: ComponentFixture<SellerOtherDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerOtherDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerOtherDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
