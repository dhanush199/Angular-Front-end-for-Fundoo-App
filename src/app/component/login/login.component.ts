import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user/user.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    REGEX_EMAILID = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
    loading = false;
    submitted = false;
    returnUrl: string;
    hide = true;
    myresponse: any;
    // Url to fetch the employee records from the spring application.

    constructor(private route: ActivatedRoute, private Userservice: UserService, private formBuilder: FormBuilder, private router: Router, private _http: HttpClient) { }
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            emailId: ['', [Validators.required, Validators.pattern(this.REGEX_EMAILID)]],
            password: ['', Validators.required]
        });
    };

    get f() { return this.loginForm.controls; }

    onSubmit(user) {
        this.submitted = true;
        console.log(this.loginForm.value)

        if (this.loginForm.invalid) {
            return;

        }
        this.Userservice.login(user)
       
    }
}
