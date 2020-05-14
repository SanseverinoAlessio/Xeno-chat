import { Injectable } from '@angular/core';
import { UserService} from './user.service';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class EmailConvalidator {
constructor(private user:UserService){
}
validate(control:AbstractControl) {
if(control.value){
this.user.getEmail(control.value).subscribe(
e=>{
let valore:any = e;
if(valore.exist == true){
control.setErrors({
unique: true,
});
}
else{
return null;
}
}
);
}
}
}
