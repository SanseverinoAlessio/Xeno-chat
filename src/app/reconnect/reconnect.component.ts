import { Component, OnInit,Output,Input,OnChanges,EventEmitter } from '@angular/core';
@Component({
  selector: 'app-reconnect',
  templateUrl: './reconnect.component.html',
  styleUrls: ['./reconnect.component.css']
})
export class ReconnectComponent implements OnInit,OnChanges {
@Input() sameAccount:any;
@Output() reconnectEv:EventEmitter<any>= new EventEmitter();
constructor() { }
ngOnInit(): void {
}
ngOnChanges(){
if(this.sameAccount == true){
this.open();
}
}
open(){
}
reconnect(){
this.sameAccount = false;
setTimeout(()=>{
this.reconnectEv.emit('');
},0)


}



}
