import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http:HttpClient) { }

  // baseUrl:string = 'http://localhost:3000/';
  baseUrl:string = 'https://authangular-4e8a8-default-rtdb.firebaseio.com/';
  httpHeaders:HttpHeaders = new HttpHeaders().set("Content-Type","application/json");

  getDataFromServer(endPoint:string){
    let url = this.baseUrl + endPoint;
    return this.http.get(url,{headers:this.httpHeaders})
  };

  postDataToServer(endPoint:string,body:any){
    let url = this.baseUrl + endPoint;
    return this.http.post(url,body,{headers:this.httpHeaders})
  };

  updateDataToServer(endPoint:string,body:any){
    let url = this.baseUrl + endPoint;
    return this.http.put(url,body,{headers:this.httpHeaders})
  };

  deleteDataFromServer(endPoint:string){
    let url = this.baseUrl + endPoint;
    return this.http.delete(url,{headers:this.httpHeaders})
  };
}
