import { Component, OnInit, Inject } from '@angular/core';
import { Note } from 'src/app/core/model/note';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DialogData } from '../shared-components/side-bar/side-bar.component';

@Component({
  selector: 'app-remainder-component',
  templateUrl: './remainder-component.component.html',
  styleUrls: ['./remainder-component.component.css']
})
export class RemainderComponentComponent implements OnInit {
  note:Note
  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<RemainderComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    console.log(this.data)

  }
  setRemainder(remainder) {
    console.log(remainder)
    console.log(this.data)

  }


}
