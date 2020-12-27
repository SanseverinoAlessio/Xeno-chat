import { Component, OnInit,Input,OnChanges,Output,EventEmitter } from '@angular/core';
import { ChatService } from '../chat.service';
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit,OnChanges {
  @Input() roomsActive:boolean;
  @Input() closeAll:boolean;
  @Output() closeRooms:EventEmitter<any> = new EventEmitter;
  @Output() changeRoomName:EventEmitter<any> = new EventEmitter;
  @Output() deleteMessage:EventEmitter<any> = new EventEmitter;
  @Input() reconnect:any;
  @Output() reconnected:EventEmitter<any> = new EventEmitter;



  rooms:any;
  buttondisabled;
  current;
  errormsg;
  ngOnChanges(){
    if(this.reconnect == true){
      this.chatEvent();
      setTimeout(()=>{
        this.reconnect = false;
        this.reconnected.emit('');

      },0)

    }


    if(this.closeAll == true){
      this.closeAll = false;
      this.close();
    }
  }
  constructor(private chatservice:ChatService) {
    this.errormsg = '';
    this.current = '';
    this.buttondisabled = true;
    this.rooms = [
    ];
  }
  close(){
    this.roomsActive = false;
    setTimeout(() => {
      this.closeRooms.emit(null);
    }, 0);
  }
  ngOnInit(){
    this.chatEvent();
  }

  chatEvent(){
    this.chatservice.getCurrentRoom().subscribe((name:any)=>{
      this.current = name;
      setTimeout(()=>{
        this.changeRoomName.emit(name);
        setTimeout(() => {
          this.closeRooms.emit(null);
        }, 50);
      },0);
    });
    this.chatservice.getRooms().subscribe((e:any)=>{
      this.rooms = e.rooms;
    });
  }
  verifyKey(e,input){
    if(e.keyCode == 13){
      this.createRoom(input);
    }
  }
  createRoom(input){
    let find = false;
    if(input.value.length > 0 && input.value.length <= 15){

      this.buttondisabled = true;
      for(let i= 0; i < this.rooms.length; i++){
        if(this.rooms[i].nome == input.value ){
          find = true;
          input.value = '';
          this.errormsg = 'La stanza è già esistente';
        }
        if(this.rooms.length -1 == i && find !== true){
          this.errormsg = '';
          this.chatservice.roomConnect(input.value);
          input.value = '';
          this.deleteMessage.emit(null);
        }
      }
    }
    else if(input.value.length <= 0){
      this.errormsg = 'Non hai digitato alcun valore';
    }
    else if(input.value.length > 15){
      this.errormsg = 'Il nome della stanza è troppo lungo';
    }
  }
  enterInRoom(id){
    let room = this.rooms[id];
    this.chatservice.roomConnect(room.nome);
    this.deleteMessage.emit(null);
  }
  setButton(e){
    if(e.target.value.length > 0){
      this.buttondisabled = false;
    }
    else{
      this.buttondisabled = true;
    }
  }
}
