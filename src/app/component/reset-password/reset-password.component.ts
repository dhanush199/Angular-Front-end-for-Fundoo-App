import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user/user.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private userService: UserService) {
  }
  debugger=true;
  public id = this.route.snapshot.params.id;

  ngOnInit() {
  this.resetPasswordForm = this.formBuilder.group({
    password: ['', Validators.required]
  });
  };
  onSubmit(user) {
    console.log(this.resetPasswordForm.value)
    this.userService.resetPassword(user, this.id).subscribe(response => {
    }, (error) => console.log(error));
  }
}


