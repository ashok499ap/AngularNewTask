import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {

  form = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  notFirst = false
  notLast = false
  notEmail = false
  notImage = false
  ImageValid = ''
  user = { first_name: '', last_name: '', email: '' }
  selectedImage: any;
  constructor(private router: Router, private http: HttpClient) {

  }

  ngOnInit(): void {
  }




  get f() {
    return this.form.controls;
  }

  fileSelect(e) {
    this.selectedImage = e.target.files[0];
    if (this.selectedImage) {
      this.ImageValid = ''
    }
  }

  submit(form, user) {
    console.log(form, user);
    
    if (form.valid && this.selectedImage) {
      console.log('lllog', user);
      user['avatar'] = this.selectedImage.name;
      this.http.post(`https://reqres.in/api/users`,user).subscribe(res => {
        console.log('res', res);

      })
    } else {
      this.ImageValid = "please upload image"
    }
  }


  cancel() {
    this.router.navigate(['home']);
  }


}
