import { Injectable } from '@angular/core';
import { HttputilService } from 'src/app/httputil.service';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import {LoggerService} from 'src/app/logger.service'
@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private logger:LoggerService,private route: ActivatedRoute,private router: Router,private httpUtil: HttputilService) { }

  login(user) {
    this.httpUtil.postService(environment.base_url + '/loginuser', user).subscribe(response => {
      console.log(response);
      if (response.status == 200) {
        console.log("logged in");
        localStorage.setItem('Token', response.headers.get('token'));
        this.router.navigate(['/home']);
        
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
        this.logger.log("Successfully Registered");
        console.log("we are here")
        localStorage.setItem('Authorization', response.body.headers);
      }
      else {
        this.logger.error("Please enter the valid details")
        console.log("f**k off")

        console.log(response.body.headers);
      }
    })
  }
}

