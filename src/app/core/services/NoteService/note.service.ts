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

  public getHeader() {
    var token = localStorage.getItem('token')
    const httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return httpheaders;
  }

  public getAll(): Observable<any> {
    var header = this.getHeader();
    return this.httpUtil.get(this.API + '/retrievenote', header)

  }

  public save(note) {
    var header = this.getHeader();
   return this.httpUtil.postWithBody(this.API + '/createnote', note, header)
  }

  public delete(id) {
    var header = this.getHeader();
    return this.httpUtil.delete(this.API + '/delete/' + id, header);
  }

  public updateNote(note, noteId) {
    var token = localStorage.getItem('token')
    return this.httpUtil.put(this.API + '/editnote', note, {
      params: {
        noteId: noteId,
        token: token
      }, observe: 'response'})
  }

  public doCollab(collabUser){
    var token=localStorage.getItem('token')
    return this.httpUtil.put(this.API +'/add-collabarator/'+token,collabUser,{})
  }

  public removeCollab(collabUser){
    var token=localStorage.getItem('token')
    return this.httpUtil.put(this.API +'/remove-collabarator/'+token,collabUser,{})
  }

}