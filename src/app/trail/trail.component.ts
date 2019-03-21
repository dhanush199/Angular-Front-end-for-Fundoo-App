import { Component, OnInit } from '@angular/core';
import { NoteService } from '../core/services/NoteService/note.service';

@Component({
  selector: 'app-trail',
  templateUrl: './trail.component.html',
  styleUrls: ['./trail.component.scss']
})
export class TrailComponent implements OnInit{
  colors = ['CYAN', 'GREEN', 'YELLOW'];
  myColor = '';
  products;
  constructor(private noteService:NoteService){

  }
  public ngOnInit() {
    this.readAll()
  }

  public readAll() {
    this.noteService.getAll().subscribe((resp: any) => {
      this.products = resp;
    }, (error) => console.log(error));
  }
}
