var user = require('./user_mongoose.js');
const mongoosedb = require("./connect_to_db.js");
const passwordhash = require("./passwordhash.js");

class users{
  constructor(nome,email,password){
    this.nome = nome;
    this.password = password;
    this.email = email;
  }
  adduser(){
    let prom = new Promise((resolve,reject)=>{
      var utente = new user({
        nome: this.nome,
        password: this.password,
        email: this.email,
      });
      utente.save((err,doc)=>{
        if(err){
          reject("C'è stato un errore con la creazione dell'account");
        }
        else{
          resolve('Account creato!');
        }
      });
    });
    return prom;
  }
  static findName(nome){
    return user.findOne({nome:new RegExp("^" + nome +  "$" ,"i")}).select('nome');
  }
  static findEmail(email){
    return user.find({email:email},"",(err,doc)=>{
    });
  }
  static login(nome,password){
    let prom = new Promise((resolve,reject)=>{
      this.findName(nome).select('password').exec((err,doc)=>{
        if(err){
          reject("C'è stato un errore");
        }
        else{
          if(doc){
            let value = doc.toObject();
            passwordhash.comparePassword(password,value.password).then((val) => {

              let obj = {
                condition: val,
                user: value
              }

              resolve(obj);
            }).catch((err) => {
              reject("C'è stato un errore");
            })
          }
          else{
            reject("L'utente non è stato trovato");
          }
        }
      });
    });
    return prom;
  }
}

module.exports = users;
