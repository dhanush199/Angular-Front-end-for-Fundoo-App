import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/core/services/note/note.service';
import { User } from '../user/user';

@Component({
  selector: 'app-notelist',
  templateUrl: './notelist.component.html',
  styleUrls: ['./notelist.component.css']
})
export class NotelistComponent implements OnInit {

    constructor(private noteService: NoteService ,private user:User) { }

    ngOnInit() {

   this.noteService.getAll(this.user);

    }
  }


