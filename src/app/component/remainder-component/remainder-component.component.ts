import { Component, OnInit, Inject } from '@angular/core';
import { Note } from 'src/app/core/model/note';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NoteService } from 'src/app/core/services/NoteService/note.service';

@Component({
  selector: 'app-remainder-component',
  templateUrl: './remainder-component.component.html',
  styleUrls: ['./remainder-component.component.css']
})
export class RemainderComponentComponent implements OnInit {
  note: Note
  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<RemainderComponentComponent>, private noteService: NoteService,
    @Inject(MAT_DIALOG_DATA) public data,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  setRemainder(remainder) {
    this.note = this.data;
    this.note.reminder = remainder.selected;
    this.noteService.updateNote(this.note, this.note.id).subscribe(resp => {
      this.snackBar.open("Remainder has been Set", "Ok", {
        duration: 2000,
      });
    }, (error) => { console.log(error) });
  }
}



