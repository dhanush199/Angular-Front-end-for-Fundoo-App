import { Component, OnInit, Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatSidenav, MatDialog } from '@angular/material';

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

  