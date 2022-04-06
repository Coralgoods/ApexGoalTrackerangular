import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from './interfaces/IUser';


@Injectable({
  providedIn: 'root'
})
export class APICallService {
  private localHostNumber = 44381;
  private apiUri: string = `https://localhost:${this.localHostNumber}/user`

  constructor(private http: HttpClient) {}
    getUser(){
      return this.http.get(this.apiUri)
    }
 


  
}

