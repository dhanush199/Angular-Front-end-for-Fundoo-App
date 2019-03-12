import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Note } from 'src/app/core/model/note';
import { Subject} from 'rxjs';
import { NoteService } from 'src/app/core/services/NoteService/note.service';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit{
  
  dynamicdata: Note;
  @Output() toggle = new EventEmitter();
  public toggleNav: Subject<any> = new Subject();
  public btnClick: Subject<any> = new Subject();
  notes:Note[]
  searchData = {
    data:''
  };
  
  constructor(private data:DataServiceService,private router:Router,private noteService:NoteService){}

  public ngOnInit(){
    this.readAll()
    console.log(this.searchData.data);
  }

  public readAll() {
    this.noteService.getAll().subscribe((resp: any) => {
      this.notes = resp
      // console.log(resp)
    }, (error) => console.log(error));
  }
  
  public toggleOnClick() {
    // this.toggle.emit();
    // this.haToggle = !this.haToggle;
    this.toggleNav.next();
  }

  public toggleSide() {
    this.toggleNav.next();
  }

  public searchState() {
    this.router.navigate(['home','search']);
  }

  public onStatusChanged(finished: Boolean) {
    if(finished) {
      this.data.searchData(this.searchData.data);
    }
  }



}

