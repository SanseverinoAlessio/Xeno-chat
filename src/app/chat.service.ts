import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket;
  private url;
  constructor() {
    this.url  = environment.serverIp;
  }
  Connect(){
    this.socket = io(this.url);
  }
  Getmsg(){
    let observable = new Observable(observer =>{
      this.socket.on('msg',(msg:object)=>{
        observer.next(msg);
      });
    })
    return observable;
  }
  Send(msginput:any){
    this.socket.emit('msg',msginput.value);
    msginput.value = '';
  }

  onConnect(){
    let observable = new Observable(observer=>{
      this.socket.on('online',(conn:any)=>{
        observer.next(conn);
      });
    });
    return observable;
  }
  roomConnect(nome){
    this.socket.emit('room', nome);
  }
  isConnected(){
    this.socket.on('connected',()=>{
      this.connectToDefaultRoom();
    });
  }
  connectToDefaultRoom(){
    this.socket.emit('connectToDefaultRoom');
  }
  typing(val){
    this.socket.emit('typing',val);
  }
  isTyping(){
    let observable = new Observable(observer=>{
      this.socket.on('userTyping',(val:any)=>{
        observer.next(val);
      });
    });
    return observable;
  }


  getRooms(){
    let observable = new Observable(observer=>{
      this.socket.on('allRooms',(conn:any)=>{
        observer.next(conn);
      });
    });
    return observable;
  }
  getCurrentRoom(){
    let observable = new Observable(observer=>{
      this.socket.on('currentRoom',(conn:any)=>{
        observer.next(conn);
      });
    });
    return observable;
  }

  sameAccount(newSocket){
    this.socket.emit('sameAccount',newSocket);
  }


  msgDisconnect(){
    let observable = new Observable(observer=>{
      this.socket.on('userleft',(disconnect:any)=>{
        observer.next(disconnect);
      });
    });
    return observable;
  }
  otherConnection(){
    let observable = new Observable(observer=>{
      this.socket.on('otherConnection',(newSocket:any)=>{
        observer.next(newSocket);
      });
    });
    return observable;
  }
  msgConnected(){
    let observable = new Observable(observer=>{
      this.socket.on('onlinemsg',(disconnect:any)=>{
        observer.next(disconnect);
      });
    });
    return observable;
  }
  onDisconnect(){
    let observable = new Observable(observer=>{
      this.socket.on('left',(disconnect:any)=>{
        observer.next(disconnect);
      });
    });
    return observable;
  }

  logout(){
    this.socket.disconnect(true);
  }
}
