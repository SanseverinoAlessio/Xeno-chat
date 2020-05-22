var bcrypt = require('bcrypt');

module.exports =
class passwordhash{
  constructor(rounds){
    this.saltRounds = rounds;
    var hashedpassword;
  }
  hashPassword(password){
    var prom =  new Promise((resolve,reject)=>{
      bcrypt.hash(password, this.saltRounds,  function(err, hash) {
        if(err){
          reject("L'hash non è andato a buon fine");
        }
        else{
          resolve(hash);
        }
      });
    });
    return prom;
  }
  static comparePassword(Password, hashedPassword){
    let prom = new Promise((resolve,rejected)=>{
      bcrypt.compare(Password,hashedPassword,(err,result)=>{
        if(err){
          rejected('Non è stato possibile verificare la password');
        }else{
          resolve(result);
        }
      });
    });
    return prom;

  }

}
