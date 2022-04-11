import { Component, Input, OnInit } from '@angular/core';
import { APICallService } from '../apicall.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IUserStatsRecs } from '../interfaces/IUserStatsRecs';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
// should be able to delete user account

UserStats1: any = []


ApexID = "UnreadyEddie";
//rank: any = [];
//userName = "Unknown";

constructor(private api: APICallService, private route: ActivatedRoute) { }

UserStats!:IUserStatsRecs[]; 

  ngOnInit(): void {
    //this.ApexID = this.route.snapshot.params['ApexID'];

    this.api.getUserStats(this.ApexID).subscribe 
    (
      //(response) => { this.UserStats = response; }
      
      // data=>
      // {
      //   this.UserStats = data; 
      // }

      (res: any[]) => this.UserStats = res

    )
    console.log("On Init flag")
    //console.log(this.UserStats)
    //console.log("Check indicator")
  }





}
