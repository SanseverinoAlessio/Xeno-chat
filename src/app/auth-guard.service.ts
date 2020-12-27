import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthService} from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public auth:AuthService, public router:Router) { }
  canActivate():Promise<boolean>{
    return this.auth.islogged().then((e:any)=>{
        return true;
      }).catch((err)=>{
      if(err.status == 401){
        this.router.navigate(['']);
        return false;
      }
    });
  }


}
