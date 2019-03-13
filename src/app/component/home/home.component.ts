import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Note } from 'src/app/core/model/note';
import { Subject } from 'rxjs';
import { NoteService } from 'src/app/core/services/NoteService/note.service';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/data.service';
import { UserService } from 'src/app/core/services/UserService/user.service';
import { User } from 'src/app/core/model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  dynamicdata: Note;
  @Output() toggle = new EventEmitter();
  public toggleNav: Subject<any> = new Subject();
  public btnClick: Subject<any> = new Subject();
  notes: Note[]
  user: User
  searchData = {
    data: ''
  };

  constructor(private userService: UserService, private data: DataServiceService, private router: Router, private noteService: NoteService) { }

  public ngOnInit() {
    this.readAll()
    this.getUser()
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
    this.router.navigate(['home', 'search']);
  }

  public onStatusChanged(finished: Boolean) {
    if (finished) {
      this.data.searchData(this.searchData.data);
    }
  }

  uploadPhoto() {
    this.router.navigate(['upload-photo'])
  }

  getUser() {
    this.userService.getUser().subscribe((resp) => {
      this.user=resp
      console.log( this.user)
    }, (error) => {
      console.log(error)

    })
  }

}

