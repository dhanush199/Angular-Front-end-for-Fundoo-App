import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoteService } from 'src/app/core/services/note/note.service';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css']
})
export class NoteCreateComponent implements OnInit {
  createNoteForm: FormGroup;
  submitted = false;
  panelOpenState = false;
  temp:any
  constructor(private NoteService: NoteService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createNoteForm = this.formBuilder.group({
      title: [''],
      discription: ['']
      //, Validators.required
    });

  };
  get f() { return this.createNoteForm.controls; }
  public onSubmit(note) {
    this.submitted = true;
    console.log(this.createNoteForm.value)
    if (this.createNoteForm.invalid) {
      return;
    }
    this.temp=!note.discription;   
     this.NoteService.save(note);
  }

  // panelOpen(title, discription) {
  //   var note = {
  //     "title": title,
  //     "discription": discription
  //   }
  //   console.log(note)
  //   this.NoteService.save(note);
  // }
}
