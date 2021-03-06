import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name: any
  public userData: any = []
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getUserList()
  }
  /**
   *   @purpose get the registered users list
   */
 
  
  getUserList() {
    let listData: any = []
    this.http.get('https://reqres.in/api/users').subscribe(res => {
      listData = Object(res)
      this.userData = listData.data
    })
  }

  /**
   * @purpose added the new user 
   */ 
  createNewUser() {
    this.router.navigate(['new-user'])
  }
}
