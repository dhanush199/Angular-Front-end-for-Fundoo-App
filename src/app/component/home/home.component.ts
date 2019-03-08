import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from 'src/app/core/model/note';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Subject, Observable, observable } from 'rxjs';
import { NoteService } from 'src/app/core/services/NoteService/note.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  public toggleNav: Subject<any> = new Subject();
  panelOpenState = false;
  note: Note;
  dynamicdata: Note;
  public hasThemeChanged = false;
  name = 'Toggle view';

  constructor(private router: Router, private noteService: NoteService) { }

  ngOnInit() {
  }
  public onChangeTheme() {
   this.hasThemeChanged = !this.hasThemeChanged;
  }

  public toggle() {
    this.toggleNav.next();
  }
}

