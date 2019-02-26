import { Component, OnInit, Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatSidenav, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from './core/services/DataService/data.service';
import { NoteService } from './core/services/note/note.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


    @ViewChild(MatSidenav) sidenav: MatSidenav;
    events: string[] = [];
    opened: boolean = true;


     changeborder() {
      document.getElementById("txtsearch").style.borderColor = "black";
    }
  }
// export class AppComponent implements OnInit {

//   @Input() view:boolean;

//   pinnedNotes = [];
//   notes = [];
//   enterExpression = true;
//   expression = false;
//   value;
//   pinned = false;
//   raw_data;
//   constructor(private service: NoteService,private data:DataService) { }

//   ngOnInit() {
//     this.data.currentMessage.subscribe((message:any) => {
//       this.view = message 
//     })
//     this.readAll();
//   }

//   childStatusChanged(finished: boolean) {
//     if (finished){
//       this.readAll();
//     }
//   }

//   readAll(){
//     this.notes = [];
//     this.pinnedNotes = [];
//     this.pinned = false;
//     this.service.getAll('readnote')
//   }

  // newNote() {
  //   this.expression = true;
  //   this.enterExpression = false;
  // }
  // closeNote(title,description) {
  //   const helper = new JwtHelperService();
  //   const decodedToken = helper.decodeToken(localStorage.getItem('token'));
  //   this.raw_data = decodedToken;
  //   // this.transform(description.innerHTML);
  //   this.value = description.innerHTML;
  //   console.log(this.value);
  //   if(title.innerHTML != '') {
  //     console.log(title.innerHTML);
  //     console.log(description.innerHTML);
  //   }
  //   var userId = localStorage.getItem('id');
  //   var note = {
  //     "userId": userId,
  //     "title": title.innerHTML,
  //     "description": description.innerHTML,
  //     "isPinned": false,
  //     "isArchive": false,
  //     "isTrash": false,
  //     "reminder":null,
  //     "color":null,
  //     "image":null,
  //     "collaborators":[],
  //     "owner": {
  //       "name": this.raw_data.name,
  //       "email": this.raw_data.email
  //   }
  //   }
  //   this.expression = false;
  //   this.enterExpression = true;
  //   this.service.postRequest(note, 'savenote').subscribe((data: any) => {
  //     console.log(data);
  //   });
  //  this.readAll();
  // }

  // update(title, description){
  //   this.closeNote(title, description);
  //   this.service.getRequest('readnote').subscribe((data: any) => {
  //     console.log(data.data);
  //     //this.notes = data.data;
  //   });
  // }

//}
  