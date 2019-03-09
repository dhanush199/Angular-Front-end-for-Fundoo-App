import { Component, OnInit, Input } from '@angular/core';
import { UpdateNoteComponent } from 'src/app/component/update-notes/update-notes.component';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Note } from 'src/app/core/model/note';
import { NoteService } from 'src/app/core/services/NoteService/note.service';

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
  pinnedColor = false
  trashForm: FormGroup;
  panelOpenState: boolean = false;
  submitted = false;
  constructor(private router: Router, private service: NoteService, 
    private dialog: MatDialog,  private snackBar: MatSnackBar) { }

  ngOnInit() {
    console.log(this.products)
    this.readAll()
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

  onRestore(products) {
    products.inTrash = false
    this.service.updateNote(products, products.id)
    this.snackBar.open("Successfully restored", "Ok", {
      duration: 2000,
    });
  }
}
