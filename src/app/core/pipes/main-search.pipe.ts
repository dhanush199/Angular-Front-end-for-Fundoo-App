import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../model/note';

@Pipe({
  name: 'searchFilter'
})
export class MainSearchPipe implements PipeTransform {

  transform(notes: Note[], searchText: string): any[] {
   console.log(notes)
    return notes.filter(({ title }) => {
      return title.includes(searchText);
    });
  }
}
