import { Injectable } from '@angular/core';
import { HttputilService } from './httputil.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  public API = '//localhost:8081/user';
  constructor(private http: HttputilService) { }

  getLabels() {
    var token = localStorage.getItem('token')
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': token
      })
    };
    return this.http.get(this.API+'/retrievelabel', httpheaders);
  }

  deleteLabel() {
    var token = localStorage.getItem('token')
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': token
      })
    };
    return this.http.get(this.API+'/deletelabel', httpheaders);
  }
}
