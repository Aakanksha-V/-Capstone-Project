import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComplaintServiceService } from 'src/app/Service/complaint-service.service';

@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.css']
})
export class AddComplaintComponent implements OnInit {

  reasons: string[] = [
    'cannot make call, but receive call ',
    'can make calls, but cannot receive calls',
    'neither make nor receive calls'
  ]

  firstName:string = ""
  lastName:string = ""
  address:string=""
  pincode:number = 0
  complaint:string = ""
  tokenId:string = ""
  response : any = {"message" : "","trackingId" : ""}
  
  constructor(private service : ComplaintServiceService, private router : Router) { }

  ngOnInit(): void {
    var role = localStorage.getItem("ROLE");
    if(role === null){
      this.router.navigateByUrl('login');
    }
  }

  submit = () => {
    const compaintInfo = {
      "name" : this.firstName + " " +this.lastName,
      "address" : this.address,
      "pincode" : this.pincode,
      "issue": this.complaint,
      "status" : "RAISED",
      "userId" : localStorage.getItem("userId"),
    }
    console.log(compaintInfo)
    this.service.addComplaint(compaintInfo).subscribe(result => {
      this.response = JSON.parse(JSON.stringify(result))
      const message = this.response["message"]
      this.tokenId = this.response["trackingId"]
      this.firstName = ""
      this.lastName = ""
      this.address = ""
      this.pincode = 0
      this.complaint = ""
    });
  }

  moveTOAllComplaint = () => {
    this.router.navigateByUrl("viewComplaint")
  }


}
