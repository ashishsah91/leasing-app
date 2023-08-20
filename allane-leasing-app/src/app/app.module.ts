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
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { VehicleComponent } from './components/vehicle/vehicle.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LeasingContractComponent } from './components/leasing-contract/leasing-contract.component';
import { ContractDetailsDialogComponent } from './components/contract-details-dialog/contract-details-dialog.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { ConfirmDeletionDialogComponent } from './components/confirm-deletion-dialog/confirm-deletion-dialog.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ContractOverviewComponent,
    VehicleComponent,
    CustomerComponent,
    LeasingContractComponent,
    ContractDetailsDialogComponent,
    CustomerListComponent,
    ConfirmDeletionDialogComponent,
    VehicleListComponent
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
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
