import { Component, OnInit,Input,EventEmitter,Output,OnChanges} from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  templateUrl: './onlineusers.component.html',
  selector: 'app-onlineusers',
  styleUrls: ['./onlineusers.component.css']
})
export class OnlineusersComponent implements OnInit,OnChanges {
@Input() active:boolean;
@Input() closeAll:boolean;
@Output() close:EventEmitter<any>= new EventEmitter();
@Input() currentRoom:any;
@Input() Typingvalue:boolean;
@Input() reconnect:any;
@Output() reconnected:EventEmitter<any>= new EventEmitter();


onlineusers;
constructor(private chatService:ChatService) {
this.onlineusers = [];
}
ngOnInit() {
this.chatEvent();
}

chatEvent(){
this.chatService.isTyping().subscribe((e:any)=>{

let typing = e.typing;
let username = e.username;
this.setTyping(username, typing);
});
this.chatService.onConnect().subscribe((e:any)=>{
let online:any = e.online;
this.addUsers(online);
});
this.chatService.onDisconnect().subscribe((user:any)=>{
this.deleteUser(user.username);
});
}

addUsers(arr){
for(let i=0; i< arr.length; i++){
let find = false;
if(this.onlineusers.length > 0){
for(let k=0; k< this.onlineusers.length; k++){
if(this.onlineusers[k].username == arr[i].username){

find = true;
break;
}
}
if(find == false){
this.onlineusers.push({
username:arr[i].username,
room: arr[i].room,
typing: false,
});
}
}
else{
this.onlineusers.push({
username:arr[i].username,
room: arr[i].room,
typing: false,
});
}
}
}
ngOnChanges(){
if(this.reconnect == true){
this.onlineusers = [];
this.chatEvent();
setTimeout(()=>{
this.reconnect = false;
this.reconnected.emit('');
},0)

}


if(this.closeAll == true){
this.closeSidebar();
}
if(this.currentRoom){
this.deleteUsersByRoom();
}
if(this.Typingvalue == true){
this.chatService.typing(true);
}
else if(this.Typingvalue == false){
this.chatService.typing(false);
}
}
closeSidebar(){
this.active = false;
setTimeout(()=>{
this.close.emit(this.active);
},0)
}
deleteUser(username){
this.onlineusers = this.onlineusers.filter((user)=>{
if(user.username !== username){
return user;
}
});
}
setTyping(username,value){
this.onlineusers.map((user,index)=>{
if(user.username == username){
this.onlineusers[index].typing = value;
}
});
}
deleteUsersByRoom(){
this.onlineusers = this.onlineusers.filter((user)=>{
if(user.room == this.currentRoom){
return user;
}
});
}
}
