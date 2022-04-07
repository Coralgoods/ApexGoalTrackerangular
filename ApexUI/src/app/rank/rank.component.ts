import { Component, OnInit } from '@angular/core';
import { APICallService } from '../apicall.service';
import { IRank } from '../interfaces/irank';
import { NgForm } from '@angular/forms';

@Component
({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit 
{
  rank: any = [];
// displays current rank
//allows user to edit goals, or delete them
  constructor(private api: APICallService) { }

  ngOnInit(): void 
  {
    this.api.getGoal().subscribe
    (
      (response) => { this.rank = response; }
    )
  }

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

  deleteGoal(id: number) 
  {
    this.api.deleteGoal(id);
    window.location.reload();
  }
}
