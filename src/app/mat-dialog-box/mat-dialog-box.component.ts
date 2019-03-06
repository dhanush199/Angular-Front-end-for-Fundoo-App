import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditLabelComponent, DialogData } from '../edit-label/edit-label.component';
import { Label } from '../label';
import { LabelService } from '../label.service';

@Component({
  selector: 'app-mat-dialog-box',
  templateUrl: './mat-dialog-box.component.html',
  styleUrls: ['./mat-dialog-box.component.css']
})
export class MatDialogBoxComponent {

  constructor(
    public dialogRef: MatDialogRef<EditLabelComponent>,
    private labelservice: LabelService,public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.labelservice.getLabels().subscribe((resp: any) => {
      console.log(resp)
    }, (error) => console.log(error));
  }

}
