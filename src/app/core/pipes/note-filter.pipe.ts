import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../model/note';

@Pipe({
  name: 'noteFilter'
})
export class NoteFilterPipe implements PipeTransform {

  transform(notes: Note[], valid: ''): any {
    if (!valid) {
      return notes.filter((item) => {
        if (!item.inTrash && !item.pinned && !item.archive) {
          return item;
        }
      });
    }
    if (valid === 'archive') {
      return notes.filter((item) => {
        if (!item.inTrash && !item.pinned && item.archive) {
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
        if (!item.inTrash && item.pinned) {
          return item;
        }
      });
    }
    return null;
  }
}
