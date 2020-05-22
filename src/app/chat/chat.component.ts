import { Component, OnInit, ElementRef,Output,ViewChild } from '@angular/core';
import { ChatService } from '../chat.service';
import {UserService} from '../user.service';
import { Router } from '@angular/router';
import {buttonAnim} from '../../assets/buttonAnim/buttonAnim';
import { NgScrollbar } from 'ngx-scrollbar';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService],
})
export class ChatComponent implements OnInit {
  @ViewChild('chat', { static: true }) chat:NgScrollbar;
  public typingtimeout;
  public room;
  public roomsActive;
  public closeAll;
  public downarrow;
  private buttonclicked;
  public onlineUsersActive;
  public sidebarStatus;
  public messages:any;
  public empty:boolean;
  private value:string;
  private showMsg:boolean;
  public shish:number;
  private filter;
  public deactiveOnlineUsers;
  public scroll;
  public typingvalue;
  public sameAccount;
  public reconnect;
  constructor(private elem:ElementRef,public chatservice:ChatService,private usersrv:UserService,private router:Router) {
    this.sameAccount = false;
    this.typingvalue = false;
    this.roomsActive = false;
    this.room = '';
    this.downarrow = false;
    this.scroll = 0;
    this.closeAll = false;
    this.deactiveOnlineUsers = false;
    this.buttonclicked = false;
    this.onlineUsersActive = false;
    this.sidebarStatus = false;
    this.shish= 300;
    this.value = '';
    this.empty = true;
    this.messages = [];
    this.filter = false;
  }
  ngOnInit() {
    this.chatEventinit();
    this.heightCalculate();

    window.onresize = ()=>{
      if(window.innerWidth > 800){
        this.sidebarStatus = false;
        this.onlineUsersActive = false;
      }
    }

  }
  verifyKey(event,message){
    if(event.type == 'keydown'){
      if(event.key == 'Enter'){
        this.sendMessage(message);
        clearTimeout(this.typingtimeout);
        this.typingtimeout = '';
        this.stopTyping();
      }
      else{ //Controlla se l'utente sta scrivendo
      this.typingvalue = true; //setta il valore a true
      clearTimeout(this.typingtimeout);
      this.typingtimeout = setTimeout(()=>{
        this.stopTyping();


      },3000);
    }
  }
}
stopTyping(){
  this.typingvalue = false;
}


chatEventinit(){
  this.chatservice.Connect();
  this.chatservice.msgDisconnect().subscribe((e:any)=>{
    this.connectedOrDisconnectMsg(e.msg);
  });
  this.chatservice.msgConnected().subscribe((e:any)=>{
    this.connectedOrDisconnectMsg(e.greeting);
  });
  this.chatservice.isConnected();
  this.chatservice.Getmsg().subscribe((msg:any)=>{
    let time = new Date(msg.time);
    let minutes = ()=>{
      if(time.getMinutes().toString().length == 1){
        return "0" + time.getMinutes().toString();
      }
      else{
        return time.getMinutes();
      }
    };
    this.messages.push({
      username: msg.username + ':',
      Messaggio: msg.msg,
      time:  time.getHours() + ':' + minutes(),
      connectedMsg: false
    });
    setTimeout(() => {
      this.scroll = this.chat.viewport.scrollHeight;
    }, 0);
  });
  this.chatservice.otherConnection().subscribe((newSocket:any)=>{
    this.chatservice.sameAccount(newSocket);
    this.sameAccount = true;
  });

}

sendMessage(msginput:any){
  if(msginput.value.length > 0){
    msginput.focus();
    this.chatservice.Send(msginput);
    this.empty = true;
    setTimeout(()=>{
      this.chat.scrollTo({bottom:0,duration:0});
    },0)

  }
}

reconnectSocket(){
  this.chatEventinit();
  this.reconnect = true;
  this.sameAccount = false;
}
connectedOrDisconnectMsg(msg){
  this.messages.push({
    Messaggio: msg,
    connectedMsg: true
  });
  setTimeout(() => {
    this.scroll = this.chat.viewport.scrollHeight;
  }, 0);
}
changeRoomName(name){
  this.room=name;
  this.scroll = 0;
  this.connectedOrDisconnectMsg('Ti sei connesso a: ' + this.room);
}


heightCalculate(){
  this.calc();
  window.addEventListener('resize',this.calc);

}
calc(){
  //let heightvh = window.innerHeight * 0.01;
  //document.documentElement.style.setProperty('--vh',heightvh + 'px');
}


openRooms(event){
  buttonAnim.Anim(event.target,()=>{
    this.roomsActive = true;
  });
}
openOnlineUsers(event){
  buttonAnim.Anim(event.target,()=>{
    this.onlineUsersActive = true;
  });
}
openSidebar(event){
  buttonAnim.Anim(event.target,()=>{
    this.sidebarStatus = true;
    this.buttonclicked = false;
  });
}
closeOnUsers(){
  this.closeAll=false;
  this.deactiveOnlineUsers = true;
  this.onlineUsersActive = false;
  setTimeout(() => {
    this.deactiveOnlineUsers = false;
  }, 700);
}
changeInput(event){
  if(event.target.value.length > 0){
    this.empty = false;
  }
  else{
    this.empty = true;
  }
}
isNotEmpty(){
  if(this.empty == true){
    return true;
  }
  else{
    return false;
  }
}
}
