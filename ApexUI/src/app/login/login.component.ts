import { Component,Input, OnInit, Output,EventEmitter } from '@angular/core';
import { APICallService } from '../apicall.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';

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

  ngOnInit(): void {
    // this.repo.getUser().subscribe((response) => {
    //   this.login = response;
    // });
  }

  getLogin(form: NgForm){
  
  let userName = form.form.value.UserName;
  let password = form.form.value.Password;

  //this._username = userName;  

    this.api.Login(userName,password).subscribe((response)=> {
      if (response == true){
        this.api.setUserName(userName)
        console.log("login -UserName")
        console.log(userName)  
        this.router.navigate(['/user'])
        //this.event.emit(this._username)
      }
      else{
        (<HTMLInputElement>document.getElementById('PasswordTextBox')).value = "";
        alert('Incorrect Password!');
      }
   }); 
  }

}

