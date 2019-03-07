import { Component, OnInit, Input } from '@angular/core';
import { UpdateNoteComponent } from 'src/app/component/update-notes/update-notes.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Note } from 'src/app/core/model/note';
import { NoteService } from 'src/app/core/services/NoteService/note.service';
import { LabelDialogBoxComponent } from 'src/app/label-dialog-box/label-dialog-box.component';
import { LabelService } from 'src/app/core/services/LabelService/label.service';
import { HttputilService } from 'src/app/httputil.service';


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
  i=true
  label
  pinnedColor=false
  noteForm: FormGroup;
  panelOpenState: boolean = false;
  submitted = false;
  constructor(private httpUtil:HttputilService, private labelService:LabelService, private router: Router, private service: NoteService, private dialog: MatDialog) { }

  ngOnInit() {
   this.readAll();
   this.labelService.getLabels().subscribe((resp: any) => {
    this.label = resp;
    console.log(resp)
  }, (error) => console.log(error));

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
      products.archive = false
      this.service.updateNote(products, products.id)
  }

  changeColor(products) {
    var icon = document.getElementById(products.title);
    console.log(products)
    this.i = !this.i
    if (this.i){
      icon.style.background = "black"
      products.pinned=true
    }
    else{
      products.pinned=false
      icon.style.background = "white"
    }
      this.service.updateNote(products, products.id)
  }

  onTrash(note){
    note.inTrash=true
    this.service.updateNote(note, note.id)
  }
  
  // onchangeColor(products) {
  //   this.pinnedColor = !this.pinnedColor
  //   if (this.pinnedColor) {
  //     console.log(products)
  //     products.pinned=true
  //     this.service.updateNote(products, products.id)
  //   }
  //   if (!this.pinnedColor) {
  //     console.log(products)
  //     products.pinned=false
  //     this.service.updateNote(products, products.id)
  //   }
  // }

  /* dialog box for labels */
  onClickDialog(products): void {
    const dialogRef = this.dialog.open(LabelDialogBoxComponent, {
      width: '550px',
      data: products
    });
    console.log(dialogRef)
    dialogRef.afterClosed().subscribe(result => {
      console.log(this.label)
    });
  }
}