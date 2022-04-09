import { Component, Input, OnInit } from '@angular/core';
import { APICallService } from '../apicall.service';
import { IUser } from '../interfaces/IUser';
import { NgForm } from '@angular/forms';
import { RankService } from '../MockDataTesting/rank.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  create: any;

  constructor(private api: APICallService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  createUser(form: NgForm) 
  {
    console.log("test output")
    console.log(form)
    console.log(form.form.value)
    let user: IUser =
    {
      userName: form.form.value.userName,
      password: form.form.value.password,
      ApexID: form.form.value.ApexID
    }
    console.log(user);
    this.api.createUser(user)
  }

}
