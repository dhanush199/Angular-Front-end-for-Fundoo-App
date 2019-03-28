import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/model/user';
import { HttputilService } from 'src/app/httputil.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  constructor(public router: Router, public httpUtil: HttputilService, 
    ) { }
  selectedFile: File;
  user: User;
  fileToUpload: File;

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  public onUpload() {
    this.pushFileToStorage(this.selectedFile).subscribe(resp => {
      console.log(resp), (error) => {
        console.log(error);
      }
    })
    this.router.navigate(['/home'])
  }
  cancel() {
    this.router.navigate(['/home'])
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
