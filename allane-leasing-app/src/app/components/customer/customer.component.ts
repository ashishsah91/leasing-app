import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  userForm!: FormGroup ;
  constructor(private formBuilder: FormBuilder) { }

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
      console.log('Submitted User Data:', userData);
    }
  }

}
