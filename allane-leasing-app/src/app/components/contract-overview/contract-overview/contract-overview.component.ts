import { Component, OnInit } from '@angular/core';
import { ContractOverview } from 'src/app/models/contract-overview.model';

import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-contract-overview',
  templateUrl: './contract-overview.component.html',
  styleUrls: ['./contract-overview.component.css'],
})
export class ContractOverviewComponent implements OnInit {

  displayedColumns: string[] = ['contractId', 'customerName', 'vehicleName', 'vin','monthlyRate','vehiclePrice','action'];
  dataSource:ContractOverview[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
       this.apiService.get('http://localhost:8080/contractoverviews?page=0&size=10&sort=UNSORTED').subscribe((result)=>{
            console.log(result);
            this.dataSource = result.overviewItems;
       })
  }

  showDetails(contract: ContractOverview):void{
     console.log(contract);
  }

}
