import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { map, filter, scan } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private router: Router) {
   }

  ngOnInit() {
    debugger;
  }

}
