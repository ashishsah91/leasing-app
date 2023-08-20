import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContractOverview } from 'src/app/models/contract-overview.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { ApiService } from 'src/app/services/api.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-leasing-contract',
  templateUrl: './leasing-contract.component.html',
  styleUrls: ['./leasing-contract.component.css'],
})
export class LeasingContractComponent implements OnInit {

// Constants for pagination and form
  page = ConstantsService.PAGE_NUMBER;
  pageSize = ConstantsService.PAGE_SIZE;
  leasingForm!: FormGroup;
  customerOptions: any[] = [];
  vehicleOptions: Vehicle[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public contractdata: ContractOverview,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<LeasingContractComponent>,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    // Initialize the leasing form and fetch customer and vehicle options
    this.initLeasingForm();
    this.getCustomers();
    this.getVehicles();

    // Pre-fill monthlyRate if editing existing contract
    if (this.contractdata) {
      this.leasingForm.controls['monthlyRate'].setValue(
        this.contractdata.monthlyRate
      );
    }
  }

  onSubmit() {
    if (this.leasingForm.valid) {
      const formData = this.leasingForm.value;
      const customerBdayString = this.formatBirthDate(
        formData.customer.birthDate
      );
      formData.customer.birthDate = customerBdayString;
      this.contractdata
        ? this.updateContractOverview(formData)
        : this.addContractOverview(formData);
    }
  }

  formatBirthDate(arr: number[]): string {
    return arr.map((value) => value.toString().padStart(2, '0')).join('-');
  }

  initLeasingForm(): void {
    // Initialize the leasingForm with form controls and validators
    this.leasingForm = this.formBuilder.group({
      monthlyRate: [null, [Validators.required, Validators.min(0)]],
      customer: [null, Validators.required],
      vehicle: [null, Validators.required],
    });
  }

  getCustomers(): void {
    // Fetch customer options and pre-select if editing existing contract
    this.apiService
      .get(`${ConstantsService.getCustomersUrl()}?page=${this.page}&size=${this.pageSize}&sort=UNSORTED`)
      .subscribe({
        next: (result) => {
          this.customerOptions = result.overviewItems;
        },
        error: (e) => {},
        complete: () => {
          if (this.contractdata?.customerId) {
            const customer = this.customerOptions.find(
              (ele) => ele.id === this.contractdata.customerId
            );
            this.leasingForm.controls['customer'].setValue(customer);
          }
        },
      });
  }

  getVehicles(): void {
     // Fetch vehicle options and pre-select if editing existing contract
    this.apiService
      .get(`${ConstantsService.getVehiclesUrl()}?page=${this.page}&size=${this.pageSize}&sort=UNSORTED`)
      .subscribe({
        next: (result) => {
          this.vehicleOptions = result.overviewItems;
        },
        error: (e) => {},
        complete: () => {
          if (this.contractdata?.vehicleId) {
            const vehicle = this.vehicleOptions.find(
              (ele) => ele.id === this.contractdata.vehicleId
            );
            this.leasingForm.controls['vehicle'].setValue(vehicle);
          }
        },
      });
  }

  addContractOverview(postData: any): void {
    // Add a new leasing contract
    this.apiService
      .post(ConstantsService.postLeasingContractUrl(), postData)
      .subscribe({
        next: (result) => {
          console.log(result);
          this.utilityService.snackBarCall('New Contract added', 'Success');
        },
        error: (err) => {
          this.utilityService.snackBarCall(err.message, 'Failure');
        },
        complete: () => {
          this.dialogRef.close('refresh');
        },
      });
  }

  updateContractOverview(formData: any) {
    // Update an existing leasing contract
    const putData = { id: 24944968, ...formData };
    this.apiService
      .put(
        ConstantsService.updateLeasingContractUrl(this.contractdata.contractId),
        putData
      )
      .subscribe({
        next: (result) => {
          this.utilityService.snackBarCall('Contract Updated', 'Success');
        },
        error: (err) => {
          this.utilityService.snackBarCall(err.message, 'Failure');
        },
        complete: () => {
          this.dialogRef.close('refresh');
        },
      });
  }
}
