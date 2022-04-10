import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from './interfaces/IUser';
import { IRank } from './interfaces/IRank';
import { IUserStats } from './interfaces/IUserStats';



@Injectable({
  providedIn: 'root'
})
export class APICallService {

  // private localHostNumber = 44381;
  private localHostNumber = 44397; //Eduardo's local host number

  private apiUri: string = `https://localhost:${this.localHostNumber}/user`
  private apiRankUri: string = `https://localhost:${this.localHostNumber}/usergoal`
  private apiCurrentStats: string =`https://localhost:${this.localHostNumber}/api//CurrentStats`

  constructor(private http: HttpClient) {}
    getUser(){
      return this.http.get(this.apiUri)
    }
    createUser(user: IUser){
      return this.http.post(this.apiUri, user).subscribe()
    }

    //rank methods 
    getGoal(userName:string)
    {
      return this.http.get(`${this.apiRankUri}/${userName}`);
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

    //Current stats methods
    getUserStats(ApexID:string)
    {
      //return this.http.get(this.apiCurrentStats, User).subscribe(); 
      console.log(ApexID)  
      return this.http.get(`${this.apiCurrentStats}/${ApexID}`); 
    }

    postUserStat(User: IUserStats)
    {
      return this.http.post(this.apiCurrentStats, User).subscribe(); 
    }

}

