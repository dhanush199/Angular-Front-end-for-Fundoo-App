import { Injectable } from '@angular/core';
import { HttputilService } from 'src/app/httputil.service';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private route: ActivatedRoute, private router: Router, private httpUtil: HttputilService) { }

  public getHeader() {
    let token = localStorage.getItem('token')
    const httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return httpheaders;
  }
  
  public login(user) {
    return this.httpUtil.post(environment.base_url + '/loginuser', user);
  }

  public register(user) {
   return this.httpUtil.post(environment.base_url + '/registeruser', user);

  }

  public forgotPassword(user): Observable<any> {
    return this.httpUtil.post(environment.base_url + '/forgotpassword', user);
  }

  public resetPassword(user, id) {
    return this.httpUtil.put(environment.base_url + '/resetpassword/' + id, user, id);
  }

  public getUser(): Observable<any> {
    let token = localStorage.getItem('token')
    return this.httpUtil.get(environment.base_url + '/get-user/' + token, {});
  }

  public updateUser(user) {
    return this.httpUtil.post(environment.base_url + '/updateuser',user)
  }

  public getCollUser(){
    let token=localStorage.getItem('token')
    return this.httpUtil.get(environment.base_url +'/get-all-user/'+token,{})
  }


  public getCollUserId(emailId){
    let header=this.getHeader()
    return this.httpUtil.get(environment.base_url +'/get-coll-user/'+emailId,header)
  }


}
