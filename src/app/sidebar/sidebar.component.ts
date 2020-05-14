import { Component,OnInit,Renderer2, ViewChild,ElementRef,AfterViewInit,Output,EventEmitter,Input,OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit,OnChanges {
@ViewChild('navbar',{static:false})navbar:ElementRef;
@Output() toggle:EventEmitter<any> = new EventEmitter;
@Input() closesidebar:any;
@Output() closed:EventEmitter<any> = new EventEmitter;


scrollTop:number;
isActive:boolean;
navActive:boolean;
  constructor(public elem:ElementRef,public router:Router) {
this.isActive = false;
  }
  ngOnInit() {
  }

ngOnChanges(){
if(this.closesidebar == true){
setTimeout(()=>{
this.closeSidebar();
},0)
setTimeout(()=>{
this.closed.emit('');
},0)

}


}

ngAfterViewInit(){
this.setEvent();
}
setEvent(){
window.onscroll = ()=>{
this.scrollTop = window.scrollY;
if(typeof this.navbar !== 'undefined'){
if(this.scrollTop >= 70){
this.navActive = true;
}
else{
this.navActive = false;
}
}
}
}
toggleSidebar(){
if(this.isActive == true){
this.isActive = false;
this.toggle.emit(this.isActive);
}
else{
this.isActive = true;
this.toggle.emit(this.isActive);
}
}
closeSidebar(){
if(this.isActive == true){
this.isActive = false;
this.toggle.emit(this.isActive);
}
}

isMobile(){
if(window.innerWidth <= 450){
return true;


}
else{
return false;
}



}








}
