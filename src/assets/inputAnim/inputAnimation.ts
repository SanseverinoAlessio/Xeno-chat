export class inputAnim{
inputs:any;
constructor(){
}
setInputs(inputs){
this.inputs = inputs;
}
init(){
for(let i = 0; i< this.inputs.length; i++){
this.inputs[i].addEventListener('focus',()=>{
this.AddRemoveAnim(this.inputs[i],true);
});
this.inputs[i].addEventListener('blur',()=>{
if(this.inputs[i].value.length > 0){
return null;
}
else if(this.inputs[i].value.length <= 0){
this.AddRemoveAnim(this.inputs[i],false);
}
});
}
}
AddRemoveAnim(input:any ,animate:boolean){
if(animate == true && input.parentNode.className.indexOf('active') == -1){
input.parentNode.className += ' '+ 'active';
}
else if(animate == false){
let classes = input.parentNode.className.replace('active', '');
input.parentNode.className = classes;
}
}
removeAllAnim(){
for(let i =0; i < this.inputs.length; i++){
let classes = this.inputs[i].parentNode.className.replace('active','');
this.inputs[i].parentNode.className = classes;
}
}
}
