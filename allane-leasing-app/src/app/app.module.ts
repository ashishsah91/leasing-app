import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContractOverviewComponent } from './components/contract-overview/contract-overview/contract-overview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'; 
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


import { VehicleComponent } from './components/vehicle/vehicle.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LeasingContractComponent } from './components/leasing-contract/leasing-contract.component';


@NgModule({
  declarations: [
    AppComponent,
    ContractOverviewComponent,
    VehicleComponent,
    CustomerComponent,
    LeasingContractComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
