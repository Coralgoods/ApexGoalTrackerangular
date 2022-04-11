import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { IUser } from './interfaces/IUser';
import { IRank } from './interfaces/IRank';
import { IUserStats } from './interfaces/IUserStats';
import { Observable, observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class APICallService {

  // private localHostNumber = 44381;
  private localHostNumber = 44397; //Eduardo's local host number

  private apiUri: string = `https://localhost:${this.localHostNumber}/user`
  private apiRankUri: string = `https://localhost:${this.localHostNumber}/usergoal`
  private apiCurrentStats: string =`https://localhost:${this.localHostNumber}/api/CurrentStats`


  TestUserStats: any = []

  passedUserName: string = ' '


  constructor(private http: HttpClient) {}
 
    getUser(){
      return this.http.get(this.apiUri)
    }
    Login(userName: string, password: string){
      let loginUri = this.apiUri + '/' + userName + '/' + password;
      return this.http.get(loginUri)
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
    getUserStats(ApexID:string): Observable<any>
    { 
      console.log("apicall - passedApexID") 
      console.log(ApexID)  
      console.log("apicall Get - passedUName") 
      console.log(this.passedUserName)
      
      console.log(`${this.apiCurrentStats}/${ApexID}`)
      return this.http.get(`${this.apiCurrentStats}/${ApexID}`); 
      
    }

    postUserStat(User: IUserStats)
    {
      return this.http.post(this.apiCurrentStats, User).subscribe(); 
    }

    //Test Don't need 
    receiveuserName($event: any){
    this.passedUserName=$event
    console.log(this.passedUserName)
}
    //Test for send and get message
    //message:string | undefined
    
    setUserName(data:string){
      console.log("appicall - setID")
      this.passedUserName=data
      console.log(this.passedUserName)
    }
    getUserName(){
      if(this.passedUserName = ' '){
        return 'error getUserName'
      }
      else{
        return this.passedUserName
      }
 
    }


}

