import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerComponent } from './customer.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { UtilityService } from 'src/app/services/utility.service';
import { FormBuilder } from '@angular/forms';
import { ConstantsService } from 'src/app/services/constants.service';

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<CustomerComponent>>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockUtilityService: jasmine.SpyObj<UtilityService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerComponent ],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: ApiService, useValue: mockApiService },
        { provide: UtilityService, useValue: mockUtilityService },
        ConstantsService,
      ],
    })
    .compileComponents();
    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form for adding', () => {
    component.ngOnInit();
    expect(component.userForm.get('firstName')?.value).toBe('');
    expect(component.userForm.get('lastName')?.value).toBe('');
    expect(component.userForm.get('birthDate')?.value).toBeNull();
  });
});


