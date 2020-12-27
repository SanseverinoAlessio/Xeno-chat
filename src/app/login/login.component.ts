import { Component,OnInit, ElementRef,AfterContentInit } from '@angular/core';
import { FormGroup, FormBuilder,FormControl } from '@angular/forms';
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
    this.loginForm = new FormGroup({
      nome: new FormControl('',[
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('',[
        Validators.required,
      ]),
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
      }).subscribe((res:any)=>{
        if(res.logged == true){
          this.setLogin(true);
        }
      },(err:any)=>{
        if(err.status == 401 || err.status == 404){
          this.setLogin(false);
        }
      });
    }
  }
  setLogin(success = false){
    if(success == false){
      this.loading = false;
      this.loginerror = 'La password o il nome utente non sono corretti';
      return;
    }
    this.loading = false;
    this.loginerror = '';
    console.log('loggato!');
    this.loginForm.reset();
    this.router.navigate(['chat']);
    return;
  }
  loginformvalid(){
    if(!(this.loginForm.status == 'VALID')){
      return true;
    }
    else{
      return false;
    }
  }
  passwordReveal(e) {
    let passicon = e.target;
    let input = passicon.previousElementSibling;
    if(input.type == "password"){
      e.target.src= e.target.src.replace('Password-reveal-off','Password-reveal-on');
      input.type = "text";
    }
    else{
      input.type = "password";
      e.target.src= e.target.src.replace('Password-reveal-on','Password-reveal-off');
    }
    input.focus();
  }
}
