import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NoteService } from 'src/app/core/services/NoteService/note.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css']
})
export class NoteCreateComponent implements OnInit {
  public createNoteForm: FormGroup;
  public submitted = false;
  public panelOpenState = false;
   private temp: any;
  constructor(private noteService: NoteService,private snackBar: MatSnackBar,
    private formBuilder: FormBuilder) { }

    public ngOnInit() {
    this.createNoteForm = this.formBuilder.group({
      title: [''],
      discription: ['']
    });
    this.readAll()
  };
  get f() { return this.createNoteForm.controls; }

  public onSubmit(note) {
    this.submitted = true;
    if (this.createNoteForm.invalid) {
      return;
    }
    this.temp = !note.discription;
    this.noteService.save(note).subscribe(resp=>{
      console.log(resp);
      this.snackBar.open("Successfully created", "Ok", {
        duration: 2000,
      });
    },(error)=>{
      console.log(error);
    })
  }
  public readAll() {
    this.noteService.getAll().subscribe((resp: any) => {
      console.log(resp);
    }, (error) => console.log(error));
  }
}
