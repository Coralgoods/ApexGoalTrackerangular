import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from './interfaces/IUser';
import { IRank } from './interfaces/IRank';



@Injectable({
  providedIn: 'root'
})
export class APICallService {
  private localHostNumber = 44381;
  private apiUri: string = `https://localhost:${this.localHostNumber}/user`
  private apiRankUri: string = `https://localhost:${this.localHostNumber}/usergoal`

  constructor(private http: HttpClient) {}
    getUser(){
      return this.http.get(this.apiUri)
    }

    //rank methods 
    getGoal()
    {
      return this.http.get(this.apiRankUri);
    }
    updateGoal(rank: IRank, userName:string, goalId:number) 
    {
      return this.http.put(`https://localhost:${this.localHostNumber}/usergoal/${userName}/${goalId}`, rank).subscribe()
    }
    addGoal(rank: IRank) 
    {
      return this.http.post(this.apiRankUri, rank).subscribe()
    }
    deleteGoal(id: number) 
    {
      return this.http.delete(`${this.apiRankUri}/${id}`).subscribe();
    }
    //rank method end
}

