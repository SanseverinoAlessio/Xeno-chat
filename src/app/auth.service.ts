import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
providedIn: 'root'
})
export class AuthService {
bool:boolean;
option;
constructor(private http:HttpClient) {
this.option = {
headers: new HttpHeaders({
'Accept': 'application/json',
}),
withCredentials:true
};
this.bool = false;
}
islogged(){
let http = this.http.get(environment.serverIp + '/islogged',this.option).toPromise();
return http;
}
}
