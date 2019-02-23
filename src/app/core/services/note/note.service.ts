import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs'; 
import { HttpClient } from '@angular/common/http';
import { HttputilService } from 'src/app/httputil.service';
import { Router, ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  public API = '//localhost:8080';
  public NOTE_API = this.API + '/user';

  constructor(private http: HttpClient,private router:Router,private httpUtil:HttputilService) {
  }
  token='';
  getAll(token): Observable<any> {
    this.httpUtil.postService(this.NOTE_API + '/retrievenote', token).subscribe(response => {
      console.log(response);
      if (response.status == 200) {
        console.log("logged in");
        localStorage.setItem('Token', response.headers.get('token'));
      }
      else {
        console.log(response.body.headers);
      }
    });
   
    return this.http.get(this.API + '/retrievenote');
  }

  get(id: string) {
    return this.http.get(this.NOTE_API + '/' + id);
  }

  save(note: any): Observable<any> {
    let result: Observable<Object>;
    if (note['href']) {
      result = this.http.put(note.href, note);
    } else {
      result = this.http.post(this.NOTE_API, note);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
