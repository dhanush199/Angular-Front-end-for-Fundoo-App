import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UserService } from 'src/app/core/services/UserService/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, 
    private router: Router,private userService: UserService) {
  }
  public id = this.activatedRoute.snapshot.params.id;


  public ngOnInit() {
  }

  password = new FormControl('', [Validators.required, Validators.minLength(6)]); //Password validation
  repeatPassword = new FormControl('', [Validators.required, Validators.minLength(6)]); //repeat passwo

  /**
   * @description Getting password error message
   */
  public getPasswordErrorMessage() {
    return this.password.hasError('required') ? "Can't be empty" :
      this.password.hasError('minlength') ? 'Minimum 6 characters' : 
        '';
  }

  /**
   * @description Getting confirm password error message
   */
  public getPasswordMatch() {
      return this.repeatPassword.hasError('required') ? "'Can't be empty" :
        this.repeatPassword.hasError('minlength') ? 'Minimum 6 characters' :
         '';
  }
  /**
   * @description Checking if the entered password and repeat password is same or not then calling api 
   * @param password 
   * @param repeatPassword 
   */
  public confirmPassword (password, repeatPassword) {
    console.log(password == repeatPassword);
    var tokenObject = {};
    if(password == repeatPassword){
      this.activatedRoute.params.subscribe((params: Params) => {
        var token = params['token'];
        console.log(token);
        tokenObject = {
          "token":token,
          "password":password
        }
      });
      this.userService.resetPassword(tokenObject, 'reset').subscribe((data:any) => {
        console.log(data);
        this.router.navigate(['']);
      })
    }
  }

}
