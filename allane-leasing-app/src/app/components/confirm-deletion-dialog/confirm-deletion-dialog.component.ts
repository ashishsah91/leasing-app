import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-confirm-deletion-dialog',
  templateUrl: './confirm-deletion-dialog.component.html',
  styleUrls: ['./confirm-deletion-dialog.component.css']
})
export class ConfirmDeletionDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  // Inject the data passed to the dialog
              private apiService:ApiService,
              private utilityService:UtilityService,
              private dialogRef: MatDialogRef<ConfirmDeletionDialogComponent>) { }

  ngOnInit(): void {}

  // Function to delete the entity
  deleteEntity(){
    const url = this.data.deleteUrl;
    // Send a DELETE request to the API
    this.apiService.delete(url).subscribe({
        next:(result)=>{
          // Show a success snackbar message
          this.utilityService.snackBarCall("Deleted","Success");
        },
        error:(error)=>{
          // Show an error snackbar message
          this.utilityService.snackBarCall(error.message,"Failure");
        },
        complete:()=>{
          // Close the dialog and signal parent component to refresh
          this.dialogRef.close("refresh");
        }
    })
  }

}
