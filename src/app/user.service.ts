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

    let http =  this.http.post(environment.serverIp + '/register',JSON.stringify(user), this.option);
    return http;
  }
  login(user:object){
    let http = this.http.post(environment.serverIp + '/login',JSON.stringify(user),this.option);
    return http;
  }
  GetUser(user:string){


    let http = this.http.get<any>(environment.serverIp +  '/user/' + user,this.option);
    return http;
  }

  logout(){

    let http = this.http.get(environment.serverIp + '/logout',this.option);
    return http;
  }

  getUsername(){
    let http=this.http.get(environment.serverIp + '/getUsername',this.option);
    return http;
  }

  getEmail(email:string){
    let http = this.http.get(environment.serverIp + "/email/" + email,this.option);
    return http;
  }


}
