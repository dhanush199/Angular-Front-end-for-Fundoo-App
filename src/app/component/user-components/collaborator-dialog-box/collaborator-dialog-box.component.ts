import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { DialogData } from '../../shared-components/side-bar/side-bar.component';
import { UserService } from 'src/app/core/services/UserService/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/core/model/user';
import { FormControl, Validators } from '@angular/forms';
import { Collaborator } from 'src/app/core/model/collaborator';
import { NoteService } from 'src/app/core/services/NoteService/note.service';

@Component({
  selector: 'app-collaborator-dialog-box',
  templateUrl: './collaborator-dialog-box.component.html',
  styleUrls: ['./collaborator-dialog-box.component.css']
})

export class CollaboratorDialogBoxComponent implements OnInit {
  @Input() users: User
  @Input()products
  picture: any
  disc: String
  emails: []
  collabUser: []
   notes: []
  coUser;
  noteOwner:string
  collaboratedUser: Collaborator
  constructor(public dialog: MatDialog, private sanitizer: DomSanitizer, private noteService: NoteService,
    public dialogRef: MatDialogRef<CollaboratorDialogBoxComponent>, private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data, private snackBar: MatSnackBar
  ) { }

  public ngOnInit() {
    var notes={
      ...this.data
    }
//this.readAll()    // this.noteOwner=this.notes.userId
    this.getUser();
    this.userService.getCollUser().subscribe((resp: any) => {
      this.emails = resp
      console.log(resp)
    }, (error) => console.log(error));
   

  }
  emailId = new FormControl('', [Validators.required, Validators.minLength(1)]);

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

  public onAddCollab(email, note) {
    const arry = JSON.stringify(this.data)
    if (arry.search(email) == -1) {
      this.getCollaboraterId(email).subscribe(resp => {
        this.coUser = resp
       console.log(this.coUser)
       this.snackBar.open("added successfully", "Ok", {
        duration: 2000,
      });
     }, (error) => {
       console.log(error)
     })

      let collaboratedUser =
      {
        collEmailId: email,
        noteId: note.id,
        ownerId:this.coUser.id
      };
      this.noteService.doCollab(collaboratedUser).subscribe(resp => {
        console.log(resp)
        this.snackBar.open("added successfully", "Ok", {
          duration: 2000,
        });
      }, (error) => {
        console.log(error)
      })
    } else {
      this.snackBar.open("user already present", "Ok", {
        duration: 2000,
      });
    }
  }

  public deleteCollab(email, note, collId) {
    let collaboratedUser =
    {
      id: collId,
      collEmailId: email,
      noteId: note.id

    };
    this.noteService.removeCollab(collaboratedUser).subscribe(resp => {
      console.log(resp)
    }, (error) => {
      console.log(error)
    })
    console.log(this.data)
  }

  public getCollaboraterId(email) {
    return this.userService.getCollUserId(email);
  }   
}
