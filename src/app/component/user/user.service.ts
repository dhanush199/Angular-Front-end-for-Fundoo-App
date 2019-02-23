import { Injectable } from '@angular/core';
import { HttputilService } from 'src/app/httputil.service';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { LoggerService } from 'src/app/logger.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor( private logger: LoggerService, private route: ActivatedRoute, private router: Router, private httpUtil: HttputilService) { }

  login(user) {
    this.httpUtil.postService(environment.base_url + '/loginuser', user).subscribe(response => {
      console.log(response);
      localStorage.setItem('Token', response.headers.get('token'));
      this.router.navigate(['/home']);
    }, (error) => console.log(error));
  }

  register(user) {
    this.httpUtil.postService(environment.base_url + '/registeruser', user).subscribe(response => {
      this.logger.log("Successfully Registered");
      localStorage.setItem('token', response.body.headers);
    }, (error) => console.log(error));

  }

  forgotPassword(user) {
    return this.httpUtil.postService(environment.base_url + '/forgotpassword', user);
  }

  resetPassword(user) {
    const token = localStorage.getItem("token");
    // if (token) {
    //   const cloned = this.req.clone({
    //     headers: this.req.headers.set("token", token)
    //   });
    return this.httpUtil.postService('/resetpassword', user);
  }
}
