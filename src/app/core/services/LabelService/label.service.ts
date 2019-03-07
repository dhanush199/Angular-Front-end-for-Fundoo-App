import { Injectable } from '@angular/core';
import { HttputilService } from '../../../httputil.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LabelService {
  public API = '//localhost:8081/user';
  constructor(private http: HttputilService) { }

  getLabels() {
    var header = this.getHeader()
    return this.http.get(this.API + '/retrievelabel', header);
  }

  getHeader() {
    var token = localStorage.getItem('token')
    const httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return httpheaders;
  }

  deleteLabel(label) {
    var token = localStorage.getItem('token')
    console.log(label.labelName)
    var labelName = label.labelName
    return this.http.deleteWithParams(this.API + '/deletelabel/' + token, {
      params: {
        labelName: labelName
      }
    });
  }

  updateLabel(label) {
    var header = this.getHeader()
    return this.http.put(this.API + '/editlabel', label, header);
  }

  createLabel(label){
    var header = this.getHeader()
    return this.http.postWithBody(this.API + '/createlabel', label, header);
  }

  mapLabelTONote(label,note){
    var header = this.getHeader()
    var noteId= note.id
    var labelId=label.id
    return this.http.put(this.API + '/map-note-label/'+noteId+'/'+labelId,1, header);
  }
}
