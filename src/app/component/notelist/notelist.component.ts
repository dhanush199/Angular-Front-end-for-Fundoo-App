import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from 'src/app/core/services/note/note.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { UpdateNoteComponent } from 'src/app/update-notes/update-notes.component';
import { Router } from '@angular/router';

export interface DialogData {
  noteName: string;
  noteDis: string;
}

@Component({
  selector: 'app-notelist',
  templateUrl: 'notelist.component.html'
})
export class NotelistComponent implements OnInit {
  @Input() view: boolean;
  noteForm: FormGroup;
  panelOpenState: boolean = false;
  private products: [];
  submitted = false;
  constructor(private router: Router, private service: NoteService, private dialog: MatDialog ) { }

  ngOnInit() {
    this.readAll();
    // this.delete1('Himalaya')
  }
  discription = new FormControl('', [Validators.required, Validators.minLength(1)]);
  title = new FormControl('', [Validators.required, Validators.minLength(1)]);

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

  Archive(products) {
    if (products.Archive)
      console.log('already archeived')
    else {
      products.Archive = 1
      this.service.updateNote(products, products.id)
    }
  }
}


