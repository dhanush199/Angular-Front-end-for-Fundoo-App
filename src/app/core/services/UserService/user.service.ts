import { Injectable } from '@angular/core';
import { HttputilService } from 'src/app/httputil.service';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private route: ActivatedRoute, private router: Router, private httpUtil: HttputilService) { }

  public login(user) {
    this.httpUtil.post(environment.base_url + '/loginuser', user).subscribe(response => {
      console.log(response);
      localStorage.setItem('token', response.headers.get('token'));
      this.router.navigate(['/home']);
    }, (error) => console.log(error));
  }

  public register(user) {
    this.httpUtil.post(environment.base_url + '/registeruser', user).subscribe(response => {
    }, (error) => console.log(error));

  }

  public forgotPassword(user): Observable<any> {
    return this.httpUtil.post(environment.base_url + '/forgotpassword', user);
  }

  public resetPassword(user, id) {
    return this.httpUtil.put(environment.base_url + '/resetpassword/' + id, user, id);
  }

  public getUser(): Observable<any> {
    var token = localStorage.getItem('token')
    return this.httpUtil.get(environment.base_url + '/get-user/' + token, 1);
  }

  public updateUser(user) {
    return this.httpUtil.post(environment.base_url + '/updateuser',user)
  }

  // public getCollEmails(){
  //   var token=localStorage.getItem('token')
  //   return this.httpUtil.get(environment.base_url +'/get-all-user/'+token,1)
  // }

  public getCollUser(){
    var token=localStorage.getItem('token')
    return this.httpUtil.get(environment.base_url +'/get-all-user/'+token,1)
  }
}
