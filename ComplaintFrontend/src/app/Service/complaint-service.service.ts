import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ComplaintServiceService {

  url : string = "http://localhost:8080"
  headeroption = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  session = () => {
    setTimeout(() => {
      localStorage.clear();
      this.router.navigateByUrl('login');
      alert("session timeout")
    },500000);
  }
  constructor(private http : HttpClient,private router : Router) { }

  login(userName : string,password : string):Observable<Object> {
    console.log(User)
     return this.http.post(this.url+"/login",{"username" : userName,"password" : password},{responseType : 'json'});
  }

  addComplaint(complaint:any):Observable<Object> {
    return this.http.post(this.url+"/addComplaint",complaint,{responseType : 'json'});
  }

  getDataUser(role:string,userId:any):Observable<Object> {
    return this.http.get(this.url+"/viewComplaint/"+role+"/"+userId,{responseType : 'json'})
  }

  getDataManager(role:string,userId:any):Observable<object> {
    return this.http.get(this.url+"/viewComplaint/"+role+"/"+userId,{responseType : 'json'})
  }

  assignEngineer(engineerId:number,trackingId:string):Observable<Object> {
    return this.http.post(this.url+"/addEngineer/"+engineerId+"/"+trackingId,{responseType : 'json'})
  }

  adminView():Observable<Object>{
    return this.http.get(this.url+"/getAll",{responseType : 'json'})
  }

  engineerView(userId:number):Observable<Object>{
    return this.http.get(`${this.url}/viewComplaint/${userId}`,{responseType : 'json'});
  }

  updateComplaint(field:string,status:string,trackingId:string):Observable<Object> {
    return this.http.post(`${this.url}/${trackingId}/${status}/${field}`,{responseType : 'json'})
  }

  getAllUsers():Observable<object>{
    return this.http.get(`${this.url}/allUsers`,{responseType : 'json'});
  }

  addUser(id:number,name:string,role:string):Observable<string>{
    return this.http.post(`${this.url}/addUser`,{"id" : id,"name" : name,"role" : role},{responseType : 'text'});
  }

  updateUser(id:number,name:string,role:string):Observable<string>{
    return this.http.post(`${this.url}/updateUser`,{"id" : id,"name" : name,"role" : role},{responseType : 'text'});
  }

  deleteUser(id:number):Observable<string>{
    return this.http.delete(`${this.url}/deleteUser/${id}`,{responseType : 'text'});
  }
}
