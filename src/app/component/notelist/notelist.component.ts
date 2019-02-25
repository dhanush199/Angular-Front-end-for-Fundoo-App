import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/core/services/note/note.service';
import { User } from '../user/user';

@Component({
  selector: 'app-notelist',
  template: `
  <h1>{{title}}</h1>
  <h2>My favorite hero is: {{myHero.name}}</h2>
  <p>Heroes:</p>
  <ul>
    <li *ngFor="let hero of heroes">
      {{ hero.name }}
      </li>
  </ul>
  <p *ngIf="heroes.length > 3">There are many heroes!</p>
`
})
export class NotelistComponent implements OnInit {

    constructor(private noteService: NoteService ,private user:User) { }

    ngOnInit() {

   this.noteService.getAll(this.user);

    }
  }


