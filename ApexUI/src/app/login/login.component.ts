import { Component,Input, OnInit, Output,EventEmitter } from '@angular/core';
import { APICallService } from '../apicall.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import { IUserInfo } from '../interfaces/IUserInfo';


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

userName:string = '';
Userinfo: any;  
userID: number = 0;  
apexID: string = ''; 


  ngOnInit(): void {

  }

  getLogin(form: NgForm){
  
  let user = form.form.value.UserName;
  let password = form.form.value.Password;


    this.api.Login(user,password).subscribe((response)=> {
      if (response == true){
         
        // this.api.getUser(user).subscribe(
        //   (response: any) => {this.Userinfo = response;}
        // ) 
        // this.userName = this.Userinfo.userName; 
        // this.userID  = this.Userinfo.userID; 
        // this.apexID  = this.Userinfo.apexID; 
        // //console.log(this.apexID) 

        //  let useraccount: IUserInfo =
        //  {
        //   UserID: this.userID,
        //   UserName: this.userName,
        //   ApexID: this.apexID, 
        //  }
         
        //  //post works | Need more logic
        //  this.api.postUserStat(useraccount) 

        this.router.navigate(['/user',user])

      }
      else{
        (<HTMLInputElement>document.getElementById('PasswordTextBox')).value = "";
        alert('Incorrect Password!');
      }
   }); 
  }

}

