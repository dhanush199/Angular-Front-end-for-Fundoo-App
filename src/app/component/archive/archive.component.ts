import { Component, OnInit, Input } from '@angular/core';
import { UpdateNoteComponent } from 'src/app/component/update-notes/update-notes.component';
import { MatDialog, MatSnackBar } from '@angular/material';
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
  removable=true
  pinnedColor=false
  noteForm: FormGroup;
  panelOpenState: boolean = false;
  submitted = false;
  constructor(private httpUtil:HttputilService, private labelService:LabelService, 
    private router: Router, private service: NoteService, private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

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
      this.snackBar.open("UnArchived", "Ok", {
        duration: 2000,
      });
  }

  changeColor(products) {
    var icon = document.getElementById(products.title);
    this.i = !this.i
    if (this.i){
      icon.style.background = "black"
      products.pinned=true
      this.snackBar.open("Pinned", "Ok", {
        duration: 2000,
      });

    }
    else{
      products.pinned=false
      icon.style.background = "white"
      this.snackBar.open("UnPinned", "Ok", {
        duration: 2000,
      });

    }
      this.service.updateNote(products, products.id)
  }

  onTrash(note){
    note.inTrash=true
    this.service.updateNote(note, note.id)
    this.snackBar.open("Moved to trash", "Ok", {
      duration: 2000,
    });

 
  }
  
  /* dialog box for labels */
  onClickDialog(products): void {
    const dialogRef = this.dialog.open(LabelDialogBoxComponent, {
      width: '550px',
      data: products
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  removeLabel(label,note){
    this.labelService.removeLabelNote(label,note).subscribe(resp => {
      this.snackBar.open("Label has been removed", "Ok", {
        duration: 2000,
      });

    }, (error) => console.log(error));
  }
}