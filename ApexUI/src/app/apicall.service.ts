import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { IUser } from './interfaces/IUser';
import { IRank } from './interfaces/IRank';
import { IUserStats } from './interfaces/IUserStats';
import { Observable, observable } from 'rxjs';
import { IUserInfo } from './interfaces/IUserInfo';
import { IRankPut } from './interfaces/IRankPut';



@Injectable({
  providedIn: 'root'
})
export class APICallService {

  // private localHostNumber = 44381;
  private localHostNumber = 44397; //Eduardo's local host number

  private apiUri: string = `https://localhost:${this.localHostNumber}/user`
  private apiRankUri: string = `https://localhost:${this.localHostNumber}/api/usergoal`
  private apiCurrentStats: string =`https://localhost:${this.localHostNumber}/api/CurrentStats`

  //https://blahapithingy.azure-api.net/api/userGoal/eddie
  //  private apiUri: string = `https://blahapithingy.azure-api.net/user`
  //  private apiRankUri: string = `https://blahapithingy.azure-api.net/api/usergoal`
  //  private apiCurrentStats: string =`https://blahapithingy.azure-api.net/api/CurrentStats`
  

  passedUserName: string = ' '

  constructor(private http: HttpClient) {}
 
    getUser(userName: string){
      let loginUri = this.apiUri + '/' + userName + '/'; 
      console.log(loginUri) 
      return this.http.get(loginUri)
    }
    Login(userName: string, password: string){
      let loginUri = this.apiUri + '/' + userName + '/' + password;
      console.log(loginUri)
      return this.http.get(loginUri)
    }
    createUser(user: IUser){
      return this.http.post(this.apiUri, user)
    }

    //rank methods 
    getGoal(userName:string)
    {
      console.log("Get goal URL")
      console.log(this.http.get(`${this.apiRankUri}/${userName}`))
      return this.http.get(`${this.apiRankUri}/${userName}`);
    }
    //updateGoal(rank: IRankPut, goalId:number) 
    updateGoal(rank: IRankPut, goalId:number)
    {
      console.log("Update Goal called")
      console.log(`${this.apiRankUri}/${goalId}`); 
      console.log(rank)
      return this.http.put(`${this.apiRankUri}/${goalId}`, rank).subscribe()
      //return this.http.put(`https://localhost:${this.localHostNumber}/usergoal/${userName}/${goalId}`, rank).subscribe()
     
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
    getUserStats(ApexID:string): Observable<any>
    {    
      console.log(`${this.apiCurrentStats}/${ApexID}`)
      return this.http.get(`${this.apiCurrentStats}/${ApexID}`); 
    }

    //postUserStat(User: IUserInfo)
    postUserStat(User: any)
    {
      return this.http.post(this.apiCurrentStats, User); 
      
    }

    //Test Don't need 
    // receiveuserName($event: any){
    // this.passedUserName=$event
    // console.log(this.passedUserName)
    //}
    //Test for send and get message
    //message:string | undefined
    
    // setUserName(data:string){
    //   console.log("appicall - setID")
    //   this.passedUserName=data
    //   console.log(this.passedUserName)
    // }
    // getUserName(){
    //   if(this.passedUserName = ' '){
    //     return 'error getUserName'
    //   }
    //   else{
    //     return this.passedUserName
    //   }
 
    // }


}

