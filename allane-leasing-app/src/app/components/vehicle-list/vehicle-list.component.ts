import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Vehicle } from 'src/app/models/vehicle.model';
import { ApiService } from 'src/app/services/api.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { VehicleComponent } from '../vehicle/vehicle.component';
import { ConfirmDeletionDialogComponent } from '../confirm-deletion-dialog/confirm-deletion-dialog.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent implements OnInit {
  // Progress spinner properties
  color = ConstantsService.PROGRESS_SPINNER_THEME;
  mode = ConstantsService.PROGRESS_SPINNER_MODE;
  value = ConstantsService.PROGRESS_SPINNER_VALUE;

  // Pagination properties
  page = ConstantsService.PAGE_NUMBER;
  pageSize = ConstantsService.PAGE_SIZE;
  showSpinner: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Table columns and data source
  displayedColumns: string[] = [
    'id',
    'brand',
    'model',
    'modelYear',
    'vin',
    'price',
    'action',
  ];

  dataSource: Vehicle[] = [];
  dialogWidth: string = ConstantsService.DIALOG_WIDTH;

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getVehicles(); // Initialize the component by fetching vehicles
  }

  // Open the vehicle dialog for adding a new vehicle
  openVehicleDialog(): void {
    const dialogRef = this.dialog.open(VehicleComponent, {
      width: this.dialogWidth,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.getVehicles();  // Refresh the vehicle list after dialog close
      }
    });
  }

  // Open the vehicle dialog for editing an existing vehicle
  editVehicle(vehicle: Vehicle): void {
    const dialogRef = this.dialog.open(VehicleComponent, {
      width: this.dialogWidth,
      data: vehicle,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.getVehicles();  // Refresh the vehicle list after dialog close
      }
    });
  }

  // Open the confirmation dialog for deleting a vehicle
  deleteVehicle(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDeletionDialogComponent, {
      width: this.dialogWidth,
      data: {
        deleteUrl: ConstantsService.updateVehicleUrl(id),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.getVehicles(); // Refresh the vehicle list after dialog close
      }
    });
  }

  // Fetch the list of vehicles from the server
  getVehicles(): void {
    this.apiService
      .get(
        `${ConstantsService.getVehiclesUrl()}?page=${this.page}&size=${
          this.pageSize
        }&sort=UNSORTED`
      )
      .subscribe({
        next: (result) => {
          console.log(result);
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

  // Handle pagination page change
  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getVehicles();
  }
}
