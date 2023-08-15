import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDetailsDialogComponent } from './contract-details-dialog.component';

describe('ContractDetailsDialogComponent', () => {
  let component: ContractDetailsDialogComponent;
  let fixture: ComponentFixture<ContractDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractDetailsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
