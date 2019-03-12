import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/core/services/UserService/user.service';

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
  hide = true;
  constructor(private route: ActivatedRoute, private userService: UserService, private formBuilder: FormBuilder, private router: Router, private _http: HttpClient) { }
  public ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.pattern(this.REGEX_EMAILID)]],
    });
  };

  get f() { return this.forgotPasswordForm.controls; }

  public onSubmit(user) {
    this.submitted = true;
    console.log(this.forgotPasswordForm.value)

    if (this.forgotPasswordForm.invalid) {
      return;
    }
    this.userService.forgotPassword(user).subscribe(response => {
      // localStorage.setItem('token',JSON.stringify(response.body.get('token')));
      // console.log('our token ---->'+localStorage.getItem('token'))
    }, (error) => console.log(error));
  }
}
