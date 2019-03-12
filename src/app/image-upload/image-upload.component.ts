import { Component, OnInit } from '@angular/core';
import { HttputilService } from '../httputil.service';
import { User } from '../core/model/user';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
constructor(public httpUtil:HttputilService){

}
  selectedFile: File
  user:User

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    user:{
      userName:'Dhanush'
      password:'dhanush@1234'
      emailId:'dhanush@123.com'
      mobileNumber:'9620377956'
    }
    this.user.image(this.selectedFile)
    this.httpUtil.post('http://localhost:8080/user/registeruser',this.user)
      .subscribe(resp=>{
        console.log("uploaded")
        console.log(this.selectedFile)
      },(error)=>{
        console.log(error)
      })
  }
}
