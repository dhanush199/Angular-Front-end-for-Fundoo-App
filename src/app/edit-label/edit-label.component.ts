import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import{ MatDialogRef}from '@angular/material/dialog';
import { DialogData } from '../component/notelist/notelist.component';
import { LabelService } from '../label.service';
import { Label } from '../label';

export interface DialogData {
  labelName: string;
}

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.css']
})
export class EditLabelComponent implements OnInit {
  labelName: string;
  
  constructor(public dialog: MatDialog, private labelService: LabelService,
    public dialogRef: MatDialogRef<EditLabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private labelservice:LabelService) { }

  ngOnInit() {

  }

  onNoClick(data,id): void {
    this.dialogRef.close();
    console.log(data);
  }
  deletLabel(label){
this.labelservice.deleteLabel().subscribe((resp: any) => {
  this.products = resp
  console.log(resp)
}, (error) => console.log(error));
  
}


