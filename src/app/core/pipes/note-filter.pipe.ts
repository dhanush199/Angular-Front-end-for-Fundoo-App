import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../model/note';

@Pipe({
  name: 'noteFilter'
})
export class NoteFilterPipe implements PipeTransform {

  // transform(notes: any[], filterQuery: any): any[] {
  //   if (!filterQuery) return notes;
  //   return notes.filter(item =>(!item.inTrash && !item.pinned && !item.archive));
  // }

  transform(notes: Note[], valid: any): any {
    if (!valid) {
      return notes.filter((item) => {
        if (!item.inTrash && !item.pinned && !item.archive) {
          return item;
        }
      });
    }
    if (valid === 'archive') {
      return notes.filter((item) => {
        if (!item.inTrash && item.archive) {
          return item;
        }
      });
    }
    if (valid === 'trash') {
      return notes.filter((item) => {
        if (item.inTrash) {
          return item;
        }
      });
    }
    if (valid === 'pinned') {
      return notes.filter((item) => {
        if (!item.inTrash && item.pinned && !item.archive) {
          return item;
        }        
      });
    }
    return -1;
  }
}
