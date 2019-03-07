import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/UserService/user.service';


@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    REGEX_USERNAME = "[a-zA-Z ]*$";
    REGEX_EMAILID = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
    REGEX_MOBILENUMBER = "^[0-9]{10}$";
    REGEX_PASSWORD = "^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])[a-zA-Z0-9@#$%^&+=]*$";
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor( 
        private formBuilder: FormBuilder,
        private router: Router,private Userservice:UserService) { }

    ngOnInit() {

        this.registerForm = this.formBuilder.group({
            emailId: ['', [Validators.required, Validators.pattern(this.REGEX_EMAILID)]],
            mobileNumber: ['', [Validators.required, Validators.pattern(this.REGEX_MOBILENUMBER)]],
            name: ['', [Validators.required, Validators.pattern(this.REGEX_USERNAME)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
    

        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit(user) {
        this.submitted = true;

      

        // stop here if form is invalid
        // if (this.registerForm.invalid) {
        //     return;
        // }

        this.loading = true;
        this.Userservice.register(user);
    }
  
}