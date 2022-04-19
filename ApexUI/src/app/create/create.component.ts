import { Component, Input, OnInit } from '@angular/core';
import { APICallService } from '../apicall.service';
import { IUser } from '../interfaces/IUser';
import { NgForm } from '@angular/forms';
import { RankService } from '../MockDataTesting/rank.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IRankPut } from '../interfaces/IRankPut';
import { Router } from '@angular/router';
import { IUserInfo } from '../interfaces/IUserInfo';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  create: any;
  Userinfo: any;
  userID: number = 0;  
  apexID: string = ''; 
  userName:string = '';
  UserIDreturn: any;

  constructor(private api: APICallService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  createUser(form: NgForm) 
  {
    this.userName = form.form.value.UserName; 
    let user: IUser =
    {
      UserName: form.form.value.UserName,
      Password: form.form.value.Password,
      ApexID: form.form.value.ApexID
    }
    console.log(user);
    this.api.createUser(user).subscribe(
      (response)=> { this.UserIDreturn = response; 
      console.log(this.UserIDreturn)
      
      this.userID = this.UserIDreturn
      let rankput: IRankPut =
      {
        UserID:   this.userID,
        ApexID:   this.apexID,
        UserName: this.userName,
        RankScore: 0,
        RankName: "Nothing",
      }

      let userpost: IUserInfo =
      {
        userID: this.userID, 
        userName: this.userName,
        apexID: this.apexID,
      }
      this.api.addGoal(rankput)
      this.api.postUserStat(userpost).subscribe()
      console.log("Done")
      
    })
    //wait for the account to be created
  //   setTimeout(function() {
      
  //  console.log("5 second wait")
  //   }, 5000);

  // this.api.getUser(this.userName).subscribe(
  //   (response) => {this.Userinfo = response;
  //     this.userID  = this.Userinfo.userID;
  //     this.apexID  = this.Userinfo.apexID; 

  // let rankput: IRankPut =
  // {
  //   UserID:   this.userID,
  //   ApexID:   this.apexID,
  //   UserName: this.userName,
  //   RankScore: 0,
  //   RankName: "Nothing",
  // }
  // this.api.addGoal(rankput)
  // this.api.postUserStat(this.Userinfo).subscribe()
  // console.log("Done")
  //this.router.navigate(['/login'])


    //})

  }

}
