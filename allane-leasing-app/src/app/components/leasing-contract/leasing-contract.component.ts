import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Vehicle } from 'src/app/models/vehicle.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-leasing-contract',
  templateUrl: './leasing-contract.component.html',
  styleUrls: ['./leasing-contract.component.css']
})
export class LeasingContractComponent implements OnInit {

  leasingForm!: FormGroup;
  customerOptions:any[] = [];
  vehicleOptions:Vehicle[]=[];
  constructor(private formBuilder: FormBuilder, private apiService:ApiService) { }

  ngOnInit(): void {
    this.leasingForm = this.formBuilder.group({
      monthlyRate: [null, [Validators.required, Validators.min(0)]],
      customer: [null, Validators.required],
      vehicle: [null, Validators.required]
    });

    this.apiService.get("http://localhost:8080/customers?page=0&size=10&sort=UNSORTED").subscribe({
      next:(result)=>{
          console.log(result);
          this.customerOptions = result.overviewItems;
      },
      error:(e)=>{
      },
      complete:()=>{
      } 
    })

    this.apiService.get("http://localhost:8080/vehicles?page=0&size=10&sort=UNSORTED").subscribe({
      next:(result)=>{
          console.log(result);
          this.vehicleOptions = result.overviewItems;
      },
      error:(e)=>{
      },
      complete:()=>{
      } 
    })
  }

  onSubmit() {
    if (this.leasingForm.valid) {
      const formData = this.leasingForm.value;
      const customerBdayString = this.formatBirthDate(formData.customer.birthDate);
      formData.customer.birthDate = customerBdayString;

      this.apiService.post('http://localhost:8080/contract',formData).subscribe({
        next(result) {
            console.log(result);
        },
        error(err) {
           console.log(err);
        },
        complete() {
        },
      })
      
    }
  }

  formatBirthDate(arr: number[]): string {
    return arr.map(value => value.toString().padStart(2, '0')).join('-');
  }

}
