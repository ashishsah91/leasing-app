import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContractOverview } from 'src/app/models/contract-overview.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contract-details-dialog',
  templateUrl: './contract-details-dialog.component.html',
  styleUrls: ['./contract-details-dialog.component.css']
})
export class ContractDetailsDialogComponent implements OnInit {

  vehicle:Vehicle = {
    id: 0,
    brand: '',
    model: '',
    modelYear: 0,
    vin: '',
    price: 0
  }
  
  customer:any = {};
  contractId!: number;
  monthlyRate!:number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ContractOverview,private apiService:ApiService) { }

  ngOnInit(): void {
    this.contractId = this.data.contractId;
    this.apiService.get("http://localhost:8080/contract/"+this.contractId).subscribe({
      next:(result)=>{
        console.log(result);
        const customerBdayString = this.formatBirthDate(result.customer.birthDate);
        result.customer.birthDate = customerBdayString;
        this.vehicle = result.vehicle;
        this.customer = result.customer;
        this.monthlyRate = result.monthlyRate;
      },
      error:(err)=> {
        console.log(err);
      },
      complete:()=> {
        
      },
    })
    console.log("Contract Details Data: "+ this.data.contractId);
  }

  formatBirthDate(arr: number[]): string {
    return arr.map(value => value.toString().padStart(2, '0')).join('-');
  }

}
