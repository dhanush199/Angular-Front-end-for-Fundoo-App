import { Injectable } from '@angular/core';
import { HttputilService } from 'src/app/httputil.service';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private route: ActivatedRoute, private router: Router, private httpUtil: HttputilService) { }

  login(user) {
    this.httpUtil.post(environment.base_url + '/loginuser', user).subscribe(response => {
      console.log(response);
      localStorage.setItem('token', response.headers.get('token'));
      this.router.navigate(['/home']);
    }, (error) => console.log(error));
  }

  register(user) {
    this.httpUtil.post(environment.base_url + '/registeruser', user).subscribe(response => {
    }, (error) => console.log(error));

  }

  forgotPassword(user) {
    return this.httpUtil.post(environment.base_url + '/forgotpassword', user);
  }

  resetPassword(user,id) {
    return this.httpUtil.put(environment.base_url+'/resetpassword/'+id, user,id);
  }
}
