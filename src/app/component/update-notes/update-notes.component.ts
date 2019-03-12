import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'src/app/component/notelist/notelist.component';
import { NoteService } from 'src/app/core/services/NoteService/note.service';


@Component({
  selector: 'app-update-notes',
  templateUrl: './update-notes.component.html',
  styleUrls: ['./update-notes.component.css']
})
export class UpdateNoteComponent {

  constructor(
    public dialogRef: MatDialogRef<UpdateNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private service: NoteService) { }

  public onNoClick(note, id): void {
    this.dialogRef.close();
    // console.log(note);
    this.service.updateNote(note, id)
    // console.log(note);
  }

  public updateNote(note, id, title, disc) {
    console.log(title);
    console.log(disc);
    note = {
      "title": title,
      "discription": disc,
      "noteId": note.id
    }
    this.service.updateNote(note, id)
    this.dialogRef.close();

  }
}
