import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/core/services/UserService/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html'

})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    REGEX_EMAILID = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
    loading = false;
    submitted = false;
    returnUrl: string;
    hide = true;
    myresponse: any;
    constructor(private route: ActivatedRoute, private Userservice: UserService,private snackBar:MatSnackBar,
         private formBuilder: FormBuilder, private router: Router, private _http: HttpClient) { }
    public ngOnInit() {
        this.loginForm = this.formBuilder.group({
            emailId: ['', [Validators.required, Validators.pattern(this.REGEX_EMAILID)]],
            password: ['', Validators.required]
        });
    };

    get f() { return this.loginForm.controls; }

    public onSubmit(user) {
        this.submitted = true;
        console.log(this.loginForm.value)
        if (this.loginForm.invalid) {
            return;
        }
        this.Userservice.login(user).subscribe(response => {
            console.log(response);
            localStorage.setItem('token', response.headers.get('token'));
            this.router.navigate(['/home']);
          }, (error) => {
            this.snackBar.open("invalid user details", "Ok", {
                duration: 2000,
            });console.log(error)});
    }
}
