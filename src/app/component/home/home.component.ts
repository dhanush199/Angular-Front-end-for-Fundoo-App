import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from 'src/app/core/services/note/note.service';
import { DataService } from 'src/app/core/services/DataService/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {
  panelOpenState = false;

  constructor(private router: Router) { }
  ngOnInit() {
  }
  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
  }
 
}
