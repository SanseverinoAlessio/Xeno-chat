import { Component, OnInit,Input,Output,EventEmitter,OnChanges } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.css']
})
export class ChatSidebarComponent implements OnInit,OnChanges {
  @Input() sidebarStatus:boolean;
  @Input() closeAll:boolean;
  @Output() isclosed:EventEmitter<any> = new EventEmitter;
  deactive:boolean;
  name:string;
  isActive:boolean;
  constructor(private user:UserService,public router:Router,) {
    this.name = '';
    this.isActive = false;
    this.deactive=false;
  }
  ngOnInit() {
    this.getUsername();
  }
  ngOnChanges(changes:any){
    setTimeout(()=>{
      if(this.closeAll == true){
        this.closeAll = false;
        this.close();
      }
    },0)
  }
  getUsername(){
    this.user.getUsername().subscribe(e=>{
      let val:any =e;
      this.name = val.nome;
    },err=>{
    });
  }
  close(){
    this.sidebarStatus = false;
    this.deactive = true;
    setTimeout(()=>{
      this.deactive = false;
      setTimeout(()=>{
        this.isclosed.emit(null);

      },0);
    },300);
  }
}
