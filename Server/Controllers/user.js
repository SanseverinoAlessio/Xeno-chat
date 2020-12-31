const userModel = require('../Models/userModel.js');
const validator = require('../Config/Validation/validator.js');
const input = require('../Config/Validation/input.js');
const rules = require('../Config/Validation/rules.js');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const register = async (req,res)=>{
  let nome = req.body.nome;
  let email = req.body.email;
  let password = req.body.password;  //await bcrypt.hash(req.body.password,10);
  let inputsValidator = new validator({
    nome: new input({
      value: nome,
      rules: [
        'require',
        "minLenght(3)",
        "maxLenght(14)",
      ]
    }),
    password: new input({
      value: password,
      rules: [
        "require",
        "password",
      ],
    }),
    email: new input({
      value: email,
      rules: [
        "require",
        "email",
      ],
    }),
  });
  if(!inputsValidator.validate()){
    res.status(200);
    res.json(inputsValidator.getErrors());
    return res.end('');
  }
   let salt = await bcrypt.genSalt(10);
  let cryptPassword = await bcrypt.hash(password,salt);
  userModel.addUser({username:nome,password:cryptPassword,email:email}).then(()=>{
    res.status(200);
  }).catch((err)=>{
    res.status(500);
  });
  res.end('');
}
const emailExist = async (req,res)=>{
  let email = req.params.email;
  let result = await userModel.emailExist(email);
  if(result == false){
    res.json({
      exist:false,
    });
    return res.end('');
  }
  res.json({
    exist:true,
  });
  return  res.end('');
}
const userExist = async(req,res)=>{
  let username= req.params.username;
  let result = await userModel.findUserByName(username);
  res.status(200);
  if(result == false){
    res.json({
      exist: false,
    });
    return res.end('');
  }
  res.json({
    exist: true,
  });
  return res.end('');

}
const login = async (req,res)=>{
  let name = req.body.nome;
  let reqPassword =  req.body.password;
  let result =  await userModel.findUserByName(name);
  if(result == false){
    res.status(404);
    res.end('');
  }
  let password = result.password;
  const match = await bcrypt.compare(reqPassword,password);
  if(!match){
    res.status(401);
    res.end('');
  }
  let key = process.env.tokenKey || 'defaultKey';
  jwt.sign({User:name},key, (err,token)=>{
    if(err){
      res.status(500);
      res.end();
    }
    let expire = new Date(Date.now() + (30 * 24 * 60 * 60 * 1000));
    res.cookie('token',token,{
      expires:expire,
      httpOnly: true,
      secure: false,
    });
    res.status(200);
    res.json({
      logged: true,
    });
    res.end();
  });
}
module.exports = {
  register,
  emailExist,
  login,
  userExist
}
