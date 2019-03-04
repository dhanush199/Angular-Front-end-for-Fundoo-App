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
  titl: null
  discriptio: null
  public API = '//localhost:8081/user';
  constructor(private http: HttpClient, private router: Router, private httpUtil: HttputilService) {
  }

  getAll(): Observable<any> {
    var token = localStorage.getItem('token')
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': token
      })
    };
    return this.httpUtil.get(this.API + '/retrievenote', httpheaders)

  }

  public getHeader(): any {
    var token = localStorage.getItem('token')
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return httpheaders;
  }

  save(note) {
    var token = localStorage.getItem('token')
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //application/x-www-form-urlencoded
        'token': token
      })
    };
    this.httpUtil.postWithBody(this.API + '/createnote', note, httpheaders).subscribe(response => {
      console.log(response);
    }, (error) => console.log(error));
  }

  delete(id) {
    var token = localStorage.getItem('token')
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //application/x-www-form-urlencoded
        'token': token
      })
    };
    this.httpUtil.deleteWithParams(this.API + '/delete/' + token, {
      params: {
        noteId: id
      },
      observe: 'response'
    }).subscribe(response => {
      console.log(response);
    }, (error) => console.log(error));
  }

  updateNote(note, noteId) {
    console.log(note)
    var token = localStorage.getItem('token')
    console.log(token)
    this.httpUtil.put(this.API + '/editnote', note, {
      params: {
        noteId: noteId,
        token: token
      },
      observe: 'response'
    }
    ).subscribe(response => {
      console.log(response);
    }, (error) => console.log(error));
  }
}