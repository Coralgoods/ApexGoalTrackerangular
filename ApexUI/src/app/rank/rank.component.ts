import { Component, Input, OnInit } from '@angular/core';
import { APICallService } from '../apicall.service';
import { IRank } from '../interfaces/IRank';
import { NgForm } from '@angular/forms';
import { RankService } from '../MockDataTesting/rank.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component
({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit 
{
  rank: any = [];
  userName = "Unknown";
 
  constructor(private api: APICallService, private route: ActivatedRoute) { }

  ngOnInit(): void 
  {
    this.userName = this.route.snapshot.params['userName'];

    this.api.getGoal(this.userName).subscribe
    (
      (response) => { this.rank = response; }
    )
  }

  //test data
  // goalDetails: IRank[] | undefined

  // constructor(private api: RankService){}

  // ngOnInit(): void 
  // {
  //   this.goalDetails = this.api.listAllGoals()
  // }
  //end test data

  createGoal(form: NgForm) 
  {
    let rank: IRank =
    {
      userName: form.form.value.userName,
      rankScore: form.form.value.rankScore,
      rankName: form.form.value.rankName
    }
    this.api.addGoal(rank)
  }

  deleteGoal(id: number) 
  {
    this.api.deleteGoal(id);
    window.location.reload();
  }
  
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
