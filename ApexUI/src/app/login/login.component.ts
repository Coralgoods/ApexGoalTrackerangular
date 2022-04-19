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
  //login: any;
  //delete: any;
  //create: any;
  //update: any;

  constructor(private api: APICallService, private router: Router) { }

//userName:string = '';
//Userinfo: any;  
//userID: number = 0;  
//apexID: string = ''; 

  ngOnInit(): void {

  }

  getLogin(form: NgForm){
  
  let user = form.form.value.UserName;
  let password = form.form.value.Password;
 console.log("Tried to log in")
 console.log(user)

    this.api.Login(user,password).subscribe((response)=> {
      if (response == true){
        this.router.navigate(['/user',user])
      }
      else{
        (<HTMLInputElement>document.getElementById('PasswordTextBox')).value = "";
        alert('Incorrect Password!');
      }
   }); 
  }

}

