import { Directive,ElementRef, Input, OnInit,OnChanges,Output,EventEmitter,Renderer2 } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';
@Directive({
  selector: '[appScrollchat]'
})
export class ScrollchatDirective implements OnInit,OnChanges{
  @Output() downarrowActive:EventEmitter<any> = new EventEmitter;
  @Output() downarrowDisable:EventEmitter<any> = new EventEmitter;
  @Input() Height:any;
  private scrollTop;
  private old;
  constructor(private elem:ElementRef, private render:Renderer2,private ngscroll:NgScrollbar) {
    this.old =0;
    this.scrollTop = 0;
  }
  ngOnInit(){
    this.ngscroll.scrolled.subscribe((e)=>{
      this.setScroll(e.target.scrollTop);
    })
  }
  setScroll(scrollTop){
    this.scrollTop = scrollTop;
    this.downArrowToggle(this.scrollTop);
  }
  private downArrowToggle(scrollTop){
    let clientHeight = this.ngscroll.viewport.clientHeight;
    let scrollHeight = this.ngscroll.viewport.scrollHeight;
    if(scrollTop + clientHeight >= scrollHeight -100 ){
      this.downarrowDisable.emit(null);
    }
    else{
      this.downarrowActive.emit(null);
    }
  }
  ngOnChanges(){
    if(this.Height !== 0){
      this.verifyScroll()
    }
    else{
      this.old = 0;
      this.downarrowDisable.emit(null);
    }
  }
  verifyScroll(){
    let clientHeight = this.ngscroll.viewport.clientHeight;
    if(this.scrollTop + clientHeight >= this.old -100){
      this.ngscroll.scrollTo({bottom:0,duration:0});
      this.old =this.Height;
    }
  }
}
