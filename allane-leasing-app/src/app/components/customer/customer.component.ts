import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UtilityService } from 'src/app/services/utility.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { ContractOverview } from 'src/app/models/contract-overview.model';
import { Customer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Customer,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<CustomerComponent>,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.data) {
      this.userForm.controls['firstName'].setValue(this.data.firstName);
      this.userForm.controls['lastName'].setValue(this.data.lastName);
      this.userForm.controls['birthDate'].setValue(
        new Date(this.data.birthDate.toString())
      );
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      if (this.data) {
        this.updateCustomer(userData, this.data.id);
      } else {
        this.addCustomer(userData);
      }
    }
  }

  private initForm(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: [null, Validators.required],
    });
  }

  updateCustomer(userData: Customer, userId: number): void {
    const putData = {
      id: userId,
      firstName: userData.firstName,
      lastName: userData.lastName,
      birthDate: this.utilityService.dateToYYYYMMDD(
        new Date(userData.birthDate.toString())
      ),
    };

    this.apiService
      .put(ConstantsService.updateCustomerUrl(userId), putData)
      .subscribe({
        next: (result) => {
          const snackBarMsg = 'Customer Updated';
          this.utilityService.snackBarCall(snackBarMsg, 'Success');
        },
        error: (error) => {
          this.utilityService.snackBarCall(error.message, 'Failure');
        },
        complete: () => {
          this.dialogRef.close('refresh');
        },
      });
  }

  addCustomer(userData: Customer): void {
    const postData = {
      birthDate: this.utilityService.dateToYYYYMMDD(
        new Date(userData.birthDate.toString())
      ),
      firstName: userData.firstName,
      lastName: userData.lastName,
    };

    this.apiService
      .post(ConstantsService.postCustomerUrl(), postData)
      .subscribe({
        next: (result) => {
          const fullName = `${result.firstName} ${result.lastName}`;
          const snackBarMsg = `${fullName} added`;
          this.utilityService.snackBarCall(snackBarMsg, 'Success');
        },
        error: (error) => {
          this.utilityService.snackBarCall(error.message, 'Failure');
        },
        complete: () => {
          this.dialogRef.close('refresh');
        },
      });
  }
}
