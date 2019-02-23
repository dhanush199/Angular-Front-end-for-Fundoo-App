import { Component, OnInit, NgModule } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { FormGroup, Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule
  ]
})
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  REGEX_EMAILID = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
  loading = false;
  submitted = false;
  returnUrl: string;
  hide = true;
  myresponse: any;
  constructor(private route: ActivatedRoute, private userService: UserService, private formBuilder: FormBuilder, private router: Router, private _http: HttpClient) { }
  public ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.pattern(this.REGEX_EMAILID)]],
      password: ['', Validators.required]
    });
  };

  get f() { return this.forgotPasswordForm.controls; }
  onSubmit(user) {
    this.submitted = true;
    console.log(this.forgotPasswordForm.value)

    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.userService.forgotPassword(user).subscribe(response => {
      localStorage.setItem('token',response.body.headers)
     // this.onResetPassword(user);
      console.log(response.body.headers);
    }, (error) => console.log(error));
  }

  public onResetPassword(user): void {
    this.userService.resetPassword(user).subscribe(response => { 
    }, (error) => console.log(error));
  }

 }
