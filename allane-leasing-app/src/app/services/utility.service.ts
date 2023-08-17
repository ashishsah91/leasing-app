import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  
  constructor(private _snackBar: MatSnackBar) {}

  snackBarCall(msg: string, type: string) {
    this._snackBar.open(msg, type, {
      duration: ConstantsService.SNACK_BAR_DURATION * 1000,
      horizontalPosition: ConstantsService.SNACK_HORZ_POS,
      verticalPosition: ConstantsService.SNACK_VERT_POS,
    });
  }

  dateToYYYYMMDD(date: Date): string {
    const isoDateString = date.toISOString();
    return isoDateString.substring(0, 10);
  }
}
