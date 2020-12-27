import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  option;
  constructor(private http:HttpClient) {
    this.option = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json',
      }),
      withCredentials:true
    };
  }
  Add(user:object){
    let http =  this.http.post(environment.serverIp + '/user/register',JSON.stringify(user), this.option);
    return http;
  }
  login(user:object){
    let http = this.http.post(environment.serverIp + '/user/login',JSON.stringify(user),this.option);
    return http;
  }
  userExist(user:string){
    let http = this.http.get<any>(environment.serverIp +  '/user/userExist/' + user,this.option);
    return http;
  }
  logout(){
    let http = this.http.get(environment.serverIp + '/auth/logout',this.option);
    return http;
  }
  getUsername(){
    let http=this.http.get(environment.serverIp + '/auth/getUsername',this.option);
    return http;
  }
  emailExist(email:string){
    let http = this.http.get(environment.serverIp + "/user/email/" + email,this.option);
    return http;
  }
}
