import { Component, OnInit, Input } from '@angular/core';
import { UpdateNoteComponent } from '../update-notes/update-notes.component';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Note } from 'src/app/core/model/note';
import { NoteService } from 'src/app/core/services/note/note.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-pinned-notes',
  templateUrl: './pinned-notes.component.html',
  styleUrls: ['./pinned-notes.component.css']
})
export class PinnedNotesComponent implements OnInit {
  @Input() products: Note;
  i = true
  pinnedForm: FormGroup;
  panelOpenState: boolean = false;
  submitted = false;
  constructor(private router: Router, private service: NoteService, private dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.products)
    //this.readAll()
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
  }

  changeColor(products) {
    var icon = document.getElementById(products.title);
    console.log(products)
    if (this.i){
      icon.style.background = "black"
      products.pinned=true
    }
    else{
      products.pinned=false
      icon.style.background = "white"
    }
    this.i = !this.i
      this.service.updateNote(products, products.id)
  }
}
