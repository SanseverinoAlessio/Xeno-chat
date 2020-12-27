import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import { Router, CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthLoginService implements CanActivate{
  constructor(private auth:AuthService,private router:Router) { }
  canActivate():Promise<boolean>{
    return this.auth.islogged().then((e:any)=>{
    this.router.navigate(['chat']);
    return false;
    }).catch((err)=>{
      if(err.status == 401){
        return true;
      }
    });
  }
}
