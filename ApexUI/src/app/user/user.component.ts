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
//import { Console } from 'console';
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
Date: any = []; 
Rankgoal: number = -1; 
RankgoalID: number = -1; 
chart: any = []; 
chartbar: any = []; 
NowDate = new Date();

//Mapped - Date
DateTime:any;
lastDate: string = ''; 
//Mapped - img
RankImg: any; 
Rimage: string = ''; 
//mapped - Score
RankScore:any; 
Rscore: string = ''; 
//Mapped - Legend
SelectedLegend: any; 
Legend: string = ''; 
//Mapped - RankName
SelectedRank: any; 
Rank: string = ''; 

//Mapped - RankDivName
SelectedRankDiv: any; 
rankDiv: string = ''; 

//Mapped - APex level
Selectedlevel: any; 
level: string = ''; 

//LastStatrecord: any; 
//Apex ranks
Bronze: number = 0; 
Silver: number = 1200;
Gold: number = 2800;
Platinum: number = 4800;
Diamond: number = 7200;
Master: number = 10000;
ApexPredator: number = 11979; 


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
            
            //get the Dates for chart
             let date: string; 
             for(var record of this.DateTime){
             date = new Date(record).toLocaleDateString()
             //date = new Date(record).toLocaleString()
             //let datechange = date.split(' '); 
             
            this.Date.push(date); 
             }
             this.lastDate = this.Date[this.Date.length - 1]; 
             console.log(this.lastDate ) 

            //Get Rank Score for chart
            this.RankScore = this.UserStats1.allCurrentStats.map((Ustats: any) => Ustats.rankSore)
            this.Rscore = this.RankScore[this.RankScore.length - 1];
 
            //Get last selected legend
            this.SelectedLegend  = this.UserStats1.allCurrentStats.map((img: any) => img.selectedLegend)
            this.Legend = this.SelectedLegend[this.SelectedLegend.length - 1];
            
            //Get last selected rank
            this.SelectedRank  = this.UserStats1.allCurrentStats.map((img: any) => img.rankName)
            this.Rank = this.SelectedRank[this.SelectedRank.length - 1];
            
            //Get last selected rank Div
            this.SelectedRankDiv = this.UserStats1.allCurrentStats.map((img: any) => img.rankDiv)
            this.rankDiv = this.SelectedRankDiv[this.SelectedRankDiv.length - 1];

            //Get last selected Apex level
            this.Selectedlevel = this.UserStats1.allCurrentStats.map((img: any) => img.apexLevel)
            this.level = this.Selectedlevel[this.Selectedlevel.length - 1];

            //Get last selected Apex level
            this.RankImg = this.UserStats1.allCurrentStats.map((img: any) => img.rankImg)
            this.Rimage = this.RankImg[this.RankImg.length - 1];
            console.log(this.Rimage)

            //show chart data
            this.chart = new Chart(`canvas`, {
              type: 'line',
              data: {
                  labels: this.Date,
                  datasets: [{
                      label: 'Your rank progress',
                      data: this.RankScore,
                      borderWidth: 3,
                      backgroundColor: 'rgb(0, 0, 0)',
                      borderColor: 'rgb(0, 0, 0)'
                  }
                  , {
                      label: 'RP Goal',
                      //data: [{x:'4/18/2022', y:this.Rankgoal}],
                      data: [{x: this.NowDate.toLocaleDateString(), y:this.Rankgoal}],
                      borderWidth: 3,
                      backgroundColor: 'rgb(255,255,255)',
                      //borderColor: 'rgba(93.175,86,0.1)'
                      borderColor: 'rgb(0, 0, 0)'
                  }
                  , {
                    label: 'Bronze RP',
                    //data: [{x:'4/18/2022', y:this.Rankgoal}],
                    data: [{x: this.NowDate.toLocaleDateString(), y:this.Bronze}],
                    borderWidth: 3,
                    backgroundColor: 'rgb(205, 127, 50)',
                    //borderColor: 'rgba(93.175,86,0.1)'
                    borderColor: 'rgb(205, 127, 50)'
                  }
                  , {
                    label: 'Silver RP',
                    //data: [{x:'4/18/2022', y:this.Rankgoal}],
                    data: [{x: this.NowDate.toLocaleDateString(), y:this.Silver}],
                    borderWidth: 3,
                    backgroundColor: '#rgb(211,211,211)',
                    //borderColor: 'rgba(93.175,86,0.1)'
                    borderColor: 'rgb(211,211,211)'
                  }
                  , {
                    label: 'Gold RP',
                    //data: [{x:'4/18/2022', y:this.Rankgoal}],
                    data: [{x: this.NowDate.toLocaleDateString(), y:this.Gold}],
                    borderWidth: 3,
                    backgroundColor: 'rgb(255,215,0)',
                    //borderColor: 'rgba(93.175,86,0.1)'
                    borderColor: 'rgb(255,215,0)'
                  }
                  , {
                    label: 'Platinum RP',
                    //data: [{x:'4/18/2022', y:this.Rankgoal}],
                    data: [{x: this.NowDate.toLocaleDateString(), y:this.Platinum}],
                    borderWidth: 3,
                    backgroundColor: 'rgb(229, 228, 226)',
                    //borderColor: 'rgba(93.175,86,0.1)'
                    borderColor: 'rgb(229, 228, 226)'
                  }
                  , {
                    label: 'Diamond RP',
                    //data: [{x:'4/18/2022', y:this.Rankgoal}],
                    data: [{x: this.NowDate.toLocaleDateString(), y:this.Diamond}],
                    borderWidth: 3,
                    backgroundColor: 'rgb(185,242,255)',
                    //borderColor: 'rgba(93.175,86,0.1)'
                    borderColor: 'rgb(185,242,255)'
                  }
                  , {
                    label: 'Master RP',
                    //data: [{x:'4/18/2022', y:this.Rankgoal}],
                    data: [{x: this.NowDate.toLocaleDateString(), y:this.Master}],
                    borderWidth: 3,
                    backgroundColor: 'rgb(153,50,204)',
                    //borderColor: 'rgba(93.175,86,0.1)'
                    borderColor: 'rgb(153,50,204)'
                  }
                  , {
                    label: 'Apex Predator RP',
                    data: [{x: this.NowDate.toLocaleDateString(), y:this.ApexPredator}],
                    borderWidth: 3,
                    backgroundColor: 'rgb(255,51,51)',
                    //borderColor: 'rgba(93.175,86,0.1)'
                    borderColor: 'rgb(255,51,51)'
                  }
                ]
              }
          });
          //New chart here. 
            //New Chart here. 
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



