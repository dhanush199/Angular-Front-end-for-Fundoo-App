import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DialogData } from '../../shared-components/side-bar/side-bar.component';
import { UserService } from 'src/app/core/services/UserService/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/core/model/user';

@Component({
  selector: 'app-collaborator-dialog-box',
  templateUrl: './collaborator-dialog-box.component.html',
  styleUrls: ['./collaborator-dialog-box.component.css']
})
export class CollaboratorDialogBoxComponent implements OnInit {

  @Input() users: User
  picture: any


  constructor(public dialog: MatDialog, private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<CollaboratorDialogBoxComponent>, private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  public ngOnInit() {
    this.getUser()
  }
  public onNoClick(data, id): void {
    this.dialogRef.close();
    console.log(data)
  }

  public getUser() {
    this.userService.getUser().subscribe((resp) => {
      this.users = resp;
      this.users = {
        ...resp,
        image: `data:image/text;base64, ${resp.image}`,
        // pic: `data:image/text;base64, ${resp.pic}`
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


  addCollaborator(emailId){
    console.log(emailId)
    var user = {
      ...this.users,
      coEmailId: emailId
    };
    console.log(this.data)
    console.log(user)
    this.userService.updateUser(user)
  }

  updateNote(data,title,disc){
console.log(data)
console.log(title)
console.log(disc)

  }

}
