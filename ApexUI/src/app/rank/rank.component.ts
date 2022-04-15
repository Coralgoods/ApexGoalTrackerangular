import { Component, Input, OnInit } from '@angular/core';
import { APICallService } from '../apicall.service';
import { IRank } from '../interfaces/IRank';
import { NgForm } from '@angular/forms';
import { RankService } from '../MockDataTesting/rank.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IRankPut } from '../interfaces/IRankPut';

@Component
({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit 
{
  //rank: any = [];
  rank: any; 
  userName = "Unknown";
  Userinfo: any;  
  userID: number = 0; 
  goalID: number = 0;  
  apexID: string = ''; 
 
  constructor(private api: APICallService, private route: ActivatedRoute) { }

  ngOnInit(): void 
  {
    this.userName = this.route.snapshot.params['userName'];

    this.api.getGoal(this.userName).subscribe
    (
      //(response: any) => { this.rank = response; }
      (res) => {this.rank = res; console.log(res);console.log("Here")} 
    )
  }

Goalupdate(form: NgForm)
{
  this.api.getUser(this.userName).subscribe(
    (response: any) => {this.Userinfo = response;}
  ) 

  this.userID  = this.Userinfo.userID; 
  this.apexID  = this.Userinfo.apexID;
  //let rankScore = form.form.value.rankScore
  
  let rankput: IRankPut =
  {
    //GoalID:   this.goalID,
    UserID:   this.userID,
    UserName: this.userName,
    RankScore: form.form.value.rankScore,
    RankName: form.form.value.rankName,
    ApexID:   this.apexID,
  }
  console.log(rankput)
  this.api.updateGoal(rankput,13)
}


  createGoal(form: NgForm) 
  {
    // console.log("This is what is passed")
    // console.log(form.form.value.rankScore)
    // console.log(form.form.value.rankName)

    this.api.getUser(this.userName).subscribe(
      (response: any) => {this.Userinfo = response;}
    ) 
 

    this.userID  = this.Userinfo.userID; 
    this.apexID  = this.Userinfo.apexID;

    let rankScore = form.form.value.rankScore
    console.log("rank Score below")
    console.log(rankScore)
    let rank: IRank =
    {
      UserID:   this.userID,
      ApexID:   this.apexID,
      UserName: this.userName,
      RankScore: form.form.value.rankScore,
      RankName: form.form.value.rankName
    }
    this.api.addGoal(rank)

    console.log(rank)
  }

  // deleteGoal(id: number) 
  // {
  //   this.api.deleteGoal(id);
  //   window.location.reload();
  // }
  
  //need to test

  // updateGoal(form: NgForm, id: number) 
  // {
  //   let rank: IRank =
  //   {
  //     userName: form.form.value.userName,
  //     rankScore: form.form.value.rankScore,
  //     rankName: form.form.value.rankName
  //   }
  //   this.api.updateGoal(rank);
  //   window.location.reload();
  // }


}
