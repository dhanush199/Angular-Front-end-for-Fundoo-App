import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Note } from '../../model/note';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  public theme$: Subject<any> = new Subject(); private label: string;
  private search: String;
  private note: Note[] = []

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
    this.note = note;
    this.NoteSource.next(note);
  }


  searchData(search: String) {
    this.search = search;
    this.searchDataSource.next(search);
  }

  public get labels(): Observable<any> {
    return this.labelSource.asObservable();;
  }

  public setTheme(themeChanged: boolean) {
    this.theme$.next(themeChanged);
  }

  public getTheme() {
    return this.theme$;
  }
}