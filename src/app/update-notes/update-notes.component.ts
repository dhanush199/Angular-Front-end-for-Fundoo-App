import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../component/notelist/notelist.component';
import { NoteService } from '../core/services/note/note.service';


@Component({
  selector: 'app-update-notes',
  templateUrl: './update-notes.component.html',
  styleUrls: ['./update-notes.component.css']
})
export class UpdateNoteComponent {

  constructor(
    public dialogRef: MatDialogRef<UpdateNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private service: NoteService) {}

  onNoClick(note,id): void {
    this.dialogRef.close();
    this.service.updateNote(note,id)
  }
  updateNote(note,id) {
    console.log(note);
    this.service.updateNote(note,id)
  }
}
