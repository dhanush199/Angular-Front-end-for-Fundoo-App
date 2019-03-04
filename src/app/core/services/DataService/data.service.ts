import { Injectable, EventEmitter } from '@angular/core';
import { NoteService } from '../note/note.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { HttputilService } from 'src/app/httputil.service';
import { Note } from '../../model/note';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  note:Note
  public API = '//localhost:8081/user';
  constructor(private noteservice:NoteService,private httpUtil:HttputilService) { }

  readAll() {
    this.noteservice.getAll().subscribe((resp: any) => {
      this.note=resp
      console.log(resp)
    }, (error) => console.log(error));
  }
}
