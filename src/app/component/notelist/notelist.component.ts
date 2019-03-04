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

  delete(id) {
    this.service.delete(id)
  }
  openDialog(note): void {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: '550px',
      data:
        { title: note.title, discription: note.discription, id: note.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      this.onCloseUpdateNote(note)

    });
  }

  onCloseUpdateNote(note) {
    this.service.updateNote(note, note.id)
  }

  onArchive(products) {
    if (products.Archive)
      console.log('already archeived')
    else {
      products.Archive = 1
      this.service.updateNote(products, products.id)
    }
  }
  onTrash(products) {
    if (products.isTrash)
      console.log('already archeived')
    else {
      products.isTrash = 1
      this.service.updateNote(products, products.id)
    }
  }
  readAll() {
    this.service.getAll().subscribe((resp: any) => {
      this.products=resp
    }, (error) => console.log(error));
  }
}


