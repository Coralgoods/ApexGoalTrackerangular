import { Component, Input, OnInit } from '@angular/core';
import { APICallService } from '../apicall.service';
import { ActivatedRoute } from '@angular/router';
import { IUserStatsRecs } from '../interfaces/IUserStatsRecs';
import { IUserInfo } from '../interfaces/IUserInfo';
import { Chart, registerables } from 'chart.js';
import { waitForAsync } from '@angular/core/testing';
//import { resolve } from 'dns';
//import { threadId } from 'worker_threads';
//import { Console } from 'console';


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

DateTime:any; 
Date: any = []; 
RankScore:any; 
chart: any = []; 
NowDate = new Date();



constructor(private api: APICallService, private route: ActivatedRoute) { 
  Chart.register(...registerables);
}

UserStats!:IUserStatsRecs[]; 

  ngOnInit(): void {
    this.userName = this.route.snapshot.params['userName'];
    this.api.getUser(this.userName).subscribe(
      (response) => {this.Userinfo = response; //console.log(response);
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
         
        this.api.getUserStats(this.userName).subscribe 
        (
          (res: any[]) => {this.UserStats1 = res; 
            
            this.DateTime = this.UserStats1.allCurrentStats.map((Ustats: any) => Ustats.date)
            let date: string; 
            
            console.log(this.NowDate.toLocaleDateString())

             for(var record of this.DateTime){
             date = new Date(record).toLocaleDateString()
             //date = new Date(record).toLocaleString()
             //let datechange = date.split(' '); 
             
            this.Date.push(date); 
             }
             //console.log("Date array?")
             console.log(this.Date)

            this.RankScore = this.UserStats1.allCurrentStats.map((Ustats: any) => Ustats.rankSore)
            //console.log(res, this.DateTime, this.RankScore);
          
            //show chart data
            this.chart = new Chart(`canvas`, {
              type: 'line',
              data: {
                  labels: this.Date,
                  datasets: [{
                      label: 'Rank',
                      data: this.RankScore,
                      borderWidth: 3,
                      backgroundColor: 'rgba(93.175,86,0.1)',
                      borderColor: '#3e95cd'
                  }, {
                       label: 'Goal',
                      data: this.RankScore,
                      borderWidth: 3,
                      backgroundColor: 'rgba(93.175,86,0.1)',
                      borderColor: '#3e95cd'
                  }]
              }
          });  
          }); 

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

  logUserStats()
  {
      console.log("Test to see if button can use Userinfo")
      console.log(this.Userinfo)
      this.api.postUserStat(this.Userinfo).subscribe()
      setTimeout(function() {
        window.location.reload(); 
    }, 2000);
  }

}



