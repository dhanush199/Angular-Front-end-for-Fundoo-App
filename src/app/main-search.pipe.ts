import { Pipe, PipeTransform, ɵConsole } from '@angular/core';
import { IterableChangeRecord_ } from '@angular/core/src/change_detection/differs/default_iterable_differ';
import { Note } from './core/model/note';

@Pipe({
  name: 'searchFilter'
})
export class MainSearchPipe implements PipeTransform {




  transform(notes: Note[], searchText: string): any[] {
   console.log(notes)
    return notes.filter(({ title }) => {
      return title.includes(searchText);
    });
    //   var re = new RegExp(searchText);
    //   console.log("my search text ",searchText)
    //   console.log("my Array  ",values)
    //   if(!values) return [];
    //   if(!searchText) return values;
    //   return values.filter((value) => {
    //     if(searchText.length >= 2) {
    //       var outputTitle = (value.title).match(re)
    //       var outputDescription = (value.discription).match(re)
    //       var titleFound = true;
    //       var descriptionFound = true;
    //       if(outputTitle == null) {
    //         titleFound = false;
    //       }
    //       if(outputDescription == null) {
    //         descriptionFound = false;
    //       }
    //       if(titleFound || descriptionFound){
    //         return true
    //       }
    //       return false;
    //     } else {
    //       return false
    //     }

    // });
  }
}
