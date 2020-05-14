import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class PasswordRepeat {

constructor(){
}

validate(control:AbstractControl){
if(control.value){


if(control.root.get('password').value !== control.value){
return {
notequal: true
}
}
else{
return null;

}

}

}
}
