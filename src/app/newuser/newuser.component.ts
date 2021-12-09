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
  /**
   * @purpose upload the image
   */
  fileSelect(e) {
    this.selectedImage = e.target.files[0];
    if (this.selectedImage) {
      this.ImageValid = ''
    }
  }

  /**
  * @purpose submit the data using post api
  */

  submit(form, user) {
    if (form.valid && this.selectedImage) {
      user['avatar'] = this.selectedImage.name;
      this.http.post(`https://reqres.in/api/users`,user).subscribe(res => {
        console.log(res)
        let data = Object(res);
        alert('data saved');
        this.router.navigate(['home']);
      })
    } else {
      this.ImageValid = "please upload image"
    }
  }

  /**
* @purpose cancel the creation and go back to home page
*/

  cancel() {
    this.router.navigate(['home']);
  }
}
