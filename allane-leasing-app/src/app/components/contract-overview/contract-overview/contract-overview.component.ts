import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ContractOverview } from 'src/app/models/contract-overview.model';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { ContractDetailsDialogComponent } from '../../contract-details-dialog/contract-details-dialog.component';
import { LeasingContractComponent } from '../../leasing-contract/leasing-contract.component';
import { ConstantsService } from 'src/app/services/constants.service';
import { ConfirmDeletionDialogComponent } from '../../confirm-deletion-dialog/confirm-deletion-dialog.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-contract-overview',
  templateUrl: './contract-overview.component.html',
  styleUrls: ['./contract-overview.component.css'],
})
export class ContractOverviewComponent implements OnInit {

  // Progress spinner configuration constants
  color = ConstantsService.PROGRESS_SPINNER_THEME;
  mode = ConstantsService.PROGRESS_SPINNER_MODE;
  value = ConstantsService.PROGRESS_SPINNER_VALUE;

  // Pagination configuration
  page = ConstantsService.PAGE_NUMBER;
  pageSize = ConstantsService.PAGE_SIZE;

  // Loading spinner flag
  showSpinner: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    // Columns for the Contract Overviews table
    'contractId',
    'customerName',
    'vehicleName',
    'vin',
    'monthlyRate',
    'vehiclePrice',
    'action',
  ];
  dataSource: ContractOverview[] = [];
  dialogWidth: string = ConstantsService.DIALOG_WIDTH;

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getContractOverviews();
  }

  showDetails(contract: ContractOverview): void {
    // Open Contract Details Dialog
    this.dialog.open(ContractDetailsDialogComponent, {
      width: this.dialogWidth,
      data: {
        contractId: contract.contractId,
      },
    });
  }

  openLeasingContractDialog(): void {
    // Open Leasing Contract Dialog
    const dialogRef = this.dialog.open(LeasingContractComponent, {
      width: this.dialogWidth,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.getContractOverviews();
      }
    });
  }

  getContractOverviews(): void {
     // Fetch Contract Overviews using API
    this.apiService
      .get(
        `${ConstantsService.getContractOverviewsUrl()}?page=${this.page}&size=${
          this.pageSize
        }&sort=UNSORTED`
      )
      .subscribe({
        next: (result) => {
          this.dataSource = result.overviewItems;
          this.paginator.length = result.numberOfItems;
        },
        error: (err) => {},
        complete: () => {
          this.showSpinner = false;
        },
      });
  }

  editContract(contract: any): void {
    // Open Leasing Contract Dialog for editing
    const dialogRef = this.dialog.open(LeasingContractComponent, {
      width: this.dialogWidth,
      data: contract,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.getContractOverviews();
      }
    });
  }

  deleteContract(id: number): void {
     // Open Confirm Deletion Dialog for deleting contract
    const dialogRef = this.dialog.open(ConfirmDeletionDialogComponent, {
      width: this.dialogWidth,
      data: {
        deleteUrl: ConstantsService.updateLeasingContractUrl(id),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.getContractOverviews();
      }
    });
  }

  onPageChange(event: PageEvent) {
    // Handle page change event for pagination
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getContractOverviews();
  }
}
