import { Injectable } from '@angular/core';
import { HttputilService } from 'src/app/httputil.service';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private route: ActivatedRoute,private router: Router,private httpUtil: HttputilService) { }

  login(user) {
    this.httpUtil.postService(environment.base_url + '/loginuser', user).subscribe(response => {
      console.log(response);
      if (response.status == 200) {
        console.log("logged in");
        localStorage.setItem('Token', response.headers.get('token'));
        this.router.navigate(['/home']);
        console.log("hai");
      }
      else {
        console.log(response.body.headers);
      }
    });
  }

  register(user) {
    this.httpUtil.postService(environment.base_url+'/registeruser', user).subscribe(response => {
      console.log(response);
      if (response.status == 200) {
        console.log(response.body.header);
       
        localStorage.setItem('Authorization', response.body.headers);
      }
      else {
        console.log(response.body.headers);
      }
    })
  }
}

