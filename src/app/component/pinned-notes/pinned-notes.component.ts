import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UpdateNoteComponent } from '../update-notes/update-notes.component';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Note } from 'src/app/core/model/note';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NoteService } from 'src/app/core/services/NoteService/note.service';
import { LabelDialogBoxComponent } from 'src/app/label-dialog-box/label-dialog-box.component';
import { LabelService } from 'src/app/core/services/LabelService/label.service';
import { DataServiceService } from 'src/app/core/services/Data-service/data.service';

@Component({
  selector: 'app-pinned-notes',
  templateUrl: './pinned-notes.component.html',
  styleUrls: ['./pinned-notes.component.scss']
})
export class PinnedNotesComponent implements OnInit {
  @Input() products: Note;
  @Input() view:boolean
  @Output() onStatusChange = new EventEmitter<boolean>();
grid=false

  togle = true
  pinnedForm: FormGroup;
  panelOpenState: boolean = false;
  submitted = false;
  removable=true;
  fillTheColor;
  colorMenu=false;
  colors = [
    "#fff",'#FFFF00','#FFFAFA','#B0E0E6','#FFC0CB',
    '#00FA9A','#E0FFFF','	#ADFF2F','#00FFFF','#DEB887',
    '#BA55D3','#FF0000'
  ]
  constructor(private router: Router, private service: NoteService, 
    private dialog: MatDialog,private snackBar: MatSnackBar,private data:DataServiceService,
    private labelService:LabelService) { }

    public ngOnInit() {
      this.data.currentMessage.subscribe((message:any) => {
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
      this.service.updateNote(products, products.id).subscribe(resp=>{
        console.log(resp)
      },(error)=>{
        console.log(error)
      })
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
    this.service.updateNote(products, products.id).subscribe(resp=>{
      console.log(resp)
    },(error)=>{
      console.log(error)
    })
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

  colorChange() {
    if (this.colorMenu)
      this.colorMenu = false
    else
      this.colorMenu = true;
  }

  addColor(color, products) {
    this.fillTheColor = color;
    products.colore = color;
    console.log(color);
    console.log(products);
    this.service.updateNote(products, products.id).subscribe(resp => {
      console.log(resp)
    }, (error) => {
      console.log(error)
    })
    // this.readAll()
  }
  public readAll() {
    this.service.getAll().subscribe((resp: any) => {
      this.products = resp;
    }, (error) => console.log(error));
  }

  changeStatus(finished: boolean) {
    this.onStatusChange.emit(finished);
  }
 
}
