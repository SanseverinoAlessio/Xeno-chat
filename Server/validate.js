var users = require('./user.js');
class validate{
static name(nome,errors,callback){
let nameRegex = new RegExp("[a-zA-Z_-]+[^<>/.]\\d*");
console.log(nome.length);
if(nome.length >= 3 && nome.length <= 13){
if(nameRegex.test(nome) == true){
users.findName(nome).then((val)=>{
if(val){
console.log('nome trovato!');
let user = val.toObject();
console.log(user.nome);
errors.push({
erroreNome:"Il nome " + nome + ' è già esistente',
});
}
callback();

});
}
else{
errors.push({
erroreNome:"Nome non valido"
});
callback();
}
}
else{
errors.push({
erroreNome:"Controlla la lunghezza del nome. Deve essere compreso tra i 3 e i 13 caratteri"
});
callback();
}
}
static password(password,errors){
console.log('password: ' +password);
let passwordRegex = new RegExp('^(.*)(?=.*[a-z]+)(?=.*[A-Z]{1,})(?=.*\\d{2,}).*');
if(password.length > 0){
console.log('password arrivata: ' + password)
if(passwordRegex.test(password) == false){
  errors.push({
  errorePassword:"La password non è valida. Deve contenere due numeri ed una lettera maiuscola"
  });
}
}
else{
errors.push({
errorePassword:'la password è richiesta'
});
}
}
static email(email,errors,callback){
let emailRegex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
if(email.length > 0){
if(emailRegex.test(email) == false){
  errors.push({
  erroreEmail:"Email non valida"
  });
callback();
}
else{
users.findEmail(email).then((val)=>{
if(val.length > 0){
errors.push({
erroreEmail:"Email già esistente"
});
}
callback();
});
}
}
else{
errors.push({
erroreEmail:"Email richiesta"
});
callback();
}
}
}
module.exports = validate;
