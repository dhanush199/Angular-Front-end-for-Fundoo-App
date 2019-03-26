import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Label } from 'src/app/core/model/label';
import { LabelService } from 'src/app/core/services/LabelService/label.service';
import { EditLabelComponent } from '../../edit-label/edit-label.component';
import { NoteService } from 'src/app/core/services/NoteService/note.service';
import { Note } from 'src/app/core/model/note';

export interface DialogData {
  labelName: string;
}

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') public drawer;
  labels: []
  notelist: Note[]
  // @Input() products: Label;
  @Input() public toggleSidebar: Subject<any>;
  constructor(public dialog: MatDialog, private noteService: NoteService, private router: Router, private labelservice: LabelService) { }

  public ngOnInit() {
    this.toggleSidebar.subscribe(event => {
      if (this.drawer) {
        this.drawer.toggle();
      }
    });
    this.labelservice.getLabels().subscribe((resp: any) => {
      this.labels = resp
    }, (error) => console.log());
  }
  public notes() {
    this.router.navigate(['home/noteretrieve'])
  }
  public openDialog(label): void {
    const dialogRef = this.dialog.open(EditLabelComponent, {
      width: '550px',
      data: label
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  public ngOnDestroy() {
    this.toggleSidebar.unsubscribe();
  }
  public archive() {
    this.router.navigate(['home/archive'])
  }
  public trash() {
    this.router.navigate(['home/trash'])
  }
  public remainder() {
    this.noteService.getAll().subscribe(resp => {
      this.notelist = resp
      const result = this.notelist.filter(note => note.reminder!=null);
      this.router.navigate(['home/pinned'], { state: { notes: result } });
    })
  }
}




