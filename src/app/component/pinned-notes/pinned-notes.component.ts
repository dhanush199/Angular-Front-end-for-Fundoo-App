import { Component, OnInit, Input } from '@angular/core';
import { UpdateNoteComponent } from '../update-notes/update-notes.component';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Note } from 'src/app/core/model/note';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NoteService } from 'src/app/core/services/NoteService/note.service';
import { LabelDialogBoxComponent } from 'src/app/label-dialog-box/label-dialog-box.component';
import { LabelService } from 'src/app/core/services/LabelService/label.service';

@Component({
  selector: 'app-pinned-notes',
  templateUrl: './pinned-notes.component.html',
  styleUrls: ['./pinned-notes.component.css']
})
export class PinnedNotesComponent implements OnInit {
  @Input() products: Note;
  togle = true
  pinnedForm: FormGroup;
  panelOpenState: boolean = false;
  submitted = false;
  removable=true
  constructor(private router: Router, private service: NoteService, 
    private dialog: MatDialog,private snackBar: MatSnackBar,
    private labelService:LabelService) { }

    public ngOnInit() {
    console.log(this.products)
  }

  discription = new FormControl('', [Validators.required, Validators.minLength(1)]);
  title = new FormControl('', [Validators.required, Validators.minLength(1)]);

  public togglePanel() {
    this.panelOpenState = !this.panelOpenState;
  }

  public openDialog(note): void {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: '550px',
      data:
        { title: note.title, discription: note.discription, id: note.id }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.onCloseUpdateNote(note)
    });
  }

  public onCloseUpdateNote(note) {
    console.log(note)
    this.service.updateNote(note, note.id)
  }

  public onRestore(products) {
    products.inTrash = false
    this.service.updateNote(products, products.id)
  }

  public changeColor(products) {
    var icon = document.getElementById(products.title);
    console.log(products)
    if (this.togle){
      icon.style.background = "black"
      products.pinned=true
      this.snackBar.open("Pinned", "Ok", {
        duration: 2000,
      });
    }
    else{
      products.pinned=false
      icon.style.background = "white"
      this.snackBar.open("Unpinned", "Ok", {
        duration: 2000,
      });
    }
    this.togle = !this.togle
      this.service.updateNote(products, products.id)
  }

  public onTrash(note){
    note.inTrash=true
    this.service.updateNote(note, note.id)
    this.snackBar.open("Moved to trash", "Ok", {
      duration: 2000,
    });
  }

  public onArchive(products){
    products.archive=true
    this.service.updateNote(products, products.id);
    this.snackBar.open("Archived", "Ok", {
      duration: 2000,
    });
  }

  public onClickDialog(products): void {
    const dialogRef = this.dialog.open(LabelDialogBoxComponent, {
      width: '550px',
      data: products
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  public removeLabel(label,note){
    this.labelService.removeLabelNote(label,note).subscribe(resp => {
      this.snackBar.open("Label removed", "Ok", {
        duration: 2000,
      });
    }, (error) => console.log(error));
  }
}
