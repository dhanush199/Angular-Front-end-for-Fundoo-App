import { Component, OnInit, Input } from '@angular/core';
import { UpdateNoteComponent } from 'src/app/component/update-notes/update-notes.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Note } from 'src/app/core/model/note';
import { NoteService } from 'src/app/core/services/NoteService/note.service';
import { LabelService } from 'src/app/core/services/LabelService/label.service';
import { ColorPalets } from 'src/app/data-config';
import { LabelDialogBoxComponent } from '../label-dialog-box/label-dialog-box.component';
import { CollaboratorDialogBoxComponent } from '../user-components/collaborator-dialog-box/collaborator-dialog-box.component';
import { RemainderComponentComponent } from '../remainder-component/remainder-component.component';
import { DomSanitizer } from '@angular/platform-browser';


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
  pinnedIcon = true;
  public colors: string[] = ColorPalets;
  label;
  inputImage = false;
  imagePath;
  base64;
  imageSource;
  fillTheColor;
  removable = true;
  pinnedColor = false;
  noteForm: FormGroup;
  panelOpenState: boolean = false;
  submitted = false;

  constructor(private labelService: LabelService,
     private service: NoteService, private dialog: MatDialog,private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar) { }

  public ngOnInit() {
    this.readAll();
    this.labelService.getLabels().subscribe((resp: any) => {
      this.label = resp;
    }, (error) => console.log(error));

  }

  discription = new FormControl('', [Validators.required, Validators.minLength(1)]);
  title = new FormControl('', [Validators.required, Validators.minLength(1)]);


  public readAll() {
    this.service.getAll().subscribe((products: any) => {
      this.products = products;
    }, (error) => console.log(error));
  }

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
    console.log(note)
    this.service.updateNote(note, note.id)
  }

  public onUnArchive(products) {
    products.archive = false
    this.service.updateNote(products, products.id).subscribe(resp => {
      this.snackBar.open("UnArchived", "Ok", {
        duration: 2000,
      });
    }, (error) => {
      console.log(error)
    })
    this.readAll();
  }

  public changeColor(products) {
    var icon = document.getElementById(products.title);
    this.pinnedIcon = !this.pinnedIcon
    if (this.pinnedIcon) {
      icon.style.background = "black"
      products.pinned = true
      this.snackBar.open("Pinned", "Ok", {
        duration: 2000,
      });

    }
    else {
      products.pinned = false
      icon.style.background = "white"
      this.snackBar.open("UnPinned", "Ok", {
        duration: 2000,
      });

    }
    this.service.updateNote(products, products.id).subscribe(resp => {
      console.log(resp)
    }, (error) => {
      console.log(error)
    })
  }

  public onTrash(note) {
    note.inTrash = true
    this.service.updateNote(note, note.id).subscribe(resp => {
      console.log(resp);
      this.snackBar.open("Moved to trash", "Ok", {
        duration: 2000,
      });
    }, (error) => {
      console.log(error)
    })
  }

  /* dialog box for labels */
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
      this.snackBar.open("Label has been removed", "Ok", {
        duration: 2000,
      });

    }, (error) => console.log(error));
  }

  public colorChange(products) {
    products.colorMenu = 100;
  }

  public addColor(color, products) {
    this.fillTheColor = color;
    products.colore = color;
    this.service.updateNote(products, products.id).subscribe(resp => {
      console.log(resp)
    }, (error) => {
      console.log(error)
    })
    products.colorMenu = 0;
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
  addImage() {
    this.inputImage = !this.inputImage;
  }

  onFileSelected(event, note) {
    note.image = event.target.files[0];
    // this.imagePath = this.note.image;
    var fd = new FormData();
    fd.append('file', event.target.files[0])
    this.inputImage = true;
    this.service.uploadNoteImage(fd, note.id).subscribe(resp => {
      console.log(resp)
    }, (error) => {
      console.log(error)
    })
  }
  public transformImage(data) {
    const url = `data:${data.contentType};base64,${data.image}`;
    return this.sanitizer.bypassSecurityTrustUrl(url)
  }

}