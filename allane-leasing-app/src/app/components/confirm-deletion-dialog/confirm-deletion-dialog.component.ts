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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private apiService:ApiService,
              private utilityService:UtilityService,
              private dialogRef: MatDialogRef<ConfirmDeletionDialogComponent>) { }

  ngOnInit(): void {
  }

  deleteEntity(){
    console.log("here is the url "+ this.data.deleteUrl);
    const url = this.data.deleteUrl;
    this.apiService.delete(url).subscribe({
        next:(result)=>{
          console.log(result);
          this.utilityService.snackBarCall("Deleted","Success");
        },
        error:(error)=>{
          this.utilityService.snackBarCall(error.message,"Failure");
        },
        complete:()=>{
          this.dialogRef.close("refresh");
        }
    })
  }

}
