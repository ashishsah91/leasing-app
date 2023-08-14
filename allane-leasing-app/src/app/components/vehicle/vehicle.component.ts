import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Brand } from 'src/app/models/brand.model';
import { BrandModel } from 'src/app/models/brandModel.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  leasingForm!: FormGroup;
  brandOptions:Brand[] = []; 
  modelOptions:BrandModel[] = []; 

  constructor(private formBuilder: FormBuilder,private apiService: ApiService) { }

  ngOnInit(): void {
    
    this.leasingForm = this.formBuilder.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      modelYear: ['', Validators.required],
      vin: ['', Validators.required],
      price: ['', Validators.required],
    });

    this.apiService.get("http://localhost:8080/brands").subscribe(result=>{
      console.log(result);
      this.brandOptions = result;
      console.log(this.brandOptions);
    })

  }


  onBrandSelected(event: any) {
    const selectedBrandId: number = event.value.id;
    const url = "http://localhost:8080/brand/"+selectedBrandId+"/models";
    this.apiService.get(url).subscribe(result=>{
      console.log(result);
      this.modelOptions = result
    })
    console.log('Selected Brand ID:', selectedBrandId);
  }

  onSubmit(): void {
    if (this.leasingForm.valid) {
      console.log(this.leasingForm.value);
      const formObject = this.leasingForm.value;
      const postData = {'brand':formObject.brand.name,'model':formObject.model.name,'modelYear':formObject.modelYear,'vin':formObject.vin,'price':formObject.price};
      
      this.apiService.post('http://localhost:8080/vehicle',postData).subscribe({
                          next:(result)=>{
                            console.log(result);
                          },
                          error:(error)=>{
                            console.log(error);
                          },
                          complete:()=>{
                          }})                                       
    }
  }

}
