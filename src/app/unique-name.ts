import { Injectable } from '@angular/core';
import { UserService} from './user.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
@Injectable({ providedIn: 'root' })
export class UniqueName {
  constructor(private user:UserService){
  }

  validate(control: AbstractControl) {
    if(control.value){
      this.user.GetUser(control.value).subscribe(e=>{
        let value:any = e;
        if(value){
          if(value.nome.length){
            control.setErrors({
              unique:true
            });
          }
        }
        else{
          return null;
        }
      }), err=>{
        console.log(err);
      }
    }
  }
}
