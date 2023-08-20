import { Injectable } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
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
  static readonly PAGE_NUMBER:number = 0;
  static readonly PAGE_SIZE:number = 10;
  static readonly PROGRESS_SPINNER_MODE:ProgressSpinnerMode = 'indeterminate';
  static readonly PROGRESS_SPINNER_VALUE:number = 10;
  static readonly PROGRESS_SPINNER_THEME:ThemePalette = 'primary'



  static getCustomersUrl():string{
    return `${ConstantsService.BASE_URL}/customers/`;
  }

  static updateCustomerUrl(id: number): string {
    return `${ConstantsService.BASE_URL}/customer/${id}`;
  }

  static postCustomerUrl(): string {
    return `${ConstantsService.BASE_URL}/customer/`;
  }

  static getVehiclesUrl():string{
    return `${ConstantsService.BASE_URL}/vehicles/`;
  }

  static updateVehicleUrl(id: number): string {
    return `${ConstantsService.BASE_URL}/vehicle/${id}`;
  }

  static postVehicleUrl(): string {
    return `${ConstantsService.BASE_URL}/vehicle/`;
  }

  static getContractOverviewsUrl():string{
    return `${ConstantsService.BASE_URL}/contractoverviews/`;
  }

  static postLeasingContractUrl(): string {
    return `${ConstantsService.BASE_URL}/contract/`;
  }

  static updateLeasingContractUrl(id: number): string {
    return `${ConstantsService.BASE_URL}/contract/${id}`;
  }

  static getVehicleBrands(): string {
    return `${ConstantsService.BASE_URL}/brands/`;  
  }

  static getVehicleModels(id:number): string {
    return `${ConstantsService.BASE_URL}/brand/${id}/models`;  
  }


  



  constructor() {}
}
