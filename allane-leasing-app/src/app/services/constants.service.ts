import { Injectable } from '@angular/core';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  static readonly SNACK_BAR_DURATION: number = 3;
  static readonly SNACK_HORZ_POS: MatSnackBarHorizontalPosition = 'right';
  static readonly SNACK_VERT_POS: MatSnackBarVerticalPosition = 'top';
  static readonly DIALOG_WIDTH: string = '500px';
  static readonly BASE_URL: string = 'http://localhost:8080';

  static updateCustomerUrl(id: number): string {
    return `${ConstantsService.BASE_URL}/customer/${id}`;
  }

  static postCustomerUrl(): string {
    return `${ConstantsService.BASE_URL}/customer/`;
  }

  constructor() {}
}
