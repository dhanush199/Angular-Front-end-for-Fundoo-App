import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LabelDialogBoxComponent } from '../label-dialog-box/label-dialog-box.component';
import { MatSnackBar, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
// import { DialogData } from '../component/notelist/notelist.component';
import { LabelService } from 'src/app/core/services/LabelService/label.service';
import { ColorPalets } from 'src/app/data-config';
import { Note } from 'src/app/core/model/note';
import { NoteService } from 'src/app/core/services/NoteService/note.service';
import { UpdateNoteComponent } from '../update-notes/update-notes.component';
import { DialogData } from '../notelist/notelist.component';
import { DataServiceService } from 'src/app/core/services/Data-service/data.service';
import { RemainderComponentComponent } from '../remainder-component/remainder-component.component';


@Component({
  selector: 'app-note-card',
  templateUrl: './note-search.component.html',
  styleUrls: ['./note-search.component.css']
})
export class NoteSearchComponent implements OnInit {
  @Input() search;
  @Input() view: boolean;
  notes = []
  colorMenu = false;
  fillTheColor;
  @Input() products: Note;
  togle = false;
  colors :string[]=ColorPalets
  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<NoteSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private labelService: LabelService, private noteService: NoteService, private dataService: DataServiceService, 
    private service: NoteService) { }

  public ngOnInit() {
    this.dataService.currentMessage.subscribe(message => this.view = message)
    this.dataService.currentDataSearch.subscribe((search: any) => {
      this.search = search
    })
    this.readAll();
  }
  discription = new FormControl('', [Validators.required, Validators.minLength(1)]);
  title = new FormControl('', [Validators.required, Validators.minLength(1)]);

  public readAll() {
    this.notes = [];
    this.service.getAll().subscribe((resp: any) => {
      this.notes = resp;
    })
  }
  public colorChange() {
    if (this.colorMenu)
      this.colorMenu = false
    else
      this.colorMenu = true;
  }

 public addColor(color, products) {
    this.fillTheColor = color;
    products.colore = color;
    this.noteService.updateNote(products, products.id).subscribe(resp => {
      console.log(resp)
    }, (error) => {
      console.log(error)
    })
    this.readAll()
  }


  public changeColor(products) {
    var icon = document.getElementById(products.title);
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
    this.noteService.updateNote(products, products.id).subscribe((resp: any) => {
      this.products = resp;

    }, (error) => console.log(error));
  }

  public onClickDialog(products): void {
    const dialogRef = this.dialog.open(LabelDialogBoxComponent, {
      width: '550px',
      data: products
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  public removeLabel(label, note) {
    this.labelService.removeLabelNote(label, note).subscribe(resp => {
      this.snackBar.open("Label removed", "Ok", {
        duration: 2000,
      });
    }, (error) => console.log(error));
    this.labelService.removeLabelNote(label, note)
  }
  public openDialog(note): void {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: '550px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      this.noteService.updateNote(note, note.id)
    });
  }
  public onArchive(products) {
    console.log(products)
    products.archive = true
    this.noteService.updateNote(products, products.id).subscribe(resp => {
      console.log(resp)
    }, (error) => {
      console.log(error)
    })
    this.snackBar.open("Archived", "Ok", {
      duration: 2000,
    });
  }

  public onTrash(products) {
    products.inTrash = true
    this.noteService.updateNote(products, products.id).subscribe(resp => {
      console.log(resp)
    }, (error) => {
      console.log(error)
    })
    this.snackBar.open("Moved to trash", "Ok", {
      duration: 2000,
    });
  }

   /*remainder dialog box*/
   public openRemainder(products): void {
    const dialogRef = this.dialog.open(RemainderComponentComponent, {
      width: '550px',
      data: products
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  public removeReminder(note) {
    note.reminder = null;
    this.service.updateNote(note, note.id).subscribe(resp => {
      console.log(resp)
    }, (error) => {
      console.log(error)
    })
  }
}
