import { Component, Input, OnInit } from '@angular/core';
import { APICallService } from '../apicall.service';
import { ActivatedRoute } from '@angular/router';
import { IUserStatsRecs } from '../interfaces/IUserStatsRecs';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
// should be able to delete user account

UserStats1: any = []
userName:string = '';
//banner: string = ''; 

constructor(private api: APICallService, private route: ActivatedRoute) { }

UserStats!:IUserStatsRecs[]; 

  ngOnInit(): void {
    this.userName = this.route.snapshot.params['userName'];

    this.api.getUserStats(this.userName).subscribe 
    (
      //(response) => { this.UserStats = response; }
      
      // data=>
      // {
      //   this.UserStats = data; 
      // }
      (res: any[]) => this.UserStats1 = res
    )
    //this.banner = this.UserStats[0].banner
    //console.log("this is the banner")
    console.log(this.userName)
  }

}

