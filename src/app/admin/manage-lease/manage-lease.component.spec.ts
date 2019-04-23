import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLeaseComponent } from './manage-lease.component';

describe('ManageLeaseComponent', () => {
  let component: ManageLeaseComponent;
  let fixture: ComponentFixture<ManageLeaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageLeaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLeaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
