import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Inject } from '@angular/core';
import { UpdateNoteComponent } from 'src/app/component/update-notes/update-notes.component';
import { Router } from '@angular/router';
import { Note } from 'src/app/core/model/note';
import { NoteService } from 'src/app/core/services/NoteService/note.service';
import { LabelDialogBoxComponent } from 'src/app/label-dialog-box/label-dialog-box.component';
import { LabelService } from 'src/app/core/services/LabelService/label.service';

// export interface DialogData {
//   title: string;
//   discription: string;
// }

export interface DialogData {
  labelName: string;
}

@Component({
  selector: 'app-note-list',
  templateUrl: 'notelist.component.html',
  styleUrls: ['./notelist.component.css']

})
export class NotelistComponent implements OnInit {
  @Input() products: Note;
  @Input() public viewChanged = false;
  @Input() search
  noteForm: FormGroup;
  removable=true
  togle = true
  notes: Note
  label= []
  panelOpenState: boolean = false;
  submitted = false;
  constructor(private router: Router,private labelService:LabelService, private noteService: NoteService,
     public dialog: MatDialog,private snackBar:MatSnackBar,
    public dialogRef: MatDialogRef<NotelistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

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
      // console.log(result)
     // this.noteService.updateNote(note, note.id)
    });
  }

  onCloseUpdateNote(note) {
    // console.log(note)
    this.noteService.updateNote(note, note.id)
  }

  onArchive(products) {
    console.log(products)
    products.archive = true
    this.noteService.updateNote(products, products.id)
    this.snackBar.open("Archived", "Ok", {
      duration: 2000,
    });
  }

  onTrash(products) {
    products.inTrash = 1
    this.noteService.updateNote(products, products.id)
    this.snackBar.open("Moved to trash", "Ok", {
      duration: 2000,
    });
  }

  readAll() {
    this.noteService.getAll().subscribe((resp: any) => {
      this.products = resp;
  
      // console.log(resp)
    }, (error) => console.log(error));
  }

  changeColor(products) {
    var icon = document.getElementById(products.title);
    // console.log(products)
    this.togle = !this.togle
    if (this.togle) {
      icon.style.background = "black"
      products.pinned = true
      console.log(products)
      this.snackBar.open("Pinned", "Ok", {
        duration: 2000,
      });
    }
    else {
      products.pinned = false
      icon.style.background = "white"
      this.snackBar.open("Unpinned", "Ok", {
        duration: 2000,
      });
    }
    this.noteService.updateNote(products, products.id)
  }

  onClickDialog(products): void {
    const dialogRef = this.dialog.open(LabelDialogBoxComponent, {
      width: '550px',
      data: products
    });
    // console.log(dialogRef)
    dialogRef.afterClosed().subscribe(result => {
      // console.log(this.label)
    });
  }

  removeLabel(label,note){
    this.labelService.removeLabelNote(label,note).subscribe(resp => {
      this.snackBar.open("Label removed", "Ok", {
        duration: 2000,
      });
    }, (error) => console.log(error));
  }
  
  
}


