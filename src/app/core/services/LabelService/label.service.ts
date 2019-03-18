import { Injectable } from '@angular/core';
import { HttputilService } from '../../../httputil.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LabelService {
  public API = '//localhost:8081/user';
  constructor(private http: HttputilService) { }

  public getLabels() {
    var header = this.getHeader()
    return this.http.get(this.API + '/retrievelabel', header);
  }

  public getHeader() {
    var token = localStorage.getItem('token')
    const httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return httpheaders;
  }

  public deleteLabel(label) {
    var token = localStorage.getItem('token')
    console.log(label.labelName)
    var labelName = label.labelName
    return this.http.deleteWithParams(this.API + '/deletelabel/' + token, {
      params: {
        labelName: labelName
      }
    });
  }

  public updateLabel(label) {
    var header = this.getHeader()
    return this.http.put(this.API + '/editlabel', label, header);
  }

  public createLabel(label){
    var header = this.getHeader()
    return this.http.postWithBody(this.API + '/createlabel', label, header);
  }

  public mapLabelTONote({id: labelId},{id: noteId}){
    const header = this.getHeader();
    const url = `${this.API}/map-note-label/${noteId}/${labelId}`;
    return this.http.put(url,{}, header);
  }

  public removeLabelNote(label,note){
    var noteId= note.id
    var labelId=label.id
    var header = this.getHeader()
    return this.http.delete(this.API + '/removenote&label/'+noteId+'/'+labelId, header);
  }
}
