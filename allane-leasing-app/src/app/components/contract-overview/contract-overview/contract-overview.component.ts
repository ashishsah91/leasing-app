import { Component, Inject, OnInit } from '@angular/core';
import { ContractOverview } from 'src/app/models/contract-overview.model';
import {MatDialog} from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { ContractDetailsDialogComponent } from '../../contract-details-dialog/contract-details-dialog.component';


@Component({
  selector: 'app-contract-overview',
  templateUrl: './contract-overview.component.html',
  styleUrls: ['./contract-overview.component.css'],
})
export class ContractOverviewComponent implements OnInit {

  displayedColumns: string[] = ['contractId', 'customerName', 'vehicleName', 'vin','monthlyRate','vehiclePrice','action'];
  dataSource:ContractOverview[] = [];
  constructor(private apiService: ApiService,private dialog: MatDialog) { }

  ngOnInit(): void {
       this.apiService.get('http://localhost:8080/contractoverviews?page=0&size=10&sort=UNSORTED').subscribe((result)=>{
            console.log(result);
            this.dataSource = result.overviewItems;
       })
  }

  showDetails(contract: ContractOverview):void{
     console.log(contract);
     this.dialog.open(ContractDetailsDialogComponent, {
        width:'500px',
        data:{
          contractId:contract.contractId
        }
    });
  }

}



