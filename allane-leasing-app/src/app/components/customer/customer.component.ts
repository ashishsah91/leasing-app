import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  userForm!: FormGroup ;
  constructor(private formBuilder: FormBuilder,private apiService: ApiService) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthdate: [null, Validators.required]
    });
  }

  onSubmit() {
    
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      const originalDate = new Date(userData.birthdate);
      const birthdate = this.dateToYYYYMMDD(originalDate);
      const postData = {birthDate:birthdate,firstName:userData.firstName,lastName:userData.lastName}
      this.apiService.post('http://localhost:8080/customer',postData).subscribe({
        next:(result)=>{
        console.log(result);
        },
        error:(error)=>{
        console.log("here in error");
        console.log(error);
        },
        complete:()=>{

        }})
    }
  }

  dateToYYYYMMDD(date: Date): string {
    const isoDateString = date.toISOString();
    return isoDateString.substring(0, 10);
  }

}
