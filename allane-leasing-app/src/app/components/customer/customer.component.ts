import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UtilityService } from 'src/app/services/utility.service';
import { ConstantsService } from 'src/app/services/constants.service';
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

     // If data is provided, set the form for updating
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
      this.data ? this.updateCustomer(userData, this.data.id) : this.addCustomer(userData);
    }
  }

  private initForm(): void {
    // Initialize the userForm FormGroup
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

    // Perform the add API call
    this.apiService
      .put(ConstantsService.updateCustomerUrl(userId), putData)
      .subscribe({
        next: (result) => {
          this.utilityService.snackBarCall('Customer Updated', 'Success');
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
          this.utilityService.snackBarCall(
            `${result.firstName} ${result.lastName}` + ' added',
            'Success'
          );
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
