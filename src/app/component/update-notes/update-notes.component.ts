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
    @Inject(MAT_DIALOG_DATA) public data, private service: NoteService) { }

  public onNoClick(note, id): void {
    this.dialogRef.close();
    // console.log(note);
    this.service.updateNote(note, id)
    // console.log(note);
  }

  public updateNote(data) {
    this.service.updateNote(data, data.id).subscribe(resp=>{
      console.log(resp)
    },(error)=>{
      console.log(error)
    })
    this.dialogRef.close();

  }
}
