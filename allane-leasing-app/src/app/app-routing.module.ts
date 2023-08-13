import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractOverviewComponent } from './components/contract-overview/contract-overview/contract-overview.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { CustomerComponent } from './components/customer/customer.component';

const routes: Routes = [
  {path: 'contract-overview', component:ContractOverviewComponent},
  {path: 'vehicle',component:VehicleComponent},
  {path: 'customer',component:CustomerComponent},
  { path: '**', redirectTo:'/contract-overview', pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
