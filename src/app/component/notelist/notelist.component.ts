import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from 'src/app/core/services/note/note.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-notelist',
  templateUrl: 'notelist.component.html'
})
export class NotelistComponent implements OnInit {
  @Input() view: boolean;
  noteForm: FormGroup;
  panelOpenState: boolean = false;
  private products: [];
  submitted = false;
  constructor(private service: NoteService) { }

  ngOnInit() {
    this.readAll();
   // this.delete1('Himalaya')
  }
  discription = new FormControl('', [Validators.required, Validators.minLength(1)]);
  title = new FormControl('', [Validators.required, Validators.minLength(1)]); 
  readAll() {
    this.service.getAll().subscribe((data: any) => {
      console.log(data);
      this.products = data;
      console.log(this.products)
    }, (error) => console.log(error));
  }

  togglePanel() {
    this.panelOpenState = !this.panelOpenState;
  }
  update(id,title, discription) {
    console.log(id,title,discription);
    this.service.update(id,title,discription)
  }

  delete(title) {
    this.service.delete(title)
  }
  getErrorMessage() {
    return this.discription.hasError('required') ?
      'You must enter a value' : this.discription.hasError('discription') ? 'Not a valid discription' : '';
}
}


