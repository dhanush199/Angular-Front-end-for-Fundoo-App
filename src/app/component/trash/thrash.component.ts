import { Component, OnInit, Input } from '@angular/core';
import { UpdateNoteComponent } from 'src/app/component/update-notes/update-notes.component';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/core/services/note/note.service';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Note } from 'src/app/core/model/note';

export interface DialogData {
  noteName: string;
  noteDis: string;
}

@Component({
  selector: 'app-thrash',
  templateUrl: './thrash.component.html',
  styleUrls: ['./thrash.component.css']
})
export class ThrashComponent implements OnInit {
  @Input() products: Note;
  noteForm: FormGroup;
  panelOpenState: boolean = false;
  submitted = false;
  constructor(private router: Router, private service: NoteService, private dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.products)
this.readAll()
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

  onTrash(products) {
    if (products.inTrash)
      console.log('already archeived')
    else {
      products.inTrash = 1
      this.service.updateNote(products, products.id)
    }
  }
}
