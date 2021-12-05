import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ComplaintSystemFrontend';
  role : boolean =false

  constructor(private router : Router){}

  ngOnInit() : void {
    var role = localStorage.getItem("ROLE");
     if(role === null){
       this.role = false;
     }else if(role !== null){
       this.role = true
     }
  }

  signout(){
    localStorage.clear();
    this.role = false
    this.router.navigateByUrl('login')
  }
}
