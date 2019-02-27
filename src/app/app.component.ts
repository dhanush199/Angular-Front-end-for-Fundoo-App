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

  