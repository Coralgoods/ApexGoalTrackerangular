import { Component, Input, OnInit } from '@angular/core';
import { APICallService } from '../apicall.service';
import { ActivatedRoute } from '@angular/router';
import { IUserStatsRecs } from '../interfaces/IUserStatsRecs';
import { IUserInfo } from '../interfaces/IUserInfo';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
// should be able to delete user account

UserStats1: any = []
userName:string = '';
Userinfo: any;
userID: number = 0;  
apexID: string = ''; 


constructor(private api: APICallService, private route: ActivatedRoute) { }

UserStats!:IUserStatsRecs[]; 

  ngOnInit(): void {
    this.userName = this.route.snapshot.params['userName'];
    this.api.getUser(this.userName).subscribe(
      (response) => {this.Userinfo = response; console.log(response);
        //Code with post and get user status ****
        // this.api.postUserStat(this.Userinfo).subscribe(
        // ()=>{
        //   this.api.getUserStats(this.userName).subscribe 
        // (
        //   (res: any[]) => this.UserStats1 = res
        // )
        // }
        //) 
        //Code with post and get user status ****
         
        //Code with the get User stats logic | standalone ****
        this.api.getUserStats(this.userName).subscribe 
        (
          //(response) => { this.UserStats = response; }
          
          // data=>
          // {
          //   this.UserStats = data; 
          // }
          (res: any[]) => this.UserStats1 = res
        )

        //Code with the get User stats logic | standalone ****
      }
    ) 

    //this.userName = this.Userinfo.userName; 
    //this.apexID  = this.Userinfo.apexID;
    //this.userID  = this.Userinfo.userID; 
    //console.log(this.userID) 

     //let useraccount: IUserInfo = this.Userinfo
    //  {
    //   UserID: this.userID,
    //   UserName: this.userName,
    //   ApexID: this.apexID, 
    //  }
     //console.log(useraccount)
     
     //post works | Need more logic
     //this.api.postUserStat(this.Userinfo) 
     //console.log("After post Work?!")
    // this.api.getUserStats(this.userName).subscribe 
    // (
    //   //(response) => { this.UserStats = response; }
      
    //   // data=>
    //   // {
    //   //   this.UserStats = data; 
    //   // }
    //   (res: any[]) => this.UserStats1 = res
    // )
    //console.log("After get user")
    //this.banner = this.UserStats[0].banner
    //console.log("this is the banner")
    //console.log(this.userName)
  }
}

