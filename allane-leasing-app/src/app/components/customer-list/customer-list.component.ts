import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ApiService } from 'src/app/services/api.service';
import { CustomerComponent } from '../customer/customer.component';
import { UtilityService } from 'src/app/services/utility.service';
import { ConfirmDeletionDialogComponent } from '../confirm-deletion-dialog/confirm-deletion-dialog.component';
import { ConstantsService } from 'src/app/services/constants.service';
import { Customer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'birthDate',
    'action',
  ];
  dataSource: Customer[] = [];
  dialogWidth: string = ConstantsService.DIALOG_WIDTH;

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  openCustomerDialog(): void {
    const dialogRef = this.dialog.open(CustomerComponent, {
      width: this.dialogWidth,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.getCustomers();
      }
    });
  }

  editCustomer(customer: Customer): void {
     const dialogRef = this.dialog.open(CustomerComponent, {
      width: this.dialogWidth,
      data:customer
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.getCustomers();
      }
    });

  }

  deleteCustomer(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDeletionDialogComponent, {
      width: this.dialogWidth,
      data: {
        deleteUrl: ConstantsService.updateCustomerUrl(id),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.getCustomers();
      }
    });
  }

  // Get the list of existing customers from the server//
  getCustomers() {
    this.apiService
      .get('http://localhost:8080/customers/?page=0&size=10&sort=UNSORTED')
      .subscribe({
        next: (result) => {
          this.dataSource = result.overviewItems;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {},
      });
  }
}
