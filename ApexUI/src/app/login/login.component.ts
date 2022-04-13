import { Component,Input, OnInit, Output,EventEmitter } from '@angular/core';
import { APICallService } from '../apicall.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import { IUserInfo } from '../interfaces/IUserInfo';
import { IUserStats } from '../interfaces/IUserStats';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: any;
  delete: any;
  create: any;
  update: any;
  // should have login feature with username and pass
  // should have create user if someone doesnt have one
  constructor(private api: APICallService, private router: Router) { }

 _username: string = "test";
//@Output() event = new EventEmitter<string>()

//Userinfo: any = []; 
//Userinfo: any; 


//ApexID = "UnreadyEddie";
userName:string = '';
Userinfo: any;  
userID: number = 0;  
apexID: string = ''; 
//test:string = '';


  ngOnInit(): void {
    // this.repo.getUser().subscribe((response) => {
    //   this.login = response;
    // });
  }

  getLogin(form: NgForm){
  
  let userName = form.form.value.UserName;
  let password = form.form.value.Password;

//var Userinfo;
//var Userinfo: Array<any>;  
  //this._username = userName;  

    this.api.Login(userName,password).subscribe((response)=> {
      if (response == true){
        console.log("login -UserName")
        console.log(userName)  
        
        this.api.getUser(userName).subscribe(
          (response: any) => {this.Userinfo = response;}
        ) 
        this.userName = this.Userinfo.userName; 
        this.userID  = this.Userinfo.userID; 
        this.apexID  = this.Userinfo.apexID; 
        console.log("TEst user Name")
        console.log(this.userName) 
        console.log(this.userID) 
        console.log(this.apexID) 

         let useraccount: IUserInfo =
         {
          UserID: this.userID,
          UserName: this.userName,
          ApexID: this.apexID, 
         }
          //post works
         //this.api.postUserStat(useraccount) 


        this.router.navigate(['/user',userName])
        //this.event.emit(this._username)
      }
      else{
        (<HTMLInputElement>document.getElementById('PasswordTextBox')).value = "";
        alert('Incorrect Password!');
      }
   }); 
  }

}

