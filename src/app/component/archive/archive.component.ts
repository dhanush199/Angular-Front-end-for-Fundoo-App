import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from 'src/app/core/services/note/note.service';
import { UpdateNoteComponent } from 'src/app/component/update-notes/update-notes.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Note } from 'src/app/core/model/note';

export interface DialogData {
  noteName: string;
  noteDis: string;
}

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})

export class ArchiveComponent implements OnInit {
  @Input() products: Note;
  noteForm: FormGroup;
  panelOpenState: boolean = false;
  submitted = false;
  constructor(private router: Router, private service: NoteService, private dialog: MatDialog) { }

  ngOnInit() {
   this.readAll();
  }

  readAll() {
    this.service.getAll().subscribe((products: any) => {
      console.log(products);
      console.log(products.Archive);
      this.products = products;
      console.log(this.products)
    }, (error) => console.log(error));
  }

  togglePanel() {
    this.panelOpenState = !this.panelOpenState;
  }

  delete(id) {
    this.service.delete(id)
  }
  openDialog(note): void {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: '550px',
      data:note
       
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      this.onCloseUpdateNote(note)

    });
  }

  onCloseUpdateNote(note) {
    console.log(note)
    this.service.updateNote(note, note.id)
  }

  onUnArchive(products) {
      products.Archive = false
      this.service.updateNote(products, products.id)
  }
}