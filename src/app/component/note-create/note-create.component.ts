import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoteService } from 'src/app/core/services/NoteService/note.service';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css']
})
export class NoteCreateComponent implements OnInit {
  public createNoteForm: FormGroup;
  public submitted = false;
  public panelOpenState = false;
  private temp: any
  constructor(private noteService: NoteService,
    private formBuilder: FormBuilder) { }

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
    this.temp = !note.discription;
    this.noteService.save(note);
  }
}
