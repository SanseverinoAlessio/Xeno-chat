export class buttonAnim{
static Anim(target,callback){
let button;
if(target.tagName.toLowerCase() =='li' || target.tagName.toLowerCase() =='a'){
button = target;
}
else if(target.tagName.toLowerCase()=='img'){
button = target.parentNode;
}
if(button.className.indexOf('clicked') == -1){
button.className +=' ' + 'clicked';
setTimeout(()=>{
let classes = button.className.replace('clicked','');
button.className = classes.trim();

},500);
setTimeout(()=>{
callback();
},300)
}
}
}
