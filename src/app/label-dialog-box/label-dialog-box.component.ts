import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DialogData } from '../component/notelist/notelist.component';
import { LabelService } from '../core/services/LabelService/label.service';

@Component({
  selector: 'app-label-dialog-box',
  templateUrl: './label-dialog-box.component.html',
  styleUrls: ['./label-dialog-box.component.css']
})
export class LabelDialogBoxComponent implements OnInit {
  @Input() 
  labels: []
  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<LabelDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private labelService: LabelService,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.labelService.getLabels().subscribe((resp: any) => {
      this.labels = resp
      console.log(resp)
    }, (error) => console.log(error));
  }

  onNoClick(data, id): void {
    this.dialogRef.close();
    console.log(data);
  }

  onAddLabel(label){
    this.labelService.mapLabelTONote(label,this.data).subscribe((resp:any)=>{
      this.snackBar.open("lsbel has been added", "ok", {
        duration: 2000,
      });
    }    )
    ,(error)=>{
      console.log(error)
    }
  }
}
