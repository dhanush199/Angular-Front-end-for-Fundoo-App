import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from 'src/app/core/services/note/note.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { UpdateNoteComponent } from 'src/app/component/update-notes/update-notes.component';
import { Router } from '@angular/router';
import { Note } from 'src/app/core/model/note';
import { DataService } from 'src/app/core/services/DataService/data.service';

export interface DialogData {
  title: string;
  discription: string;
}

@Component({
  selector: 'app-note-list',
  templateUrl: 'notelist.component.html'
})
export class NotelistComponent implements OnInit {
  @Input() products: Note;
  noteForm: FormGroup;
  notes: Note
  panelOpenState: boolean = false;
  submitted = false;
  constructor(private router: Router, private service: NoteService, private dialog: MatDialog) { }

  ngOnInit() {
    this.readAll()
  }
  discription = new FormControl('', [Validators.required, Validators.minLength(1)]);
  title = new FormControl('', [Validators.required, Validators.minLength(1)]);

  togglePanel() {
    this.panelOpenState = !this.panelOpenState;
  }
  openDialog(note): void {

    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: '550px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.service.updateNote(note, note.id)

    });
  }

  onCloseUpdateNote(note) {
    console.log(note)
    this.service.updateNote(note, note.id)

  }

  onArchive(products) {
    console.log(products)
      products.Archive = true
      this.service.updateNote(products, products.id)
  }

  onTrash(products) {
      products.inTrash = 1
      this.service.updateNote(products, products.id)
    }
  
  readAll() {
    this.service.getAll().subscribe((resp: any) => {
      this.products = resp
      console.log(resp)
    }, (error) => console.log(error));
  }

}


