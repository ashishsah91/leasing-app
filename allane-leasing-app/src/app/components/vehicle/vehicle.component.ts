import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Brand } from 'src/app/models/brand.model';
import { BrandModel } from 'src/app/models/brandModel.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { ApiService } from 'src/app/services/api.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
})
export class VehicleComponent implements OnInit {
  vehicleForm!: FormGroup;
  brandOptions: Brand[] = [];
  modelOptions: BrandModel[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public vehicleData: Vehicle,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<VehicleComponent>,
    private utilityService: UtilityService
  ) {}

  // Initialize the vehicle form and fetch vehicle brands
  ngOnInit(): void {
    this.initVehicleForm();
    this.fetchVehicleBrands();
  }

  // When a brand is selected, fetch corresponding vehicle models
  onBrandSelected(event: any) {
    const selectedBrandId: number = event.value.id;
    this.fetchVehicleModels(selectedBrandId);
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      const formObject = this.vehicleForm.value;
      const postData = {
        brand: formObject.brand.name,
        model: formObject.model.name,
        modelYear: formObject.modelYear,
        vin: formObject.vin,
        price: formObject.price,
      };
      this.vehicleData
        ? this.updateVehicle(postData)
        : this.addVehicle(postData);
    }
  }

  // Initialize the vehicleForm with form controls and validators
  initVehicleForm(): void {
    this.vehicleForm = this.formBuilder.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      modelYear: ['', Validators.required],
      vin: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

// Fetch vehicle brands and pre-select if editing existing vehicle
  fetchVehicleBrands(): void {
    this.apiService.get(`${ConstantsService.getVehicleBrands()}`).subscribe({
      next: (result) => {
        this.brandOptions = result;
      },
      error: (err) => {},
      complete: () => {
        if (this.vehicleData) {
          const vehicleBrand = this.brandOptions.find(
            (ele) => ele.name === this.vehicleData.brand
          );
          vehicleBrand?.id ? this.fetchVehicleModels(vehicleBrand.id) : '';
          this.vehicleForm.controls['brand'].setValue(vehicleBrand);
          this.vehicleForm.controls['modelYear'].setValue(
            this.vehicleData.modelYear
          );
          this.vehicleForm.controls['vin'].setValue(this.vehicleData.vin);
          this.vehicleForm.controls['price'].setValue(this.vehicleData.price);
        }
      },
    });
  }

   // Fetch vehicle models and pre-select if editing existing vehicle
  fetchVehicleModels(id: number): void {
    
    this.apiService.get(ConstantsService.getVehicleModels(id)).subscribe({
      next: (result) => {
        this.modelOptions = result;
      },
      error: (err) => {},
      complete: () => {
        if (this.vehicleData) {
          const vehicleModel = this.modelOptions.find(
            (ele) => ele.name === this.vehicleData.model
          );
          this.vehicleForm.controls['model'].setValue(vehicleModel);
        }
      },
    });
  }

   // Add a new vehicle
  addVehicle(postData: Vehicle): void {
    this.apiService
      .post(ConstantsService.postVehicleUrl(), postData)
      .subscribe({
        next: (result) => {
          this.utilityService.snackBarCall(
            `${result.brand} (${result.model})` + ' added',
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

  // Update an existing vehicle
  updateVehicle(putData: Vehicle): void {
    const vehicleId = this.vehicleData.id;
    putData['id'] = this.vehicleData.id;
    this.apiService
      .put(ConstantsService.updateVehicleUrl(vehicleId!), putData)
      .subscribe({
        next: (result) => {
          this.utilityService.snackBarCall('Vehicle Updated', 'Success');
        },
        error: (err) => {
          this.utilityService.snackBarCall(err.message, 'Success');
        },
        complete: () => {
          this.dialogRef.close('refresh');
        },
      });
  }
}
