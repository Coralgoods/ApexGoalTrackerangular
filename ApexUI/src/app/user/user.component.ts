import { Component, Input, OnInit } from '@angular/core';
import { APICallService } from '../apicall.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IUserStatsRecs } from '../interfaces/IUserStatsRecs';
import { LoginComponent } from '../login/login.component';
import { isConstructorDeclaration } from 'typescript';
import { AppComponent } from '../app.component';
import { IUserStatsRecsHeader } from '../interfaces/IUserStatsRecsHeader';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
// should be able to delete user account

UserStats1: any = []
//ApexID = "UnreadyEddie";
userName:string = '';

constructor(private api: APICallService, private route: ActivatedRoute) { }

UserStats!:IUserStatsRecs[]; 

  ngOnInit(): void {
    this.userName = this.route.snapshot.params['userName'];

    //this.userName = this.api.getUserName()
    console.log("User comp - Username below")
    console.log(this.userName)


    this.api.getUserStats(this.userName).subscribe 
    (
      //(response) => { this.UserStats = response; }
      
      // data=>
      // {
      //   this.UserStats = data; 
      // }
      (res: any[]) => this.UserStats1 = res
    )
    //console.log("User comp - API pull")
    console.log(this.userName)
    //console.log("Check indicator")
  }

}

