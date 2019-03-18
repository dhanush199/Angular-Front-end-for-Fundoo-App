import { Component, OnInit, Input, Inject } from '@angular/core';
import { Note } from '../core/model/note';
import { DataServiceService } from '../core/services/Data-service/data.service';
import { NoteService } from '../core/services/NoteService/note.service';
import { FormControl, Validators } from '@angular/forms';
import { LabelDialogBoxComponent } from '../label-dialog-box/label-dialog-box.component';
import { LabelService } from '../core/services/LabelService/label.service';
import { MatSnackBar, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogData } from '../component/notelist/notelist.component';
import { UpdateNoteComponent } from '../component/update-notes/update-notes.component';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent implements OnInit {
  @Input() search;
  @Input() view: boolean;
  notes = []
  colorMenu = false;
  fillTheColor;
  @Input() products: Note;
  togle = false;
  colors = [
    "#fff", '#FFFF00', '#FFFAFA', '#B0E0E6', '#FFC0CB',
    '#00FA9A', '#E0FFFF', '	#ADFF2F', '#00FFFF', '#DEB887',
    '#BA55D3', '	#FF0000'
  ]
  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<NoteCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private labelService: LabelService, private noteService: NoteService, private dataService: DataServiceService, private service: NoteService) { }

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
  colorChange() {
    if (this.colorMenu)
      this.colorMenu = false
    else
      this.colorMenu = true;
  }

  addColor(color, products) {
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
}
