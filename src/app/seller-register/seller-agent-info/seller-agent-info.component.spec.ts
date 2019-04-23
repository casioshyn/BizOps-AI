import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAgentInfoComponent } from './seller-agent-info.component';

describe('SellerAgentInfoComponent', () => {
  let component: SellerAgentInfoComponent;
  let fixture: ComponentFixture<SellerAgentInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerAgentInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerAgentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
