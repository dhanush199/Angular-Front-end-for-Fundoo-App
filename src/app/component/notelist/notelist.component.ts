import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from 'src/app/core/services/note/note.service';
import { DataService } from 'src/app/core/services/DataService/data.service';
import { Note } from 'src/app/core/model/note';
import { HttpClient } from 'selenium-webdriver/http';
import { HttputilService } from 'src/app/httputil.service';

@Component({
  selector: 'app-notelist',
  templateUrl: 'notelist.component.html'

})
export class NotelistComponent implements OnInit {

  @Input() view: boolean;

  pinnedNotes = [];
  private products: [];
  enterExpression = true;
  expression = false;
  value;
  pinned = false;
  raw_data;
  // public products  = [];   // private data: DataService
  constructor(private service: NoteService) { }
  ngOnInit() {
    this.readAll();

  }

  // childStatusChanged(finished: boolean) {
  //   if (finished) {
  //     this.readAll();
  //   }
  // }
  /////////////////////////////////////////
  readAll() {
    // this.pinnedNotes = [];
    // this.pinned = false;
    //(data: any[])
    this.service.getAll().subscribe((data: any) => {
      console.log(data);
      this.products = data;
      console.log(this.products)
    }, (error) => console.log(error));
  }
}


