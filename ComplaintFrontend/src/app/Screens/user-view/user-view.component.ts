import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComplaintServiceService } from 'src/app/Service/complaint-service.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  roles:string[] = [
    'User',
    'Manager',
    'Engineer'
  ]
  roleAssigned:string = "SELECT THE ROLE"
  addButtonText:string = "ADD USER";
  id:number = 0;
  name:string = ""
  tableData:string[] = []

  constructor(private router:Router,private service:ComplaintServiceService) { }

  ngOnInit(): void {
    var role = localStorage.getItem("ROLE")
    console.log(role)
    if(role === null){
      this.router.navigateByUrl('login')
    }
    if(role === 'MANAGER' || role === 'ENGINEER'){
      this.router.navigateByUrl('viewComplaint');
    }
    if(role === 'USER'){
      this.router.navigateByUrl('addComplalint')
    }
    this.getAllUser()
  }

  addUser = () => {
    if(this.addButtonText === "ADD USER"){
        this.service.addUser(this.id,this.name,this.roleAssigned).subscribe(result => {
          alert(result)
          location.reload();
        })
    }else if(this.addButtonText === "Update User"){
        
        this.service.updateUser(this.id,this.name,this.roleAssigned).subscribe(result => {
          alert(result)
          location.reload();
          this.addButtonText = "ADD USER"
        })
    }
  }

  getAllUser = () => {
    this.service.getAllUsers().subscribe(result => {
      this.tableData =  JSON.parse(JSON.stringify(result))
      this.id = this.tableData.length+1
      
    })
  }

  update = (index:number) => {
    this.addButtonText = "Update User"
    this.id = parseInt(this.tableData[index][0])
    this.name = this.tableData[index][1]
    this.roleAssigned = this.tableData[index][3]
  }

  deleteUser = (index:number) => {
    this.service.deleteUser(parseInt(this.tableData[index][0])).subscribe(result => {
          alert(result)
          location.reload();
    })
  }
}
