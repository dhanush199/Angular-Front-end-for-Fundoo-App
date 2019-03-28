import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { NoteService } from 'src/app/core/services/NoteService/note.service';
import { Note } from 'src/app/core/model/note';
import { ColorPalets } from 'src/app/data-config';
import { LabelDialogBoxComponent } from '../label-dialog-box/label-dialog-box.component';
import { LabelService } from 'src/app/core/services/LabelService/label.service';
import { CollaboratorDialogBoxComponent } from '../user-components/collaborator-dialog-box/collaborator-dialog-box.component';
import { RemainderComponentComponent } from '../remainder-component/remainder-component.component';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { User } from 'src/app/core/model/user';
import { UserService } from 'src/app/core/services/UserService/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogData } from '../archive/archive.component';


@Component({
  selector: 'app-update-notes',
  templateUrl: './update-notes.component.html',
  styleUrls: ['./update-notes.component.scss']
})
export class UpdateNoteComponent {
  @Input() search;
  @Input() view: boolean;
  noteArray: any;
  notes = [];
  fillTheColor;
  @Input() products: Note;
  togle = false;
  @Input() public viewChanged = false;
  noteForm: FormGroup;
  removable = true;
  coNotes: any;
  user: User;
  picture: any;
  grid = false;
  panelOpenState: boolean = false;
  submitted = false;
  colors :string[]=ColorPalets;
  constructor( public dialog: MatDialog,private userService:UserService, private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<UpdateNoteComponent>,private labelService:LabelService,
    @Inject(MAT_DIALOG_DATA) public data:DialogData,  private snackBar: MatSnackBar,private service: NoteService, private noteService: NoteService) { }

  public onNoClick(note, id): void {
    this.dialogRef.close();
    this.service.updateNote(note, id);
  }
  public updateNote(data) {
    this.service.updateNote(data, data.id).subscribe(resp=>{
      console.log(resp);
    },(error)=>{
      console.log(error);
    })
    this.dialogRef.close();

  }

  public onCloseUpdateNote(note) {
    this.noteService.updateNote(note, note.id).subscribe(resp => {
      this.noteArray = resp;
      this.snackBar.open("note updated", "Ok", {
        duration: 2000,
      });
    }, (error) => {
      console.log(error);
    })
  }
  public ngOnInit() {
    this.readAll();
    this.getUser();
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
      this.noteService.updateNote(note, note.id);
    });
  }

  public onArchive(products) {
    products.archive = true;
    this.noteService.updateNote(products, products.id).subscribe(resp => {
      console.log(resp);
    }, (error) => {
      console.log(error);
    })
    this.snackBar.open("Archived", "Ok", {
      duration: 2000,
    });
  }

  public onTrash(products) {
    products.inTrash = true;
    this.noteService.updateNote(products, products.id).subscribe(resp => {
      console.log(resp);
    }, (error) => {
      console.log(error);
    })
    this.snackBar.open("Moved to trash", "Ok", {
      duration: 2000,
    });
    this. readAll();
  }

  public readAll() {
    this.noteService.getAll().subscribe((resp: any) => {
      this.products = resp;
    }, (error) => console.log(error));
  }

  public changeColor(products) {
    var icon = document.getElementById(products.title);
    this.togle = !this.togle;
    if (this.togle) {
      icon.style.background = "black";
      products.pinned = true;
      this.snackBar.open("Pinned", "Ok", {
        duration: 2000,
      });
    }
    else {
      products.pinned = false;
      icon.style.background = "white"
      this.snackBar.open("Unpinned", "Ok", {
        duration: 2000,
      });
    }
    this.noteService.updateNote(products, products.id).subscribe((resp: any) => {
      this.products = resp;

    }, (error) => console.log(error));
  }
/**LABEL cOMPONENT */
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
    this.readAll();
  }

  public getUser() {
    this.userService.getUser().subscribe((resp) => {
      this.user = resp;
      this.user = {
        ...resp,
        image: `data:image/text;base64, ${resp.image}`,
      };
      const url = `data:${resp.contentType};base64,${resp.image}`;
      this.picture = {
        imageSrc: this.sanitizer.bypassSecurityTrustUrl(url)
      }
    }, (error) => {
      console.log(error);
    })
  }

  /*collaborator*/
  public onClickDialogBox(products): void {
    console.log(products);
    const dialogRef = this.dialog.open(CollaboratorDialogBoxComponent, {
      width: '550px',
      data: products

    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  public colorChange(products) {
    products.colorMenu=100;
  }

  public addColor(color, products) {
    this.fillTheColor = color;
    products.colore = color;
    this.noteService.updateNote(products, products.id).subscribe(resp => {
      console.log(resp);
    }, (error) => {
      console.log(error);
    })
    products.colorMenu=100;
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
  public childStatusChanged($event) {
    this.readAll();
  }

  public removeReminder(note) {
    note.reminder = null;
    this.noteService.updateNote(note, note.id).subscribe(resp => {
      console.log(resp);
    }, (error) => {
      console.log(error);
    })
  }
}
