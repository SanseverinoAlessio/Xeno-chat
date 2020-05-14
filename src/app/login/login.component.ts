import { Component,OnInit, ElementRef,AfterContentInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import {inputAnim} from '../../assets/inputAnim/inputAnimation';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm:FormGroup;
loginerror:string;
loading:boolean;
inputsAnim:any;

constructor(private fb:FormBuilder, private user:UserService,private router:Router, private elem:ElementRef) {
this.loginForm = this.fb.group({
nome:['',{
validators: [Validators.required,Validators.minLength(3)]
}],
password:['',{
validators:[Validators.required]
}],

});
  }
  ngOnInit() {
  }
ngAfterContentInit(){
this.inputsAnim = new inputAnim();
this.inputsAnim.setInputs(this.elem.nativeElement.getElementsByTagName('input'));
this.inputsAnim.init();
}

  Accesso(){
  if(this.loginForm.status == 'VALID'){
   this.loading = true;
  this.user.login({
  nome: this.loginForm.value.nome,
  password:this.loginForm.value.password
}).subscribe((e:any)=>{
  this.setLogin(e);
  }),err=>{
    this.loading = false;
  }
  }
  }
  setLogin(e){


  if(e !== null && e.access == true){
  this.loading = false;
  this.loginerror = '';
  console.log('loggato!');
  this.loginForm.reset();
  this.router.navigate(['chat']);
  }
  else if(e.access == false || e.error ){
  this.loading = false;
  this.loginerror = 'La password o il nome utente non sono corretti';
  }
  }
  loginformvalid(){
    if(!(this.loginForm.status == 'VALID')){
    return true;
    }
    else{
    return false;
    }
  }
}
