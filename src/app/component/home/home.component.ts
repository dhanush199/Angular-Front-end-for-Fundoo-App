import { Component, OnInit, Input, EventEmitter, Output, Inject } from '@angular/core';
import { Note } from 'src/app/core/model/note';
import { Subject } from 'rxjs';
import { NoteService } from 'src/app/core/services/NoteService/note.service';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/core/services/Data-service/data.service';
import { UserService } from 'src/app/core/services/UserService/user.service';
import { User } from 'src/app/core/model/user';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  dynamicdata: Note;
  grid=false

  @Output() toggle = new EventEmitter();
  public toggleNav: Subject<any> = new Subject();
  public btnClick: Subject<any> = new Subject();
  notes: Note[];
  user: User;
  picture: any;
  userName:string;
  view=false;
  
  searchData = {
    data: ''
  };

  constructor(private userService: UserService,
  public dataservice:DataServiceService,private sanitizer: DomSanitizer,private router: Router, private noteService: NoteService) { }

  public ngOnInit() {
    this.readAll()
    this.getUser()
    console.log(this.searchData.data);
  }

  public readAll() {
    this.noteService.getAll().subscribe((resp: any) => {
      this.notes = resp
    }, (error) => console.log(error));
  }

  public toggleOnClick() {
    this.toggleNav.next();
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  public toggleSide() {
    this.toggleNav.next();
  }

  public searchState() {
    this.router.navigate(['home', 'search']);
  }

  public onStatusChanged(finished: Boolean) {
    if (finished) {
      this.dataservice.searchData(this.searchData.data);
    }
  }

  public uploadPhoto() {
    this.router.navigate(['upload-photo'])
  }

  public getUser() {
    this.userService.getUser().subscribe((resp) => {
      this.user = resp;
      this.userName=resp.name
      this.user = {
        ...resp,
        image: `data:image/text;base64, ${resp.image}`,
      };
      const url = `data:${resp.contentType};base64,${resp.image}`;
      this.picture = {
        imageSrc: this.sanitizer.bypassSecurityTrustUrl(url)
      }
    }, (error) => {
      console.log(error);
    })
  }

  toggleView(){
     this.view=!(this.view);
    this.dataservice.changeMessage(this.view);
  }

  public viewGrid() {
    this.grid = !this.grid;
    this.dataservice.setTheme(this.grid);
  }

  public refreshPage(){
    this.router.navigate(['home'])
  }

}