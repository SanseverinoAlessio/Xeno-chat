import { Component,OnInit, ElementRef,AfterContentInit,OnChanges,ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl} from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from '../user.service';
import {UniqueName} from "../unique-name";
import {EmailConvalidator} from "../email-convalidator";
import {PasswordRepeat} from "../password-repeat";
import { Router } from '@angular/router';
import {AuthService} from '../auth.service';
import {inputAnim} from '../../assets/inputAnim/inputAnimation';
import { NgScrollbar } from 'ngx-scrollbar';
@Component({
  selector: 'app-user',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,AfterContentInit{
  @ViewChild('scrollbar', { static: true }) scrollbar:any;

  registerForm:FormGroup;
  message:string;
  loading:boolean;
  completed:boolean
  inputsAnim :any;
  constructor(private elem:ElementRef,private auth:AuthService,private router:Router,
    private fb:FormBuilder, private user:UserService,
    uniquename:UniqueName,uniquemail:EmailConvalidator, password_repeat:PasswordRepeat) {
      this.loading = false;
      this.completed = false;
      this.registerForm = this.fb.group({
        nome:['',[Validators.required,Validators.minLength(3),Validators.maxLength(13),Validators.pattern("[a-zA-Z_-]+[^<>/.]\\d*"),uniquename] ],
        email:['',{
          validators: [Validators.required,Validators.email,uniquemail]
        }],
        password:['',{
          validators: [Validators.required,Validators.pattern("^(.*)(?=.*[a-z]+)(?=.*[A-Z]{1,})(?=.*\\d{2,}).*")]
        }],
        repeat_password: ['',{
          validators: [Validators.required,password_repeat]
        }],
      });





    }
    Register(){
      if(this.registerForm.valid){
        this.loading = true;
        this.user.Add({
          nome: this.registerForm.value.nome,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password
        }).subscribe(e=> {
          this.Complete(true);
        } ,err=>{
          this.Complete(false);
        });
      }
      else{
        return;
      }
    }
    Complete(iscompleted:boolean){
      if(iscompleted == true){
        this.completed = true;
      }
      this.registerForm.reset();
      this.loading = false;
      this.inputsAnim.removeAllAnim();
      setTimeout(()=>{
        this.redirectoLogin();
      }, 1500);
    }
    redirectoLogin(){
      this.router.navigate(['accedi']);
    }

    ngAfterContentInit(){
      this.inputsAnim = new inputAnim();
      this.inputsAnim.setInputs(this.elem.nativeElement.getElementsByTagName('input'));
      this.inputsAnim.init();
      this.verifyHeight();
    }
    registerformvalid(){
      if(!(this.registerForm.valid)){
        return true;
      }
      else{
        return false;
      }
    }
    verifyHeight(){
    }
    ngOnInit() {
      this.hideOrShowScrollbar(window.innerWidth);
      window.addEventListener('resize',()=>{
        let width = window.innerWidth;
        this.hideOrShowScrollbar(width);
      });



    }
    hideOrShowScrollbar(width){
      if(width > 450){
        this.scrollbar.track = 'vertical';
      }
      else{
        this.scrollbar.track= '';
      }
    }
    passwordReveal(e) {
      console.log('prova');
      console.log(e.target.parentNode.previousElementSibling.type);
      let passicon = e.target;
      let input = passicon.parentNode.previousElementSibling;
      if(input.type == "password"){
        console.log('cambio');
        console.log(e.target.src);
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
