import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractOverviewComponent } from './components/contract-overview/contract-overview/contract-overview.component';
import { LeasingContractComponent } from './components/leasing-contract/leasing-contract.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';

const routes: Routes = [
  {path: 'contract-overview', component:ContractOverviewComponent},
  {path: 'vehicle-list',component:VehicleListComponent},
  {path: 'customer-list',component:CustomerListComponent},
  { path: '**', redirectTo:'/contract-overview', pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
