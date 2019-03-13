import { Component, OnInit } from '@angular/core';
import { HttputilService } from '../httputil.service';
import { User } from '../core/model/user';
import { HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {

  constructor(public httpUtil: HttputilService) {}
  
  selectedFile: File
  user: User
  fileToUpload: File

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  public onUpload() {

    this.pushFileToStorage(this.selectedFile).subscribe(resp => {
      console.log(resp), (error) => {
        console.log(error)
      }
    })
  }

  pushFileToStorage(file: File) {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    var token = localStorage.getItem('token')
    return this.httpUtil.put('http://localhost:8080/user/uploadFile/' + token, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

  }
}
