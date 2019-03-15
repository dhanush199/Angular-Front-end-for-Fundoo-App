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
import { CollaboratorDialogBoxComponent } from '../user-components/collaborator-dialog-box/collaborator-dialog-box.component';
import { UserService } from 'src/app/core/services/UserService/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/core/model/user';

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
  user:User
  picture:any
  label= []
  panelOpenState: boolean = false;
  submitted = false;
  constructor(private router: Router,private labelService:LabelService, private noteService: NoteService,
     public dialog: MatDialog,private snackBar:MatSnackBar,
    public dialogRef: MatDialogRef<NotelistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private userService:UserService,
    private sanitizer: DomSanitizer) { }

    public ngOnInit() {
    this.readAll()
    this.getUser()
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
     // this.noteService.updateNote(note, note.id)
    });
  }

  public onCloseUpdateNote(note) {
    this.noteService.updateNote(note, note.id)
  }

  public onArchive(products) {
    console.log(products)
    products.archive = true
    this.noteService.updateNote(products, products.id)
    this.snackBar.open("Archived", "Ok", {
      duration: 2000,
    });
    this.readAll()
  }

  public onTrash(products) {
    products.inTrash = 1
    this.noteService.updateNote(products, products.id)
    this.snackBar.open("Moved to trash", "Ok", {
      duration: 2000,
    });
    this.readAll()
  }

  public  readAll() {
    this.noteService.getAll().subscribe((resp: any) => {
      this.products = resp;
  
    }, (error) => console.log(error));
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
    this.noteService.updateNote(products, products.id)
    this.readAll()
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
    this.labelService.removeLabelNote(label,note)
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
      console.log(this.picture)
    }, (error) => {
      console.log(error)
    })
  }

   /*collaborator*/
   public onClickDialogBox(products): void {
     console.log(products)
    const dialogRef = this.dialog.open(CollaboratorDialogBoxComponent, {
      width: '550px',
      data: products
     
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}


