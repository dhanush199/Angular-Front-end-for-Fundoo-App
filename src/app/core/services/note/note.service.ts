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
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': token
      })
    };
    return this.httpUtil.get(this.API + '/retrievenote', httpheaders)

  }
  update(id,title, discription) {
    var Usertoken = localStorage.getItem('token')
    var note = {
      "title": title,
      "discription": discription,
    }
    console.log(id)
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //application/x-www-form-urlencoded
        'token': Usertoken
      })
    };
    this.httpUtil.put(this.API + '/editnote/'+Usertoken,note,{
      params: {
        noteId: id,
        token:localStorage.getItem('token'),
      },
      observe: 'response'
    }).subscribe(response => {
      console.log(response);
    }, (error) => console.log(error));
  }
//   public getHeader():  any {
//     var token = localStorage.getItem('token')
//     var httpheaders = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'token': token
//       })
//     };  
//     return httpheaders;
// }

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

  delete(title) {
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
        title: title
      },
      observe: 'response'
    }).subscribe(response => {
      console.log(response);
    }, (error) => console.log(error));
  }
}