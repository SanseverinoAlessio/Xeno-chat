import { Component,OnInit,Renderer2, ViewChild,ElementRef,AfterViewInit,OnChanges } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import{scaleanim} from './scaleanim';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [scaleanim]
})
export class AppComponent {
move:boolean;
isactive:boolean;
scrollTop;
closesidebar;
loading:boolean;
constructor(public router:Router,render:Renderer2){
this.closesidebar = false;
this.move = false;
this.isactive = false;
this.router.events.subscribe((event:Event)=>{
switch(true){
case event instanceof NavigationStart:{
this.loading = true;
break;
}
case event instanceof NavigationEnd:
case event instanceof NavigationError:
case event instanceof NavigationCancel:
{
this.closesidebar = true;
break;
}
default:{
break;
}
}
});
this.router.events.subscribe((e:any)=>{
if(e instanceof NavigationEnd){
}
});

}
ngOnInit(){
}
moveContent(event){
if(event == true){
this.move = true;
}
else{
this.move = false;
}
}
prepareRouteOutlet(outlet){
return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
}
ngAfterViewInit(){
}
}
