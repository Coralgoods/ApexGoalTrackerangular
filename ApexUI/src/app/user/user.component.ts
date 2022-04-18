import { Component, Input, OnInit } from '@angular/core';
import { APICallService } from '../apicall.service';
import { ActivatedRoute } from '@angular/router';
import { IUserStatsRecs } from '../interfaces/IUserStatsRecs';
import { IUserInfo } from '../interfaces/IUserInfo';
import { Chart, registerables } from 'chart.js';
import { waitForAsync } from '@angular/core/testing';
import { ThisReceiver } from '@angular/compiler';
import { NgForm } from '@angular/forms';
import { IRankPut } from '../interfaces/IRankPut';
//import { resolve } from 'dns';
//import { threadId } from 'worker_threads';
//import { Console } from 'console';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

UserStats1: any = []
userName:string = '';
Userinfo: any;
userID: number = 0;  
apexID: string = ''; 
rank: any; 

DateTime:any; 
Date: any = []; 
RankScore:any; 
Rankgoal: number = -1; 
RankgoalID: number = -1; 
chart: any = []; 
NowDate = new Date();



constructor(private api: APICallService, private route: ActivatedRoute) { 
  Chart.register(...registerables);
}

UserStats!:IUserStatsRecs[]; 

  ngOnInit(): void {
    this.userName = this.route.snapshot.params['userName'];
    
    this.api.getGoal(this.userName).subscribe(
      (res) => {this.rank = res; console.log(res)
      //this.Rankgoal = this.rank.map((Gstats: any)=> Gstats.rankScore)
      this.Rankgoal =  this.rank?.rankScore
      this.RankgoalID = this.rank?.goalID
    
    this.api.getUser(this.userName).subscribe(
      (response) => {this.Userinfo = response; console.log(response);
        this.userID  = this.Userinfo.userID;
        this.apexID  = this.Userinfo.apexID;  
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
             //console.log(this.Date)

            this.RankScore = this.UserStats1.allCurrentStats.map((Ustats: any) => Ustats.rankSore)
            //console.log(res, this.DateTime, this.RankScore);
          
            //show chart data
            this.chart = new Chart(`canvas`, {
              type: 'line',
              data: {
                  labels: this.Date,
                  datasets: [{
                      label: 'Your rank progress',
                      data: this.RankScore,
                      borderWidth: 3,
                      backgroundColor: 'rgba(93.175,86,0.1)',
                      borderColor: '#3e95cd'
                  }
                  , {
                       label: 'Goal',
                      data: [{x:'4/15/2022', y:this.Rankgoal}],
                      borderWidth: 3,
                      backgroundColor: '#3e95cd',
                      //borderColor: 'rgba(93.175,86,0.1)'
                      borderColor: '#3e95cd'
                  }
                ]
              }
          });  
          }); 
      }
    ) 
  })
  }

  Goalupdate(form: NgForm)
{
  let rankput: IRankPut =
  {
    UserID:   this.userID,
    UserName: this.userName,
    RankScore: form.form.value.rankScore,
    //RankName: form.form.value.rankName,
    RankName: "Nothing",
    ApexID:   this.apexID,
  }
  this.api.updateGoal(rankput,this.RankgoalID)
  setTimeout(function() {
    window.location.reload(); 
}, 2000);
}

  logUserStats()
  {
      this.api.postUserStat(this.Userinfo).subscribe()
      setTimeout(function() {
        window.location.reload(); 
    }, 2000);
  }

}



