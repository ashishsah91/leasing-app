import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ApiService } from 'src/app/services/api.service';
import { CustomerComponent } from '../customer/customer.component';
import { UtilityService } from 'src/app/services/utility.service';
import { ConfirmDeletionDialogComponent } from '../confirm-deletion-dialog/confirm-deletion-dialog.component';
import { ConstantsService } from 'src/app/services/constants.service';
import { Customer } from 'src/app/models/customer.model';

import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  
  // Define constants for spinner
  color = ConstantsService.PROGRESS_SPINNER_THEME;
  mode = ConstantsService.PROGRESS_SPINNER_MODE;
  value = ConstantsService.PROGRESS_SPINNER_VALUE;

  // Pagination configuration
  page = ConstantsService.PAGE_NUMBER;
  pageSize = ConstantsService.PAGE_SIZE;
  showSpinner: boolean = true;

  // Access paginator using ViewChild
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
    // Open dialog to add a new customer
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
    // Open dialog to edit an existing customer
    const dialogRef = this.dialog.open(CustomerComponent, {
      width: this.dialogWidth,
      data: customer,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.getCustomers();
      }
    });
  }

  deleteCustomer(id: number): void {
     // Open dialog to confirm customer deletion
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
      .get(
        `${ConstantsService.getCustomersUrl()}?page=${this.page}&size=${
          this.pageSize
        }&sort=UNSORTED`
      )
      .subscribe({
        next: (result) => {
          this.dataSource = result.overviewItems;
          this.paginator.length = result.numberOfItems;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.showSpinner = false;
        },
      });
  }

  // Handle page change event
  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getCustomers();
  }
}
