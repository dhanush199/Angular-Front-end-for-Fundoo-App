import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Label } from 'src/app/core/model/label';
import { LabelService } from 'src/app/core/services/LabelService/label.service';
import { EditLabelComponent } from '../../edit-label/edit-label.component';

export interface DialogData {
  labelName: string;
}

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @ViewChild('drawer') public drawer;
  labels:[]
  label:Label
  @Input() products: Label;
  @Input() public toggleSidebar: Subject<any>;;
  constructor(public dialog: MatDialog,private router: Router, private labelservice: LabelService) { }

  ngOnInit() {
    this.toggleSidebar.subscribe(event => {
      if (this.drawer) {
        this.drawer.toggle();
      }
    });
    this.labelservice.getLabels().subscribe((resp: any) => {
      this.labels = resp
      console.log(resp)
    }, (error) => console.log(error));
  }
  notes() {
    this.router.navigate(['home/notelist'])
  }
  openDialog(label): void {
    const dialogRef = this.dialog.open(EditLabelComponent, {
      width: '550px',
      data: label
    });
    console.log(dialogRef)

    dialogRef.afterClosed().subscribe(result => {
      console.log(label)
    });
  }
}




