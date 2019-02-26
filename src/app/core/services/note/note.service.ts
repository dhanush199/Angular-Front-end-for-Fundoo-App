import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttputilService } from 'src/app/httputil.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NoteService {
  notes = [];
  public API = '//localhost:8081/user';

  constructor(private http: HttpClient, private router: Router, private httpUtil: HttputilService) {
  }

  getAll(): Observable<any> {
    var token = localStorage.getItem('token')
     var httpheaders = {
      headers:new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': token
      })
    };
    return this.httpUtil.get(this.API + '/retrievenote',httpheaders )

  }

  get(id: string) {
    return this.http.get(this.API + '/' + id);
  }

  save(note: any): Observable<any> {
    let result: Observable<Object>;
    if (note['href']) {
      result = this.http.put(note.href, note);
    } else {
      result = this.http.post(this.API, note);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
