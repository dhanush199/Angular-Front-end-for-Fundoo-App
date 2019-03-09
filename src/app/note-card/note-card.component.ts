import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../core/model/note';
import { DataServiceService } from '../data.service';
import { NoteService } from '../core/services/NoteService/note.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent implements OnInit {
@Input()search ;
@Input() view:boolean;
notes = []

  constructor(private data:DataServiceService,private service:NoteService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.view = message)
    this.data.currentDataSearch.subscribe((search:any) => {
      this.search = search
    })
    this.readAll();
  }

  readAll() {
    this.notes = [];
    this.service.getAll().subscribe((resp: any) => {
      this.notes = resp;
    })
  }
}