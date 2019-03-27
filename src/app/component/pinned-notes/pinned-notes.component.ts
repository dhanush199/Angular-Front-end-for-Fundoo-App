import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UpdateNoteComponent } from '../update-notes/update-notes.component';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Note } from 'src/app/core/model/note';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NoteService } from 'src/app/core/services/NoteService/note.service';
import { LabelService } from 'src/app/core/services/LabelService/label.service';
import { DataServiceService } from 'src/app/core/services/Data-service/data.service';
import { ColorPalets } from 'src/app/data-config';
import { LabelDialogBoxComponent } from '../label-dialog-box/label-dialog-box.component';
import { CollaboratorDialogBoxComponent } from '../user-components/collaborator-dialog-box/collaborator-dialog-box.component';
import { RemainderComponentComponent } from '../remainder-component/remainder-component.component';

@Component({
  selector: 'app-pinned-notes',
  templateUrl: './pinned-notes.component.html',
  styleUrls: ['./pinned-notes.component.scss']
})
export class PinnedNotesComponent implements OnInit {
  @Input() products: Note;
  @Input() view: boolean
  // @Output() refreshEvent = new EventEmitter();
  @Output() refreshEvent = new EventEmitter<boolean>();

  grid = false

  togle = true
  pinnedForm: FormGroup;
  panelOpenState: boolean = false;
  submitted = false;
  removable = true;
  fillTheColor;
  public colors: string[] = ColorPalets;

  constructor(private router: Router, private service: NoteService,
    private dialog: MatDialog, private snackBar: MatSnackBar, private data: DataServiceService,
    private labelService: LabelService, ) {
  }

  public ngOnInit() {
    this.data.currentMessage.subscribe((message: any) => {
      this.view = message
    })

    this.data.getTheme().subscribe((resp) =>
      this.grid = resp
    );
  }

  discription = new FormControl('', [Validators.required, Validators.minLength(1)]);
  title = new FormControl('', [Validators.required, Validators.minLength(1)]);

  public togglePanel() {
    this.panelOpenState = !this.panelOpenState;
  }

  public openDialog(note): void {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: '550px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      this.onCloseUpdateNote(note)
    });
  }

  public onCloseUpdateNote(note) {
    this.service.updateNote(note, note.id);
  
  }

  public changeColor(products) {
    var icon = document.getElementById(products.title);
    console.log(products)
    if (this.togle) {
      icon.style.background = "black"
      products.pinned = true
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
    this.togle = !this.togle
    this.service.updateNote(products, products.id).subscribe(resp => {
    }, (error) => {
      console.log(error)
    })
  }

  public onTrash(note) {
    note.inTrash = true
    this.service.updateNote(note, note.id).subscribe(resp => {
      this.snackBar.open("Moved to trash", "Ok", {
        duration: 2000,
      });
    }, (error) => {
      console.log(error)
    })
    this.readAll()

  }

  public onArchive(products) {
    products.archive = true
    this.service.updateNote(products, products.id).subscribe(resp => {
    }, (error) => {
      console.log(error)
    })
    this.snackBar.open("Archived", "Ok", {
      duration: 2000,
    });
    this.refreshEvent.emit(products);
    this.readAll();
  }
/*LabelAdd Dialog Box*/
  public onClickDialog(products): void {
    const dialogRef = this.dialog.open(LabelDialogBoxComponent, {
      width: '550px',
      data: products
    });
    dialogRef.afterClosed().subscribe(result => {
      this.readAll();
    });
   
  }

  public removeLabel(label, note) {
    this.labelService.removeLabelNote(label, note).subscribe(resp => {
      this.snackBar.open("Label removed", "Ok", {
        duration: 2000,
      });
    }, (error) => console.log(error));
    this.readAll()
  }

  public colorChange(products) {
    products.colorMenu = 100;
  }

  public addColor(color, products) {
    this.fillTheColor = color;
    products.colore = color;
    console.log(color);
    console.log(products);
    this.service.updateNote(products, products.id).subscribe(resp => {
      console.log(resp)
    }, (error) => {
      console.log(error)
    })
    products.colorMenu = 0;
    this.readAll()
  }

  public readAll() {
    this.service.getAll().subscribe((resp: any) => {
      this.products = resp;
    }, (error) => console.log(error));
  }


  /*collaborater dialog Box*/
  public onClickDialogBox(products): void {
    console.log(products)
    const dialogRef = this.dialog.open(CollaboratorDialogBoxComponent, {
      width: '550px',
      data: products

    });
    dialogRef.afterClosed().subscribe(result => {
    });
    this.readAll();
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

  public childStatusChanged(finished: boolean) {
    if (finished){
      this.readAll();
    }
  }
}
