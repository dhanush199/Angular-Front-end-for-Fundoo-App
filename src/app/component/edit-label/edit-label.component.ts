import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material/dialog';
import { LabelService } from 'src/app/core/services/LabelService/label.service';

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
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private labelservice: LabelService) { }

  public ngOnInit() {
  }

  public onNoClick(data, id): void {
    this.dialogRef.close();
    console.log(data);
  }

  public deletLabel(label) {
    this.labelservice.deleteLabel(label).subscribe((resp: any) => {
    }, (error) => console.log(error));
  }

  public onUpdateLabel(label) {
    this.labelservice.updateLabel(label).subscribe((resp: any) => {
      console.log(resp);
    }, (error) => console.log(error));
  }

  public createlabel(labelName) {
    if (labelName != null) {
      const label = {
        "labelName": labelName,
      }
      this.labelService.createLabel(label).subscribe((resp: any) => {
        console.log(resp);
      }, (error) => console.log(error));
    }
  }
}
