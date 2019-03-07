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

  getHeader() {
    var token = localStorage.getItem('token')
    const httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return httpheaders;
  }

  getAll(): Observable<any> {
    var header=this.getHeader()
    return this.httpUtil.get(this.API + '/retrievenote', header)

  }

  save(note) {
    var header=this.getHeader()
    this.httpUtil.postWithBody(this.API + '/createnote', note, header).subscribe(response => {
      console.log(response);
    }, (error) => console.log(error));
  }

  delete(id) {
    var header=this.getHeader()
    this.httpUtil.deleteWithParams(this.API + '/delete/' + header, {
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