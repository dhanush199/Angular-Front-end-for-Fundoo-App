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
  panelOpenState = false;
  note: Note;
  dynamicdata: Note;
  constructor(private router: Router, private noteService: NoteService) { }

  ngOnInit() {
    
  }

  public toggleNav: Subject<any> = new Subject();

  public toggle() {
    this.toggleNav.next();
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
  }

  onArchive() {
    this.router.navigate(['home/archive']);
  }

  onThrash() {
    this.router.navigate(['home/trash'])
  }
  notes() {
    this.router.navigate(['home/notelist'])
  }

  readAll() {
    this.noteService.getAll().subscribe((resp: any) => {
      this.dynamicdata = resp
    }, (error) => console.log(error));
  }
}

