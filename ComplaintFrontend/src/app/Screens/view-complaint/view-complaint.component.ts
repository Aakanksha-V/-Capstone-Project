import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComplaintServiceService } from 'src/app/Service/complaint-service.service';

@Component({
  selector: 'app-view-complaint',
  templateUrl: './view-complaint.component.html',
  styleUrls: ['./view-complaint.component.css']
})
export class ViewComplaintComponent implements OnInit {

  role:string = ""
  columnInResult:string[] = []
  resultFound:any[] = []
  tableView:string = ""
  tableData: any[] = []
  response : any = { "header" : {},"body" : "","statusCodeValue":0,"statusCode": ''}
  engineerList : any[] = []
  engineerAssigned :string = ""
  engineerName:string[] = []
  status : string[] = ['RAISED','IN PROCESS','COMPLETED']

  constructor(private service:ComplaintServiceService,private router:Router) { }

  ngOnInit(): void {
    const role =  localStorage.getItem("ROLE")
    if(role === null){
      this.router.navigateByUrl('login')
    }
    switch (role) {
      case "ADMIN":
        this.columnInResult = ["Complainng User","Ragistered User","Issue","Manager","Status"]
        this.adminView()
        break;
      case "MANAGER":
        this.columnInResult = ["Complainng User","Ragistered User","Issue","Status","Engineer","Action"]
        this.managerView()
        break
      case "ENGINEER":
        this.columnInResult = ["Complainng User","Ragistered User","Issue","Status","Need To Transffer","Action"]
        this.engineerView()
        break

      default:
        this.columnInResult = ["Ticket Number","Issue","Status","FeedBack"]
        this.userView()
        break;
    }
  }

  adminView = () => {
    this.role = "ADMIN"
    this.service.adminView().subscribe(result => {
      
      this.response = JSON.parse(JSON.stringify(result))
      this.tableData = this.response["body"]["body"]["AdminData"]
      this.engineerList = this.response["body"]["body"]["ManagerList"]
      console.log(this.tableData);
      console.log(this.engineerList)
      for(let i = 0;i < this.tableData.length;i++){
        var pincodeId = parseInt(this.tableData[i][5])
        for(var data of this.engineerList){
          if(parseInt(data[0]) === pincodeId){
            this.tableData[i][5] = data[1]
          }
        }
      }
    })
  }

  managerView = () => {
    this.role = "MANAGER"
    var userId = localStorage.getItem("userId");
    this.service.getDataManager(this.role,localStorage.getItem("userId")).subscribe(result => {
      this.response = JSON.parse(JSON.stringify(result))
      console.log(this.response["body"]["body"]["engineerList"]);
      console.log(this.response["body"]["body"]["managerData"]);
      this.tableData = this.response["body"]["body"]["managerData"]
      this.engineerList = this.response["body"]["body"]["engineerList"]
      for(var data of this.engineerList){
        this.engineerName.push(data[1])
      }
      for(let data of this.tableData){
        console.log(data)
      }
      for(let index = 0; index < this.tableData.length; index++){
        let employeeId = parseInt(this.tableData[index][3])
        if(employeeId !== 0){
          console.log(employeeId)
            for(var data of this.engineerList){
              if(parseInt(data[0]) === employeeId){
                this.tableData[index][3] = data[1]
                console.log(this.tableData[index][3])
              }
            }
        }

      }
    })
  }

  engineerView = () => {
    this.role = "ENGINEER"
    this.service.getDataManager(this.role,localStorage.getItem("userId")).subscribe(result => {
      console.log()
      this.response = JSON.parse(JSON.stringify(result))
      this.tableData = this.response["body"]["body"]["engineerData"]
      console.log(this.response["body"]["body"]["engineerData"]);
      
    })
  }

  userView = () => {
    this.role = "USER"
    var userId = localStorage.getItem("userId");
    this.service.getDataUser(this.role,userId).subscribe(result => {
      this.response = JSON.parse(JSON.stringify(result))
      console.log(this.response["body"]["body"]);
      this.tableData = this.response["body"]["body"]
    })
  }

  alert(){
    alert("Alredy Assigned")
  }

  assignEngineer = (i:number) => {
    let engineerId = 0
    for(let data of this.engineerList){
      if(data[1] === this.engineerAssigned)
        engineerId = parseInt(data[0])
    }
    this.service.assignEngineer(engineerId,this.tableData[i][5]).subscribe(result => {
      alert(JSON.parse(JSON.stringify(result)))
      location.reload()
      
    })
    alert(this.tableData[i][5] + " : " + engineerId )
  }

  assignField = (index:number) => {
    this.tableData[index][4] = this.tableData[index][4] === "YES"?"NO":"YES";
    
  }

  update = (index:number) => {
    this.service.updateComplaint(this.tableData[index][4],this.tableData[index][3],this.tableData[index][5]).subscribe(result =>{
      alert(JSON.parse(JSON.stringify(result))["body"])
      location.reload();
    })
  }

  superDataSet = () => {
    this.router.navigateByUrl('admin/access')
  }
}
