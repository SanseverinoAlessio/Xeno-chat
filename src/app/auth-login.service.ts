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
if(e == false){
e = true;
return e;
}
else{
e = false;
this.router.navigate(['chat']);
return e;
}
}).catch((err)=>{
err = false;
return err;
});
}
}
