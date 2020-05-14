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
if(e == true){
return e;
}
else{
this.router.navigate(['home']);
return e;
}
}).catch((err)=>{
err = false;
return err;
});
}


}
