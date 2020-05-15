import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class PasswordRepeat {

constructor(){


}

validate(control:AbstractControl){
if(control.value){
control.root.get('password').valueChanges.subscribe((value)=>{
setTimeout(()=>{
if(control.root.get('password').value !== control.value){
control.reset();

}
},0)

});




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
