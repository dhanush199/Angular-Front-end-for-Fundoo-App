import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from './core/model/note';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  label: any
  search: any
  note: Note[] = []

  private messageSource = new BehaviorSubject(false);
  currentMessage = this.messageSource.asObservable();

  private NoteSource = new BehaviorSubject(this.note);
  noteMessage = this.NoteSource.asObservable();

  private labelSource = new BehaviorSubject(this.label)
  currentLabel = this.labelSource.asObservable();

  private searchDataSource = new BehaviorSubject(this.search);
  currentDataSearch = this.searchDataSource.asObservable();

  constructor() { }

  changeMessage(message: boolean) {
    this.messageSource.next(message)
  }

  notelist(note: Note[]) {
    this.note = note
    this.NoteSource.next(note);
  }


  searchData(search: String) {
    this.search = search
    this.searchDataSource.next(search);
  }

}