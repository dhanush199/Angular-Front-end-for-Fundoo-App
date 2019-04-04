import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Inject } from '@angular/core';
import { UpdateNoteComponent } from 'src/app/component/update-notes/update-notes.component';
import { Router } from '@angular/router';
import { Note } from 'src/app/core/model/note';
import { NoteService } from 'src/app/core/services/NoteService/note.service';
import { LabelService } from 'src/app/core/services/LabelService/label.service';
import { CollaboratorDialogBoxComponent } from '../user-components/collaborator-dialog-box/collaborator-dialog-box.component';
import { UserService } from 'src/app/core/services/UserService/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/core/model/user';
import { DataServiceService } from 'src/app/core/services/Data-service/data.service';
import { ColorPalets } from 'src/app/data-config';
import { LabelDialogBoxComponent } from '../label-dialog-box/label-dialog-box.component';
import { RemainderComponentComponent } from '../remainder-component/remainder-component.component';
import { HttputilService } from 'src/app/httputil.service';

export interface DialogData {
  labelName: string;
  id: number;
}

@Component({
  selector: 'app-note-list',
  templateUrl: 'notelist.component.html',
  styleUrls: ['./notelist.component.scss']

})
export class NotelistComponent implements OnInit {
  @Input() products: Note;
  @Input() public viewChanged = false;
  @Input() search;
  noteForm: FormGroup;
  removable = true;
  togle = true;
  inputImage = false;
  imagePath;
  base64;
  imageSource;
  notes: Note;
  coNotes: any;
  noteArray: any;
  user: User;
  picture: any;
  colorMenu = false;
  fillTheColor;
  grid = false;
  colors: string[] = ColorPalets;
  panelOpenState: boolean = false;
  submitted = false;

  constructor(private httpUtil: HttputilService, private router: Router, private labelService: LabelService, private noteService: NoteService,
    public dialog: MatDialog, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<NotelistComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private userService: UserService,
    private sanitizer: DomSanitizer, private dataService: DataServiceService) { }

  public ngOnInit() {
    this.readAll();
    this.dataService.getTheme().subscribe((resp) =>
      this.grid = resp
    );
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

  public onArchive(products) {
    console.log(products);
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
  }

  public  readAll() {
    this.noteService.getAll().subscribe((resp: any) => {
      this.products = resp;
    }, (error) => console.log(error));
  }

  public transformImage(data) {
    const url = `data:${data.contentType};base64,${data.image}`;
    return this.sanitizer.bypassSecurityTrustUrl(url)
  }

  public changeColor(products) {
    var icon = document.getElementById(products.title);
    this.togle = !this.togle;
    if (this.togle) {
      icon.style.background = "black";
      products.pinned = true;
      console.log(products);
      this.snackBar.open("Pinned", "Ok", {
        duration: 2000,
      });
    }
    else {
      products.pinned = false;
      icon.style.background = "white";
      this.snackBar.open("Unpinned", "Ok", {
        duration: 2000,
      });
    }
    this.noteService.updateNote(products, products.id).subscribe((resp: any) => {
      this.products = resp;

    }, (error) => console.log(error));
  }
  /**Label Dialog Box */
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
      console.log(this.picture);
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
    products.colorMenu = 100;
  }

  public addColor(color, products) {
    this.fillTheColor = color;
    products.colore = color;
    this.noteService.updateNote(products, products.id).subscribe(resp => {
      console.log(resp);
    }, (error) => {
      console.log(error);
    })
    products.colorMenu = 0;
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

  childStatusChanged(finished: boolean) {
    if (finished) {
      this.readAll();
    }
  }

  public removeReminder(note) {
    note.reminder = null;
    this.noteService.updateNote(note, note.id).subscribe(resp => {
      console.log(resp);
    }, (error) => {
      console.log(error);
    })
  }



  addImage() {
    this.inputImage = !this.inputImage;
  }

  onFileSelected(event, note) {
    note.image = event.target.files[0];
    this.imagePath = this.data.image;
    var fd = new FormData();
    fd.append('file', event.target.files[0])
    this.inputImage = true;
    this.noteService.uploadNoteImage(fd, note.id).subscribe(resp => {
      console.log(resp)
    }, (error) => {
      console.log(error)
    })
    this.readAll()
  }

}


