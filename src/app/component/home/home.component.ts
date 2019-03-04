import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { NoteService } from 'src/app/core/services/note/note.service';
import { Router } from '@angular/router';
import { Note } from 'src/app/core/model/note';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { DataService } from 'src/app/core/services/DataService/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  panelOpenState = false;
  note:Note;
  dynamicdata:Note;
  constructor(private router: Router, private noteService: NoteService) { }

  ngOnInit() {
    this.readAll()
  }
  
  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
  }

  onArchive() {
    this.router.navigate(['home/archive']) ;
  }

  onThrash() {
    this.router.navigate(['home/trash'])
  }
  notes(){
    this.router.navigate(['home/notelist'])
  }

  readAll() {
    this.noteService.getAll().subscribe((resp: any) => {
      this.dynamicdata=resp
    }, (error) => console.log(error));
  }
}

